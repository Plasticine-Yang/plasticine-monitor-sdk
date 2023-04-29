import type { BrowserKernel } from '@plasticine-monitor-sdk/types'

declare global {
  interface Window {
    __PLASTICINE_MONITOR__?: BrowserKernel
  }
}
