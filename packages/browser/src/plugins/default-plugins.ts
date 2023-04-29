import type { Plugin } from '@plasticine-monitor-sdk/types'

import { pluginJSError } from './js-error'
import { pluginPerformance } from './performance'

export const defaultPlugins: Plugin[] = [pluginJSError(), pluginPerformance()]
