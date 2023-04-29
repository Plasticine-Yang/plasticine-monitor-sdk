import { EventTypeEnum, PerformanceEvent, PerformancePayload } from '@plasticine-monitor-sdk/types'
import { PerformanceMetricsEnum } from '@plasticine-monitor-sdk/types'

type OnReportCallback = (performanceEvent: PerformanceEvent) => void

export class PerformanceMetricsManager {
  private performanceObserver: PerformanceObserver
  private reportCallback: OnReportCallback | null = null

  constructor() {
    this.performanceObserver = new PerformanceObserver(this.performanceObserverCallback)
  }

  private generatePerformanceEvent(payload: PerformancePayload): PerformanceEvent {
    return {
      eventType: EventTypeEnum.Performance,
      payload,
    }
  }

  private performanceObserverCallback: PerformanceObserverCallback = (entryList) => {
    for (const entry of entryList.getEntries()) {
      // FP & FCP
      if (entry.entryType === 'paint') {
        const performancePaintTiming = entry as PerformancePaintTiming

        switch (entry.name) {
          case 'first-paint':
            this.reportCallback?.(
              this.generatePerformanceEvent({
                name: PerformanceMetricsEnum.FP,
                value: performancePaintTiming.startTime,
              }),
            )
            break

          case 'first-contentful-paint':
            this.reportCallback?.(
              this.generatePerformanceEvent({
                name: PerformanceMetricsEnum.FCP,
                value: performancePaintTiming.startTime,
              }),
            )
            break

          default:
            break
        }
      }

      // LCP
      if (entry.entryType === 'largest-contentful-paint') {
        this.reportCallback?.(
          this.generatePerformanceEvent({
            name: PerformanceMetricsEnum.LCP,
            value: entry.startTime,
          }),
        )
      }

      // FID
      if (entry.entryType === 'first-input') {
        const performanceEventTiming = entry as PerformanceEventTiming

        this.reportCallback?.(
          this.generatePerformanceEvent({
            name: PerformanceMetricsEnum.FID,
            value: performanceEventTiming.processingStart - performanceEventTiming.startTime,
          }),
        )
      }
    }
  }

  public observe() {
    // FP & FCP
    this.performanceObserver.observe({ type: 'paint', buffered: true })

    // LCP
    this.performanceObserver.observe({ type: 'largest-contentful-paint', buffered: true })

    // FID
    this.performanceObserver.observe({ type: 'first-input', buffered: true })
  }

  public onReport(reportCallback: OnReportCallback) {
    this.reportCallback = reportCallback
  }

  public destroy() {
    this.performanceObserver.disconnect()
  }
}
