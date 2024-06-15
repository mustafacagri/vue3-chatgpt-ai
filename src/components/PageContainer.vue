<template>
  <div
    class="chat-container"
    :key="id"
  >
    <v-card
      class="messages"
      ref="messagesContainer"
    >
      <GetErrorSuccess class="ma-3" />

      <v-list>
        <v-list-item
          v-for="(message, index) in messages"
          :key="index"
          class="message-item"
          :class="{
            'user-message': message.type === 'user',
            'bot-message': message.type !== 'user',
          }"
        >
          <template v-if="message.type === 'bot'">
            <v-icon class="bot-icon">mdi-robot</v-icon>

            <template v-if="currentPage === CONSTANTS?.pages?.image">
              <ImageMessage :fileName="message.content" />
            </template>
            <template v-else-if="currentPage === CONSTANTS?.pages?.audio">
              <AudioMessage :fileName="message.content" />
            </template>
            <template v-else>
              <div v-html="formatMessage(message.content)"></div>
            </template>
            <small>{{ moment(message?.time).fromNow() }}</small>
          </template>
          <template v-else>
            <div v-html="formatMessage(message.content)"></div>
            <small>{{ moment(message?.time).fromNow() }}</small>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
  <div class="input-container">
    <textarea
      v-model="messageInput"
      @keydown="handleKeyDown"
      type="text"
      placeholder="Type your message here..."
      class="message-input"
      rows="4"
    />

    <div
      class="right"
      :class="{ audio: currentPage === CONSTANTS.pages.audio }"
    >
      <template v-if="currentPage === CONSTANTS.pages.audio">
        <div>
          <v-autocomplete
            label="Speed"
            :items="CONSTANTS?.audio?.speeds || []"
            v-model="speed"
          />
        </div>
        <div>
          <v-autocomplete
            label="Voices"
            :items="CONSTANTS?.audio?.voices || []"
            v-model="voice"
          />
          <v-autocomplete
            label="Format"
            :items="CONSTANTS?.audio?.formats || []"
            v-model="format"
          />
        </div>
      </template>
      <div>
        <v-autocomplete
          label="Models"
          :items="CONSTANTS?.models?.[currentPage] || []"
          v-model="model"
        />
        <VBtn
          @click="sendMessage"
          class="send-button"
          :loading="mainStore.isLoading"
          :disabled="messageInput.trim() === ''"
        >
          Send
        </VBtn>
      </div>
    </div>
  </div>
</template>

<script setup>
import CONSTANTS from '@/CONSTANTS'
import { useChatStore, useMainStore } from '@/stores'
import moment from 'moment'
import router from '@/router'

const route = useRoute()
const chatStore = useChatStore()
const mainStore = useMainStore()

const currentPage = computed(() => route?.name?.replace('/', ''))

const id = computed(() => route.query?.id || '')

const messages = computed(() => chatStore.getChatsById(id.value, currentPage.value))
const messageInput = ref('')
const messagesContainer = ref(null)
const model = ref(CONSTANTS?.defaultModels?.[currentPage.value] || '')
const voice = ref(CONSTANTS?.audio?.defaultVoice || '')
const format = ref(CONSTANTS?.audio?.defaultFormat || '')
const speed = ref(CONSTANTS?.audio?.defaultSpeed || '')

const sendMessage = () => {
  const { id } = route.query
  const data = { id, content: messageInput.value, model: model.value, page: currentPage.value, type: 'user' }

  if (currentPage.value === CONSTANTS.pages.audio) {
    data.voice = voice.value
    data.format = format.value
    data.speed = speed.value
  }

  if (messageInput.value.trim() !== '') {
    chatStore.addMessage({ ...data })
    messageInput.value = ''
    // Scroll to bottom after adding a new message
    scrollMessagesToBottom()
  }
}

const scrollMessagesToBottom = () => {
  setTimeout(() => {
    messagesContainer.value.$el.scrollTop = messagesContainer.value.$el.scrollHeight
  }, 0)
}

const handleKeyDown = event => {
  // if you want to send the message on Enter key press
  // if (event.key === 'Enter' && !event.shiftKey) {
  //   event.preventDefault() // Prevent newline insertion
  //   sendMessage()
  // }
}

const formatMessage = message => {
  return message?.replace(/\n/g, '<br>')
}

const checkTheTitleId = (newVal = route.query?.id) => {
  chatStore.isTheTitleExist(newVal, currentPage.value)
}

watch(
  () => route.query?.id,
  newVal => checkTheTitleId(newVal),
)

onMounted(() => {
  checkTheTitleId()
  scrollMessagesToBottom()

  if (!route.query?.id) {
    const lastTitleId = chatStore.getLastTitleId(currentPage.value)
    router.push({ path: currentPage.value, query: { id: lastTitleId } })
  }
})
</script>

<style scoped lang="scss">
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  max-height: calc(100dvh - 150px);
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding-right: 20px; /* Adjust for scrollbar width */
}

.input-container {
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ccc;
  position: absolute;
  bottom: 0;
  height: 150px;
  width: 100%;

  .message-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
    resize: none;
  }

  .right {
    width: 150px;

    &.audio {
      width: 300px;
      display: flex;
      justify-content: space-between;

      & > div:not(:last-child) {
        margin-right: 10px;
      }

      & > div {
        flex: 1;
      }
    }

    .send-button {
      width: 100%;
      padding: 10px 20px;
      border: 1px solid #007bff;
      border-radius: 5px;
      background-color: #007bff;
      color: #fff;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
}

.user-message {
  text-align: right;
  border-radius: 10px;
  padding: 8px;
  margin: 5px;
}

.bot-message {
  text-align: left;
  margin-left: 30px; /* Create space for bot icon */
}

.bot-icon {
  margin-right: 10px;
  color: #757575;
}
</style>
>
