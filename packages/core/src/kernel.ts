import type { Kernel, KernelOptions, DataForReport } from '@plasticine-monitor-sdk/types'

export class KernelImpl implements Kernel {
  private kernelOptions: KernelOptions

  constructor(kernelOptions: KernelOptions) {
    this.kernelOptions = kernelOptions
    this.init()
  }

  private init(): void {
    this.initPlugins()
  }

  private initPlugins(): void {
    const { plugins } = this.kernelOptions

    for (const plugin of plugins) {
      plugin.init(this)
    }
  }

  public reportData(data: DataForReport): void {
    const { plugins, url, sender } = this.kernelOptions

    for (const plugin of plugins) {
      plugin.beforeReport?.(data)
    }

    sender.send(url, data)
  }
}
