import type { PageViewMetrics, UserBehaviorQueue } from '@plasticine-monitor-sdk/types'
import { UserBehaviorMetricsEnum } from '@plasticine-monitor-sdk/types'

/**
 * 监控 PV
 * @param userBehaviorQueue 用户行为队列
 * @returns 取消监控 PV
 */
export function monitorPV(userBehaviorQueue: UserBehaviorQueue) {
  const handleLoad = () => {
    userBehaviorQueue.add({
      name: UserBehaviorMetricsEnum.PageView,
      value: {
        pagePath: window.location.pathname,
      } as PageViewMetrics,
    })
  }

  window.addEventListener('load', handleLoad)

  return function cancelMonitorPV() {
    window.removeEventListener('load', handleLoad)
  }
}
