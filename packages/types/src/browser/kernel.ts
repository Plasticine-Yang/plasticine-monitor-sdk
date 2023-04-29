import type { Logger } from '../core'
import type { BrowserEvent } from './events'

export interface BrowserKernel {
  logger: Logger

  /** 上报事件 */
  reportEvent(event: BrowserEvent): void

  /** 捕获错误进行上报 */
  captureError(error: string | Error | ErrorEvent | PromiseRejectionEvent): void

  destroy(): void
}
