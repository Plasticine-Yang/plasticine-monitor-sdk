import { SESSION_ID_STORAGE_KEY, USER_ID_STORAGE_KEY } from '../constants'
import { generateUUID } from './uuid'

function generateUUIDAndSaveToStorage(key: string, storage: Storage) {
  const storageUUID = storage.getItem(key)

  if (storageUUID === null) {
    const uuid = generateUUID()
    storage.setItem(key, uuid)

    return uuid
  }

  return storageUUID
}

export function generateUserId() {
  return generateUUIDAndSaveToStorage(USER_ID_STORAGE_KEY, localStorage)
}

export function generateSessionId() {
  return generateUUIDAndSaveToStorage(SESSION_ID_STORAGE_KEY, sessionStorage)
}
