import { Logger } from '../core'

export interface BrowserKernel {
  logger: Logger

  /** 捕获错误进行上报 */
  captureError(error: string | Error | ErrorEvent | PromiseRejectionEvent): void

  destroy(): void
}
