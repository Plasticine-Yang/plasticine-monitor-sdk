import type { EventTypeEnum } from './enum'
import type { EnvironmentInfo } from './environment-info'

export interface BaseEvent<EventType extends EventTypeEnum = EventTypeEnum, Payload = any> {
  eventType: EventType
  payload: Payload
  environmentInfo?: EnvironmentInfo
}
