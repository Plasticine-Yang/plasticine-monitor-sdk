import type { Plugin } from './plugin'
import type { Sender } from './sender'

/**
 * 用户在使用 SDK 时传入的配置参数
 */
export interface SDKOptions {
  /** 往哪里上报 */
  url: string

  /** 项目 id */
  projectId: string

  /** 项目发布的版本 */
  release?: string

  /** 项目的环境标识 */
  env?: string

  /** 插件 */
  plugins?: Plugin[]

  /** 自定义用什么方式发送 - 比如 XHR or Fetch API */
  sender?: Sender
}

/**
 * 内核的配置参数
 */
export interface KernelOptions extends Required<SDKOptions> {}
