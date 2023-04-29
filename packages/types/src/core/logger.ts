export interface Logger {
  /** info log */
  info(...messages: any[]): void

  /** success log */
  success(...messages: any[]): void

  /** warning log */
  warning(...messages: any[]): void

  /** error log */
  error(...messages: any[]): void
}

export interface CreateLoggerOptions {
  enableLogger?: boolean
}
