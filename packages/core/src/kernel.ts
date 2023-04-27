import type { KernelOptions } from '@plasticine-monitor-sdk/types'

export abstract class Kernel {
  private kernelOptions: KernelOptions

  constructor(kernelOptions: KernelOptions) {
    this.kernelOptions = kernelOptions
    this.init()
  }

  /** 初始化 */
  private init(): void {
    this.initPlugins()
  }

  /** 初始化插件 */
  private initPlugins(): void {
    const { plugins } = this.kernelOptions

    for (const plugin of plugins) {
      plugin.init(this)
    }
  }

  /** 上报事件 */
  protected reportEvent<E>(event: E): void {
    const { plugins, url, sender } = this.kernelOptions

    for (const plugin of plugins) {
      plugin.beforeReport?.(event)
    }

    sender.send(url, event)
  }

  /** 销毁实例 */
  public destroy() {
    const { plugins } = this.kernelOptions

    for (const plugin of plugins) {
      plugin.beforeDestroy?.()
    }
  }
}
