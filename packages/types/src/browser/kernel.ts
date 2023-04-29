import type { Logger } from '../core'
import type { BrowserEvent } from './events'

export interface BrowserKernel {
  logger: Logger

  /** 上报事件 */
  reportEvent(event: BrowserEvent): void

  /** 捕获错误进行上报 */
  captureError(error: string | Error | ErrorEvent | PromiseRejectionEvent): void

  destroy(): void

  /** 手动调用指明 TTI 时刻 - 需要启用了 performance 插件才会动态挂载该方法 */
  recordTTI?: () => void
}
