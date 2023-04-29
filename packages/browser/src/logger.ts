import type { CreateLoggerOptions, Logger } from '@plasticine-monitor-sdk/types'

const emptyStyle = ''

const containerStyle = 'padding: 2px 4px; font-size: 14px; border-radius: 4px;'

const plasticineMonitorStyle = `${containerStyle} margin-right: 10px; background: #7e78d2; color: #221e59;`

const logStyle: Record<keyof Logger, string> = {
  info: 'background: #27e5fa; color: #035b65;',
  success: 'background: #80ffdb; color: #00523b;',
  warning: 'background: #e9ff70; color: #596900;',
  error: 'background: #ff70a6; color: #9d003c;',
}

export function createBrowserLogger(options: CreateLoggerOptions): Logger {
  const { enableLogger } = options

  const log = (level: keyof Logger, ...messages: any[]) => {
    if (!enableLogger) {
      return
    }

    console.log(
      '%c plasticine-monitor %c %s %c\n\n',
      plasticineMonitorStyle,
      `${containerStyle} ${logStyle[level]}`,
      level.toUpperCase(),
      emptyStyle,
      ...messages,
    )
  }

  return {
    info(...messages) {
      log('info', ...messages)
    },

    success(...messages) {
      log('success', ...messages)
    },

    warning(...messages) {
      log('warning', ...messages)
    },

    error(...messages) {
      log('error', ...messages)
    },
  }
}
