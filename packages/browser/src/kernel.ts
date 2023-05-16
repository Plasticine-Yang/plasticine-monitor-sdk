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
import { EventTypeEnum, UserBehaviorMetricsEnum } from '@plasticine-monitor-sdk/types'

import { transformJSError } from './utils'

export class BrowserKernelImpl extends KernelImpl implements BrowserKernel {
  private browserKernelOptions: BrowserKernelOptions

  constructor(browserKernelOptions: BrowserKernelOptions) {
    super(browserKernelOptions)

    this.browserKernelOptions = browserKernelOptions
  }

  private getEnvironmentInfo(): EnvironmentInfo {
    const { env, projectId, release, userId } = this.browserKernelOptions
    const { href, pathname } = window.location

    return {
      env,
      projectId,
      release,
      timestamp: new Date().getTime(),
      url: href,
      pagePath: pathname,
      userId,
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

    // 如果启用了 user-behavior 插件则会动态挂载 userBehaviorQueue 属性记录用户行为
    ;(this as BrowserKernel).userBehaviorQueue?.add({
      name: UserBehaviorMetricsEnum.JSError,
      value: jsErrorPayload,
    })
  }

  public async reportEvent(event: BrowserEvent): Promise<void> {
    const resolvedEvent: BaseEvent = {
      environmentInfo: event.environmentInfo ?? this.getEnvironmentInfo(),
      eventType: event.eventType,
      payload: event.payload,
    }

    super.reportEvent(resolvedEvent)
  }
}
