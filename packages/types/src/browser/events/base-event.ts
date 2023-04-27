import type { EventTypeEnum } from './enum'

/** Event 的共有结构 */
export interface BaseEvent<EventType extends EventTypeEnum = EventTypeEnum, Payload = any> {
  eventType: EventType
  payload: Payload
}
