import type { Plugin } from '@plasticine-monitor-sdk/types'

import { pluginJSError } from './js-error'
import { pluginPerformance } from './performance'
import { pluginUserBehavior } from './user-behavior'

export const defaultPlugins: Plugin[] = [
  // js-error 插件依赖于 user-behavior 插件 - 不是强依赖，即便没开启 user-behavior 插件也不影响 js-error 插件运行
  // 但是如果希望 js-error 插件捕获到错误的时候记录到用户行为中的话就需要先初始化 user-behavior 插件才行
  pluginUserBehavior(),
  pluginJSError(),
  pluginPerformance(),
]
