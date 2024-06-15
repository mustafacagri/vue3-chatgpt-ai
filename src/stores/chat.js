// Utilities
import { addMessage, createTitle, fetchChats, setMessageDetails } from '@/services/firebase'
import { defineStore } from 'pinia'
import { getChatCompletion } from '@/services/openaiService'
import { isEmpty } from 'lodash'
import { useMainStore } from './main'
import { useStorage } from '@vueuse/core'

import moment from 'moment'
import CONTANTS from '@/CONSTANTS'

export const useChatStore = defineStore('chat', {
  state: () => ({
    chats: useStorage('chats', {
      text: {},
      image: {},
      audio: {},
    }),
  }),
  getters: {
    getTitles: state => state.chats.map(chat => chat.title),
    getChatsById:
      state =>
      (id, page = CONTANTS.defaultPage) =>
        state.chats?.[page]?.[id]?.messages || [],
    getWholeTitle:
      state =>
      (id, page = CONTANTS.defaultPage) =>
        state.chats[page]?.[id] || {},
    getChatsByPage: state => payload => {
      const { limit, page } = payload

      const entries = Object.entries(state.chats?.[page] || {})
      const result = entries.map(([id, chat]) => ({
        id,
        ...chat,
      }))

      // Sort chats by updatedAt in descending order
      result.sort((a, b) => {
        const updatedAtA = a.updatedAt ? new Date(a.updatedAt) : new Date(0)
        const updatedAtB = b.updatedAt ? new Date(b.updatedAt) : new Date(0)
        return updatedAtB - updatedAtA
      })

      return limit ? result.slice(0, limit) : result
    },
    getTitlesByPage: getters => payload =>
      getters.getChatsByPage(payload).map(chat => ({ id: chat.id, title: chat.title })) || [],
  },
  actions: {
    async init() {
      const chats = await fetchChats()
      this.chats = { ...chats }
    },
    async addMessage(payload) {
      const { content, format, model, speed, type, voice } = payload
      let { id, page } = payload

      const time = moment().format()
      page ??= CONTANTS.defaultPage

      if (!id) {
        id = crypto.randomUUID()
        this.createTitle({ id, page })
      }

      if (!content) return

      let found = this.chats[page]?.[id]

      if (!found) {
        this.createTitle({ id, page })
        found = this.chats[page]?.[id]
      }

      if (!Array.isArray(found?.messages) || found.messages.length === 0) {
        const temp = document.createElement('div')
        temp.innerHTML = content
        const text = temp.textContent || temp.innerText || ''

        found.title = text.substring(0, 100)
        found.messages = []
        setMessageDetails({ id, page, title: found.title, updatedAt: time })
      }

      found.messages.push({ content, time, type })
      addMessage({ id, page, messages: found.messages, updatedAt: time })

      useMainStore().isLoading = true

      try {
        const botContent = await getChatCompletion({ content, format, model, page, speed, voice })
        found.messages.push({ content: botContent, time, type: 'bot' })
        addMessage({ id, page, messages: found.messages, updatedAt: time })
      } finally {
        useMainStore().isLoading = false
      }
    },
    createTitle(payload) {
      const time = moment().format()

      let { id, page } = payload
      page ??= CONTANTS.defaultPage
      id ??= crypto.randomUUID()

      if (isEmpty(this.chats[page])) {
        this.chats[page] = {}
      }

      createTitle({ createdAt: time, id, messages: [], page, title: 'New Chat' })
      this.chats[page][id] = { createdAt: time, messages: [], title: 'New Chat', updatedAt: time }

      return id
    },
    getLastTitleId(page = CONSTANTS.defaultPage) {
      // Ensure page is provided and exists in this.chats, fallback to an empty object if not
      const chatsForPage = this.chats?.[page] ?? {}

      // Get the keys of the chats for the given page
      const chatIds = Object.keys(chatsForPage)

      // If there are chat ids, return the last one
      if (chatIds.length > 0) {
        return chatIds[chatIds.length - 1]
      }

      // If no valid id found, create a new title
      return this.createTitle({ page })
    },
    isTheTitleExist:
      state =>
      (id, page = CONTANTS.defaultPage) => {
        if (!state.chats?.[page]?.[id]) {
          this.router.push(`/${page}`)
        }
      },
  },
})
