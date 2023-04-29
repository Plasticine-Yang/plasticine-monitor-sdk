import type { Plugin } from '@plasticine-monitor-sdk/types'

import { pluginDemo } from './demo'
import { pluginJSError } from './js-error'

export const defaultPlugins: Plugin[] = [pluginJSError(), pluginDemo()]
