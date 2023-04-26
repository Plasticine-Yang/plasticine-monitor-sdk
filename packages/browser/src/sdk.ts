import type { BrowserKernelOptions, BrowserSDKOptions, FnInitBrowserSDK } from '@plasticine-monitor-sdk/types'

import { BrowserKernelImpl } from './kernel'
import { defaultPlugins } from './plugins'
import { fetchSender } from './sender'

export const init: FnInitBrowserSDK = (browserSDKOptions) => {
  const browserKernelOptions: BrowserKernelOptions = resolveKernelOptions(browserSDKOptions)

  const browserKernel = new BrowserKernelImpl(browserKernelOptions)

  return browserKernel
}

function resolveKernelOptions(browserSDKOptions: BrowserSDKOptions): BrowserKernelOptions {
  const { url, projectId, env, release, plugins, sender } = browserSDKOptions

  return {
    url,
    projectId,
    env: env ?? 'unknown',
    release: release ?? 'unknown',
    plugins: plugins ?? defaultPlugins,
    sender: sender ?? fetchSender,
  }
}
