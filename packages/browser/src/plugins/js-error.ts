import type { BrowserKernel, BrowserPlugin } from '@plasticine-monitor-sdk/types'

export function pluginJSError(): BrowserPlugin {
  let browserKernel: BrowserKernel | null = null

  const handleError = (ev: ErrorEvent) => {
    browserKernel?.captureError(ev)
  }

  const handleUnhandledRejection = (ev: PromiseRejectionEvent) => {
    browserKernel?.captureError(ev)
  }

  return {
    name: 'js-error',

    init(kernel) {
      browserKernel = kernel
      window.addEventListener('error', handleError)
      window.addEventListener('unhandledrejection', handleUnhandledRejection)
    },

    beforeDestroy() {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    },
  }
}
