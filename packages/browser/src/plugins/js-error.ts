import type { BrowserKernel, Plugin } from '@plasticine-monitor-sdk/types'

export function pluginJSError(): Plugin<BrowserKernel> {
  let browserKernel: BrowserKernel | null = null

  const handleError = (ev: ErrorEvent) => {
    browserKernel?.reportData({ name: 'error', ev })
  }

  const handleUnhandledRejection = (ev: PromiseRejectionEvent) => {
    browserKernel?.reportData({ name: 'promise error', ev })
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
