import type { Kernel } from './kernel'
import type { Plugin } from './plugin'

export interface PluginManager {
  kernel: Kernel
  plugins: Plugin[]

  register(plugin: Plugin): void
}
