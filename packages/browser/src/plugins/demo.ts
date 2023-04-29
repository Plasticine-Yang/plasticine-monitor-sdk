import type { BrowserPlugin } from '@plasticine-monitor-sdk/types'

export function pluginDemo(): BrowserPlugin {
  return {
    name: 'demo',

    init(kernel) {
      kernel.logger.info('A simple info')
      kernel.logger.success('A simple success')
      kernel.logger.warning('A simple warning')
      kernel.logger.error('A simple error')
    },
  }
}
