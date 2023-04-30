import type { UserBehaviorPayload } from './events'

export interface UserBehaviorQueue {
  add(userBehaviorPayload: UserBehaviorPayload): void

  clear(): void

  getPayload(): UserBehaviorPayload[]

  getLength(): number
}
