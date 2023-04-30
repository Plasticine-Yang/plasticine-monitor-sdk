import type { BaseEvent } from '../base-event'
import type { EventTypeEnum, UserBehaviorMetricsEnum } from '../enum'
import type { PageViewMetrics } from './page-view'

export interface UserBehaviorPayload {
  /** 用户行为指标种类名 */
  name: UserBehaviorMetricsEnum
  /** 性能指标数值 - 单位 ms */
  value: PageViewMetrics
}

export type UserBehaviorEvent = BaseEvent<EventTypeEnum.UserBehavior, UserBehaviorPayload[]>
