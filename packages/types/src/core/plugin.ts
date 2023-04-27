export interface Plugin<Kernel = unknown, Event = unknown> {
  name: string

  init(kernel: Kernel): void

  beforeReport?(event: Event): void

  beforeDestroy?(): void
}
