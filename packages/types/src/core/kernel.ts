export interface Kernel {
  /** 上报事件 */
  reportEvent(event: any): Promise<void>

  destroy(): void
}
