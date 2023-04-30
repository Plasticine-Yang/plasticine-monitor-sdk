import {
  DeepPartial,
  MonitorNetworkOptions,
  NetworkMetrics,
  UserBehaviorMetricsEnum,
  UserBehaviorQueue,
} from '@plasticine-monitor-sdk/types'

import { supportFetch, supportXHR } from '../../utils'

/**
 * 监听用户行为
 * @param userBehaviorQueue 用户行为队列
 * @returns 取消监听用户行为
 */
export function monitorNetwork(userBehaviorQueue: UserBehaviorQueue, options: MonitorNetworkOptions) {
  const { recordFetch, recordXMLHttpRequest } = options

  let unProxyFetch: VoidFunction | null = null
  let unProxyXMLHttpRequest: VoidFunction | null = null

  recordFetch && (unProxyFetch = proxyFetch(userBehaviorQueue))
  recordXMLHttpRequest && (unProxyXMLHttpRequest = proxyXMLHttpRequest(userBehaviorQueue))

  return function cancelMonitorNetwork() {
    unProxyFetch?.()
    unProxyXMLHttpRequest?.()
  }
}

/**
 * 拦截 XMLHttpRequest 记录用户行为
 */
function proxyXMLHttpRequest(userBehaviorQueue: UserBehaviorQueue) {
  let originalXMLHttpRequest: typeof XMLHttpRequest

  // 只在环境支持 XMLHttpRequest 时才拦截
  if (supportXHR()) {
    originalXMLHttpRequest = window.XMLHttpRequest

    // 将原始的 XMLHttpRequest 挂载到 SDK 的全局对象中，避免 SDK 自身的数据上报被监控
    if (
      !window.__PLASTICINE_MONITOR__?.XMLHttpRequest ||
      typeof window.__PLASTICINE_MONITOR__.XMLHttpRequest !== 'function'
    ) {
      window.__PLASTICINE_MONITOR__!.XMLHttpRequest = originalXMLHttpRequest
    }

    // 改写 XMLHttpRequest 记录数据到用户行为队列中
    window.XMLHttpRequest = class XMLHttpRequestProxy extends XMLHttpRequest {
      private networkMetrics: DeepPartial<NetworkMetrics>
      private startTime = 0

      constructor() {
        super()

        this.networkMetrics = {
          requestType: 'XHR',
          request: {
            headers: {},
          },
          response: {},
          duration: -1,
        }

        this.addEventListener(
          'loadend',
          () => {
            const endTime = new Date().getTime()

            this.networkMetrics.response!.status = this.status
            this.networkMetrics.response!.timestamp = endTime
            this.networkMetrics.duration = endTime - this.startTime

            // response headers
            this.networkMetrics.response!.headers = {}
            for (const header of this.getAllResponseHeaders().split(/\r?\n/)) {
              const [key, value] = header.split(':')
              this.networkMetrics.response!.headers[key] = value?.trim()
            }

            // response body
            let body: string
            try {
              body = JSON.stringify(this.response)
            } catch (error) {
              body = this.response
            }
            this.networkMetrics.response!.body = body

            // 记录请求行为
            userBehaviorQueue.add({
              name: UserBehaviorMetricsEnum.Network,
              value: this.networkMetrics as NetworkMetrics,
            })
          },
          { once: true },
        )
      }

      open(
        method: string,
        url: string | URL,
        async?: boolean,
        username?: string | null | undefined,
        password?: string | null | undefined,
      ): void {
        this.networkMetrics.request!.method = method as string
        this.networkMetrics.request!.url = url as string

        super.open(method, url, async ?? true, username, password)
      }

      setRequestHeader(name: string, value: string): void {
        this.networkMetrics.request!.headers![name] = value
      }

      send(body?: Document | XMLHttpRequestBodyInit | null | undefined): void {
        this.networkMetrics.request!.timestamp = this.startTime = new Date().getTime()
        this.networkMetrics.request!.body = body?.toString()

        super.send(body)
      }
    }
  }

  return function unProxyXMLHttpRequest() {
    if (originalXMLHttpRequest !== undefined) {
      window.XMLHttpRequest = originalXMLHttpRequest
    }
  }
}

/**
 * 拦截 XMLHttpRequest 记录用户行为
 */
function proxyFetch(userBehaviorQueue: UserBehaviorQueue) {
  let originalFetch: typeof fetch

  if (supportFetch()) {
    originalFetch = window.fetch
  }

  return function unProxyFetch() {
    if (originalFetch !== undefined) {
      window.fetch = originalFetch
    }
  }
}
