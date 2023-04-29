import type { JSErrorEvent } from './js-error-event'
import type { PerformanceEvent } from './performance-event'

export type BrowserEvent = JSErrorEvent | PerformanceEvent
