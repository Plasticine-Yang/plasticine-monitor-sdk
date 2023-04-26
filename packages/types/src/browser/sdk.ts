import type { BrowserKernel } from './kernel'
import type { BrowserSDKOptions } from './options'

export type FnInitBrowserSDK = (options: BrowserSDKOptions) => BrowserKernel
