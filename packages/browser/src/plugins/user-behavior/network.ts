import {
  DeepPartial,
  MonitorNetworkOptions,
  NetworkMetrics,
  UserBehaviorMetricsEnum,
  UserBehaviorQueue,
} from '@plasticine-monitor-sdk/types'

import { generateUUID, supportFetch, supportXHR } from '../../utils'

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
            this.networkMetrics.request!.url = this.responseURL

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
              id: generateUUID(),
              name: UserBehaviorMetricsEnum.Network,
              value: this.networkMetrics as NetworkMetrics,
              timestamp: Date.now(),
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

    // 将原始的 XMLHttpRequest 挂载到 SDK 的全局对象中，避免 SDK 自身的数据上报被监控
    if (!window.__PLASTICINE_MONITOR__?.fetch || typeof window.__PLASTICINE_MONITOR__.fetch !== 'function') {
      window.__PLASTICINE_MONITOR__!.fetch = originalFetch
    }

    // 改写 XMLHttpRequest 记录数据到用户行为队列中
    window.fetch = function proxyFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
      const startTime = new Date().getTime()
      const networkMetrics: DeepPartial<NetworkMetrics> = {
        requestType: 'Fetch',
        request: {
          headers: {},
        },
        response: {},
        duration: -1,
      }
      const url = typeof input === 'string' ? input : (input as Request).url
      let headers = init?.headers as Record<string, string> | undefined

      if (Array.isArray(init?.headers)) {
        headers = {}
        for (const [key, value] of init!.headers! as [string, string][]) {
          headers[key] = value
        }
      }

      networkMetrics.request!.timestamp = startTime
      networkMetrics.request!.url = url
      networkMetrics.request!.method = init?.method ?? 'GET'
      networkMetrics.request!.headers = headers
      networkMetrics.request!.body = init?.body?.toString()

      return originalFetch
        .call(window, input, init)
        .then(async (response) => {
          // clone 出一个新的 response,再用其做.text(),避免 body stream already read 问题
          const clonedResponse = response.clone()

          networkMetrics.response!.status = clonedResponse.status

          const headers: Record<string, string> = {}
          clonedResponse.headers.forEach((value, key) => {
            headers[key] = value
          })

          networkMetrics.response!.headers = headers
          networkMetrics.response!.body = await clonedResponse.text()
          networkMetrics.request!.url = response.url

          return response
        })
        .catch((reason) => {
          networkMetrics.response!.status = -1
          networkMetrics.request!.reason = String(reason)

          return reason
        })
        .finally(() => {
          const endTime = new Date().getTime()

          networkMetrics.response!.timestamp = endTime
          networkMetrics.duration = endTime - startTime

          userBehaviorQueue.add({
            id: generateUUID(),
            name: UserBehaviorMetricsEnum.Network,
            value: networkMetrics as NetworkMetrics,
            timestamp: Date.now(),
          })
        })
    }
  }

  return function unProxyFetch() {
    if (originalFetch !== undefined) {
      window.fetch = originalFetch
    }
  }
}
