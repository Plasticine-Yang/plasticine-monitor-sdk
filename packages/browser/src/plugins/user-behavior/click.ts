import type { ClickMetrics, UserBehaviorQueue } from '@plasticine-monitor-sdk/types'
import { UserBehaviorMetricsEnum } from '@plasticine-monitor-sdk/types'

import { generateUUID } from '../../utils'

/**
 * 监控用户点击行为
 * @param userBehaviorQueue 用户行为队列
 * @returns 取消监控用户点击行为
 */
export function monitorClick(userBehaviorQueue: UserBehaviorQueue) {
  const handleClick = (ev: MouseEvent) => {
    const target = ev.target as HTMLElement

    userBehaviorQueue.add({
      id: generateUUID(),
      name: UserBehaviorMetricsEnum.Click,
      value: {
        id: target.id,
        classList: Array.from(target.classList),
        tagName: target.tagName.toLowerCase(),
        textContent: target.textContent,
      } as ClickMetrics,
      timestamp: Date.now(),
    })
  }

  window.addEventListener('click', handleClick)

  return function cancelMonitorClick() {
    window.removeEventListener('click', handleClick)
  }
}
