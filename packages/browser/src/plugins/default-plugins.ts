import type { Plugin } from '@plasticine-monitor-sdk/types'

import { pluginJSError } from './js-error'

export const defaultPlugins: Plugin[] = [pluginJSError()]
