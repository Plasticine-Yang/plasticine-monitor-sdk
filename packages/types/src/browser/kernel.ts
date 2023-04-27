export interface BrowserKernel {
  /** 捕获错误进行上报 */
  captureError(error: string | Error | ErrorEvent | PromiseRejectionEvent): void

  destroy(): void
}
