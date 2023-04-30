export interface UserBehaviorQueue<UserBehaviorPayload = unknown> {
  add(userBehaviorPayload: UserBehaviorPayload): void

  clear(): void

  getPayload(): UserBehaviorPayload[]
}
