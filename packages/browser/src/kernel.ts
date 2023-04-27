import { Kernel } from '@plasticine-monitor-sdk/core'
import {
  BrowserKernel,
  BrowserKernelOptions,
  EventTypeEnum,
  JSErrorEvent,
  JSErrorExtra,
  JSErrorPayload,
} from '@plasticine-monitor-sdk/types'

import { transformJSError } from './utils'

export class BrowserKernelImpl extends Kernel implements BrowserKernel {
  private browserKernelOptions: BrowserKernelOptions

  constructor(browserKernelOptions: BrowserKernelOptions) {
    super(browserKernelOptions)

    this.browserKernelOptions = browserKernelOptions
  }

  public captureError(error: string | Error | ErrorEvent | PromiseRejectionEvent, extra?: JSErrorExtra): void {
    const jsError = transformJSError(error)
    const jsErrorPayload: JSErrorPayload = {
      error: jsError,
      extra,
    }
    const jsErrorEvent: JSErrorEvent = {
      eventType: EventTypeEnum.JSError,
      payload: jsErrorPayload,
    }

    this.reportEvent(jsErrorEvent)
  }
}
