import type { DeepRequired } from '../../utils'

export interface PluginUserBehaviorOptions {
  /** 超过最大长度后进行上报 */
  maxLengthToReport?: number

  /**
   * 是否要记录 XMLHttpRequest 请求行为
   *
   * @default true
   */
  recordXMLHttpRequest?: boolean

  /**
   * 是否要记录 fetch 请求行为
   *
   * @default true
   */
  recordFetch?: boolean

  /**
   * 每隔多久上报一次用户行为（只在用户行为队列中有记录时才会上报） - 单位：ms
   *
   * @default 3000
   */
  reportIntervalTimeout?: number
}

export type ResolvedPluginUserBehaviorOptions = DeepRequired<PluginUserBehaviorOptions>

export type MonitorNetworkOptions = Pick<ResolvedPluginUserBehaviorOptions, 'recordFetch' | 'recordXMLHttpRequest'>
