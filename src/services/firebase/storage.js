import CONSTANTS from '@/CONSTANTS'
import { getDownloadURL, getStorage, uploadBytes, uploadString, ref } from '@firebase/storage'
import { useMessageStore } from '@/stores'

export async function upload(payload = {}) {
  const { extension, file, mimeType, page } = payload
  const storage = getStorage()
  const storageRef = ref(storage, crypto.randomUUID() + '.' + extension)

  let fileName
  const metadata = {
    contentType: mimeType,
  }

  if (page === CONSTANTS?.pages?.image) {
    await uploadBytes(storageRef, file, metadata).then(snapshot => {
      fileName = snapshot.ref.name
    })
  } else if (page === CONSTANTS?.pages?.audio) {
    await uploadString(storageRef, file, 'data_url').then(snapshot => {
      fileName = snapshot.ref.name
    })
  }

  return fileName
}

export function fetchFile(payload) {
  const { fileName } = payload

  const storage = getStorage()
  const storageRef = ref(storage, fileName)

  // Get the download URL
  return getDownloadURL(storageRef)
    .then(url => url)
    .catch(error => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          //
          useMessageStore().setError({ error: "File doesn't exist" })
          break
        case 'storage/unauthorized':
          useMessageStore().setError({ error: "User doesn't have permission to access the object" })
          break
        case 'storage/canceled':
          useMessageStore().setError({ error: 'User canceled the upload' })
          break

        // ...

        case 'storage/unknown':
          useMessageStore().setError({ error: 'Unknown error occurred, inspect the server response' })
          break
      }
    })
}
