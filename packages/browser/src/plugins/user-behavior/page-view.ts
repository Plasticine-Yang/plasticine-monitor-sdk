import { UserBehaviorMetricsEnum, UserBehaviorQueue } from '@plasticine-monitor-sdk/types'

export function initPV(userBehaviorQueue: UserBehaviorQueue) {
  const handleLoad = () => {
    userBehaviorQueue.add({
      name: UserBehaviorMetricsEnum.PageView,
      value: {
        pagePath: window.location.pathname,
      },
    })
  }

  window.addEventListener('load', handleLoad)

  return () => {
    window.removeEventListener('load', handleLoad)
  }
}
