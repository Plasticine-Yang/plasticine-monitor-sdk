import {
  BrowserKernel,
  BrowserPlugin,
  EventTypeEnum,
  PerformanceEvent,
  PerformanceMetricsEnum,
  PerformancePayload,
} from '@plasticine-monitor-sdk/types'

/** 获取页面的 FP(first-paint) 性能指标 */
function getFP(): PerformancePayload {
  return {
    name: PerformanceMetricsEnum.FP,
    value: performance.getEntriesByName('first-paint').at(0)?.startTime ?? -1,
  }
}

/** 获取页面的 FCP(first-contentful-paint) 性能指标 */
function getFCP(): PerformancePayload {
  return {
    name: PerformanceMetricsEnum.FCP,
    value: performance.getEntriesByName('first-contentful-paint').at(0)?.startTime ?? -1,
  }
}

/** 获取待上报的性能指标事件 */
function getPerformanceEvent(): PerformanceEvent {
  return {
    eventType: EventTypeEnum.Performance,
    payload: [getFP(), getFCP()],
  }
}

export function pluginPerformance(): BrowserPlugin {
  let browserKernel: BrowserKernel

  const handleLoad = () => {
    const performanceEvent = getPerformanceEvent()
    browserKernel.reportEvent(performanceEvent)
  }

  return {
    name: 'performance',

    init(kernel) {
      browserKernel = kernel
      window.addEventListener('load', handleLoad)
    },

    beforeDestroy() {
      window.removeEventListener('load', handleLoad)
    },
  }
}
