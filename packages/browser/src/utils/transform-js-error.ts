import type { JSError } from '@plasticine-monitor-sdk/types'

/** 将所有可能的输入转成 JSError */
export function transformJSError(error: string | Error | ErrorEvent | PromiseRejectionEvent): JSError {
  let jsError: JSError = {
    message: 'unknown',
  }

  if (typeof error === 'string') {
    jsError = {
      message: error,
    }
  }

  if (error instanceof Error) {
    jsError = {
      message: error.message,
      name: error.name,
      stack: error.stack,
    }
  }

  if (error instanceof ErrorEvent) {
    const internalError = error.error
    const isError = internalError instanceof Error

    jsError = {
      message: error.message,
      name: isError ? internalError.name : undefined,
      filename: error.filename,
      lineno: error.lineno,
      colno: error.colno,
      stack: isError ? internalError.stack : undefined,
    }
  }

  if (error instanceof PromiseRejectionEvent) {
    const interalError = error.reason
    const isError = interalError instanceof Error

    jsError = {
      message: isError ? interalError.message : 'promise error',
      name: isError ? interalError.name : undefined,
      stack: isError ? interalError.stack : undefined,
    }
  }

  return jsError
}
