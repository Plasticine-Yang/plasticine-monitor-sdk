import type { JSErrorEvent } from './js-error-event'
import type { PerformanceEvent } from './performance-event'
import type { UserBehaviorEvent } from './user-behavior-event'

export type BrowserEvent = JSErrorEvent | PerformanceEvent | UserBehaviorEvent
