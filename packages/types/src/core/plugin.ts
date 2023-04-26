import type { Kernel } from './kernel'
import type { DataForReport } from './data-for-report'

export interface Plugin<K extends Kernel = Kernel> {
  name: string

  init(kernel: K): void

  beforeReport?(data: DataForReport): void

  beforeDestroy?(): void
}
