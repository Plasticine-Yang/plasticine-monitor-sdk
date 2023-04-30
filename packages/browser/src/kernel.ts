import { KernelImpl } from '@plasticine-monitor-sdk/core'
import type {
  BaseEvent,
  BrowserEvent,
  BrowserKernel,
  BrowserKernelOptions,
  EnvironmentInfo,
  JSErrorExtra,
  JSErrorPayload,
} from '@plasticine-monitor-sdk/types'
import { EventTypeEnum } from '@plasticine-monitor-sdk/types'

import { transformJSError } from './utils'

export class BrowserKernelImpl extends KernelImpl implements BrowserKernel {
  private browserKernelOptions: BrowserKernelOptions

  constructor(browserKernelOptions: BrowserKernelOptions) {
    super(browserKernelOptions)

    this.browserKernelOptions = browserKernelOptions
  }

  private getEnvironmentInfo(): EnvironmentInfo {
    const { env, projectId, release } = this.browserKernelOptions
    const { href, pathname } = window.location

    return {
      env,
      projectId,
      release,
      timestamp: new Date().getTime(),
      url: href,
      pagePath: pathname,
      userId: '',
    }
  }

  public captureError(error: string | Error | ErrorEvent | PromiseRejectionEvent, extra?: JSErrorExtra): void {
    const jsError = transformJSError(error)
    const jsErrorPayload: JSErrorPayload = {
      error: jsError,
      extra,
    }

    this.reportEvent({
      eventType: EventTypeEnum.JSError,
      payload: jsErrorPayload,
    })
  }

  public reportEvent(event: BrowserEvent): void {
    const resolvedEvent: BaseEvent = {
      environmentInfo: event.environmentInfo ?? this.getEnvironmentInfo(),
      eventType: event.eventType,
      payload: event.payload,
    }

    super.reportEvent(resolvedEvent)
  }
}
