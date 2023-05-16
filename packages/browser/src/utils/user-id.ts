import { USER_ID_STORAGE_KEY } from '../constants'
import { generateUUID } from './uuid'

export function generateUserId() {
  const storageUUID = localStorage.getItem(USER_ID_STORAGE_KEY)

  if (storageUUID === null) {
    const uuid = generateUUID()
    localStorage.setItem(USER_ID_STORAGE_KEY, uuid)

    return uuid
  }

  return storageUUID
}
