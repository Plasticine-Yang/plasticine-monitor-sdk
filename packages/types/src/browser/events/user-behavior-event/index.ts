import type { BaseEvent } from '../base-event'
import type { EventTypeEnum, UserBehaviorMetricsEnum } from '../enum'
import type { JSErrorPayload as JSErrorMetrics } from '../js-error-event'
import type { NetworkMetrics } from './network'
import type { PageViewMetrics } from './page-view'

export interface UserBehaviorPayload {
  id: string
  /** 用户行为指标种类名 */
  name: UserBehaviorMetricsEnum
  /** 性能指标数值 - 单位 ms */
  value: PageViewMetrics | JSErrorMetrics | NetworkMetrics | null
  timestamp: number
}

export type UserBehaviorEvent = BaseEvent<EventTypeEnum.UserBehavior, UserBehaviorPayload[]>

export type { PageViewMetrics, NetworkMetrics }
