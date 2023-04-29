import type { Plugin } from '../core'
import type { Event } from './events'
import type { BrowserKernel } from './kernel'

export type BrowserPlugin = Plugin<BrowserKernel, Event>
