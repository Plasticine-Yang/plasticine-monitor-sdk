import type { Kernel, Logger } from '../core'
import type { BrowserEvent } from './events'
import type { UserBehaviorQueue } from './user-behavior-queue'

export interface BrowserKernel extends Kernel {
  logger: Logger

  /** 上报事件 */
  reportEvent(event: BrowserEvent): Promise<void>

  /** 捕获错误进行上报 */
  captureError(error: string | Error | ErrorEvent | PromiseRejectionEvent): void

  /** 手动调用指明 TTI 时刻 - 需要启用了 performance 插件才会动态挂载该方法 */
  recordTTI?: () => void

  /** 开启了监控用户行为的插件 pluginUserBehavior 后会动态挂载该属性 */
  userBehaviorQueue?: UserBehaviorQueue
}
