import type { CreateLoggerOptions, Logger } from './logger'
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

  /**
   * 项目发布的版本
   *
   * @default 'unknown'
   */
  release?: string

  /**
   * 项目的环境标识
   *
   * @default 'unknown'
   */
  env?: string

  /**
   * 是否允许输出 SDK 内部的日志信息
   *
   * @default false
   */
  enableLogger?: boolean

  /** 插件 */
  plugins?: Plugin[]

  /**
   * 自定义用什么方式发送 - 比如 XHR or Fetch API
   *
   * @default 根据浏览器环境决定，优先使用 Fetch API
   */
  sender?: Sender | null
}

/**
 * 内核的配置参数
 */
export interface KernelOptions extends Required<SDKOptions> {
  /** 创建 Logger 实例 */
  createLogger(options: CreateLoggerOptions): Logger
}
