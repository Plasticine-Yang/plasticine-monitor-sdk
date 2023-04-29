import type { BaseEvent } from './base-event'
import type { EventTypeEnum, PerformanceMetricsEnum } from './enum'

export interface PerformancePayload {
  /** 性能指标种类名 */
  name: PerformanceMetricsEnum
  /** 性能指标数值 - 单位 ms */
  value: number
}

export type PerformanceEvent = BaseEvent<EventTypeEnum.Performance, PerformancePayload>
