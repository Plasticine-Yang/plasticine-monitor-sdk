import type { UserBehaviorPayload, UserBehaviorQueue } from '@plasticine-monitor-sdk/types'

type OnReport = (userBehaviorPayloads: UserBehaviorPayload[]) => void

export class UserBehaviorQueueImpl implements UserBehaviorQueue {
  private onReport: OnReport
  private queue: UserBehaviorPayload[]
  private maxLength: number

  constructor(maxLength: number, onReport: OnReport) {
    this.onReport = onReport
    this.maxLength = maxLength
    this.queue = []
  }

  public add(payload: UserBehaviorPayload) {
    // 达到最大长度时进行上报
    if (this.queue.length >= this.maxLength) {
      this.onReport([...this.queue])
      this.clear()
    }

    this.queue.push(payload)
  }

  public clear() {
    this.queue.length = 0
  }

  public getLength() {
    return this.queue.length
  }

  public getPayload(): UserBehaviorPayload[] {
    return this.queue
  }
}
