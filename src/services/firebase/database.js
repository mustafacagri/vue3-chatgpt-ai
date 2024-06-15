import { get, getDatabase, ref, set } from '@firebase/database'
import { initializeFirebase } from './index'

const db = getDatabase(initializeFirebase())

export async function fetchChats() {
  const chatsRef = ref(db, 'chats')
  const snapshot = await get(chatsRef)

  if (snapshot.exists()) {
    return snapshot.val()
  } else {
    return {}
  }
}

export async function createTitle(payload) {
  const { createdAt, id, messages, page, title } = payload

  set(ref(db, `chats/${page}/${id}`), {
    createdAt,
    id,
    messages,
    title,
    updatedAt: createdAt,
  })
}

export async function addMessage(payload) {
  const { messages, id, page, updatedAt } = payload

  set(ref(db, `chats/${page}/${id}/messages`), [...messages])
  if (updatedAt) set(ref(db, `chats/${page}/${id}/updatedAt`), updatedAt)
}

export async function setMessageDetails(payload) {
  const { createdAt, id, page, title, updatedAt } = payload

  if (title) set(ref(db, `chats/${page}/${id}/title`), title)
  if (createdAt) set(ref(db, `chats/${page}/${id}/createdAt`), createdAt)
  if (updatedAt) set(ref(db, `chats/${page}/${id}/updatedAt`), updatedAt)
}
