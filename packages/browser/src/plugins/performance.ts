import {
  BrowserKernel,
  BrowserPlugin,
  EventTypeEnum,
  PerformanceEvent,
  PerformanceMetricsEnum,
  PerformancePayload,
} from '@plasticine-monitor-sdk/types'

class PerformanceMetricsManager {
  private performanceObserver: PerformanceObserver
  private performancePayloadList: PerformancePayload[] = []

  constructor() {
    this.performanceObserver = new PerformanceObserver(this.performanceObserverCallback)
    this.observe()
  }

  private performanceObserverCallback: PerformanceObserverCallback = (entryList) => {
    for (const entry of entryList.getEntries()) {
      console.log(entry)
      // FP & FCP
      if (entry.entryType === 'paint') {
        switch (entry.name) {
          case 'first-paint':
            this.performancePayloadList.push({
              name: PerformanceMetricsEnum.FP,
              value: entry.startTime,
            })
            break

          case 'first-contentful-paint':
            this.performancePayloadList.push({
              name: PerformanceMetricsEnum.FCP,
              value: entry.startTime,
            })
            break

          default:
            break
        }
      }

      // LCP
      if (entry.entryType === 'largest-contentful-paint') {
        this.performancePayloadList.push({
          name: PerformanceMetricsEnum.LCP,
          value: entry.startTime,
        })
      }
    }
  }

  private observe() {
    // FP & FCP
    this.performanceObserver.observe({ type: 'paint', buffered: true })

    // LCP
    this.performanceObserver.observe({ type: 'largest-contentful-paint', buffered: true })
  }

  public getPerformanceEvent(): PerformanceEvent {
    return {
      eventType: EventTypeEnum.Performance,
      payload: this.performancePayloadList,
    }
  }

  public destroy() {
    this.performanceObserver.disconnect()
  }
}

export function pluginPerformance(): BrowserPlugin {
  let browserKernel: BrowserKernel
  let performanceMetricsManager: PerformanceMetricsManager

  const handleLoad = () => {
    performanceMetricsManager = new PerformanceMetricsManager()
    browserKernel.reportEvent(performanceMetricsManager.getPerformanceEvent())
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
