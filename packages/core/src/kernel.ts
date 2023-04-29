import type { KernelOptions, Logger } from '@plasticine-monitor-sdk/types'

export abstract class Kernel {
  private kernelOptions: KernelOptions

  public logger: Logger

  constructor(kernelOptions: KernelOptions) {
    const { createLogger, enableLogger } = kernelOptions

    this.kernelOptions = kernelOptions
    this.logger = createLogger({ enableLogger })
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

    this.logger.info('初始化插件完成')
  }

  /** 上报事件 */
  protected reportEvent<E>(event: E): void {
    this.logger.info('准备上报事件：', event)

    const { plugins, url, sender } = this.kernelOptions

    this.logger.info('调用所有插件的 beforeReport 生命周期钩子...')
    for (const plugin of plugins) {
      plugin.beforeReport?.(event)
    }

    this.logger.info('上报事件', event)
    sender.send(url, event)
  }

  /** 销毁实例 */
  public destroy() {
    this.logger.info('准备销毁实例...')

    const { plugins } = this.kernelOptions

    this.logger.info('调用所有插件的 beforeDestroy 生命周期钩子...')
    for (const plugin of plugins) {
      plugin.beforeDestroy?.()
    }

    this.logger.info('实例销毁完毕')
  }
}
