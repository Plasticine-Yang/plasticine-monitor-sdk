import type { Plugin } from '../core'
import type { BrowserEvent } from './events'
import type { BrowserKernel } from './kernel'

export type BrowserPlugin = Plugin<BrowserKernel, BrowserEvent>
