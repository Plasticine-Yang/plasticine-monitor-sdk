import { KernelImpl } from '@plasticine-monitor-sdk/core'
import type { BrowserKernel, BrowserKernelOptions } from '@plasticine-monitor-sdk/types'

export class BrowserKernelImpl extends KernelImpl implements BrowserKernel {
  private browserKernelOptions: BrowserKernelOptions

  constructor(browserKernelOptions: BrowserKernelOptions) {
    super(browserKernelOptions)

    this.browserKernelOptions = browserKernelOptions
  }
}
