import type { BrowserKernel } from '@plasticine-monitor-sdk/types'

declare global {
  interface Window {
    __PLASTICINE_MONITOR__?: {
      browserKernel?: BrowserKernel

      /** 原始的 XHR - 用于给 SDK 上报数据，避免被自身拦截 */
      XMLHttpRequest?: typeof XMLHttpRequest

      /** 原始的 fetch - 用于给 SDK 上报数据，避免被自身拦截 */
      fetch?: typeof fetch
    }
  }
}
