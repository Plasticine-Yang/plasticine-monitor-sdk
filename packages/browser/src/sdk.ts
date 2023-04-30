import type { BrowserKernelOptions, BrowserSDKOptions, FnInitBrowserSDK } from '@plasticine-monitor-sdk/types'

import { BrowserKernelImpl } from './kernel'
import { createBrowserLogger } from './logger'
import { defaultPlugins } from './plugins'
import { fetchSender, xhrSender } from './sender'
import { supportFetch, supportXHR } from './utils'

export const init: FnInitBrowserSDK = (browserSDKOptions) => {
  const browserKernelOptions: BrowserKernelOptions = resolveKernelOptions(browserSDKOptions)

  window.__PLASTICINE_MONITOR__ = {}

  const browserKernel = new BrowserKernelImpl(browserKernelOptions)

  window.__PLASTICINE_MONITOR__.browserKernel = browserKernel
}

/** 需要在调用完 init 之后才能够获取到内核实例 */
export function getBrowserKernel() {
  return window.__PLASTICINE_MONITOR__?.browserKernel
}

function resolveKernelOptions(browserSDKOptions: BrowserSDKOptions): BrowserKernelOptions {
  const { url, projectId, env, release, plugins, sender, enableLogger } = browserSDKOptions

  return {
    url,
    projectId,
    env: env ?? 'unknown',
    release: release ?? 'unknown',
    plugins: plugins ?? defaultPlugins,
    sender: sender ? sender : supportFetch() ? fetchSender : supportXHR() ? xhrSender : null,
    enableLogger: enableLogger ?? false,
    createLogger: createBrowserLogger,
  }
}
