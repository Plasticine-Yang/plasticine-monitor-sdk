import type { BrowserKernel, BrowserPlugin } from '@plasticine-monitor-sdk/types'
import { EventTypeEnum, PerformanceMetricsEnum } from '@plasticine-monitor-sdk/types'

import { PerformanceMetricsManager } from './performance-metrics-manager'

export function pluginPerformance(): BrowserPlugin {
  const performanceMetricsManager = new PerformanceMetricsManager()
  let browserKernel: BrowserKernel

  const recordTTI = () => {
    browserKernel.reportEvent({
      eventType: EventTypeEnum.Performance,
      payload: {
        name: PerformanceMetricsEnum.TTI,
        value: performance.now(),
      },
    })
  }

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

      // 动态挂载手动记录 TTI 的方法到内核实例上
      browserKernel.recordTTI = recordTTI

      window.addEventListener('load', handleLoad)
    },

    beforeDestroy() {
      window.removeEventListener('load', handleLoad)

      delete browserKernel.recordTTI

      // 取消对性能指标数据的监听
      performanceMetricsManager.destroy()
    },
  }
}
