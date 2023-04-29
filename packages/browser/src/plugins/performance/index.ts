import { BrowserKernel, BrowserPlugin } from '@plasticine-monitor-sdk/types'

import { PerformanceMetricsManager } from './performance-metrics-manager'

export function pluginPerformance(): BrowserPlugin {
  const performanceMetricsManager = new PerformanceMetricsManager()
  let browserKernel: BrowserKernel

  const handleLoad = () => {
    performanceMetricsManager.onReport((performanceEvent) => {
      browserKernel.reportEvent(performanceEvent)
    })

    performanceMetricsManager.observe()
  }

  return {
    name: 'performance',

    init(kernel) {
      browserKernel = kernel
      window.addEventListener('load', handleLoad)
    },

    beforeDestroy() {
      window.removeEventListener('load', handleLoad)

      // 取消对性能指标数据的监听
      performanceMetricsManager.destroy()
    },
  }
}
