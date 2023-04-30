export type RequestType = 'XHR' | 'Fetch'

export interface NetworkRequest {
  method: string
  url: string
  headers?: { [key: string]: string }
  body?: string
  timestamp: number
}

export interface NetworkResponse {
  status: number
  timestamp: number
  headers?: { [key: string]: string }
  body?: string
}

/** HTTP 网络请求指标 */
export interface NetworkMetrics {
  /** 请求的类型 - XHR or Fetch */
  requestType: RequestType
  request: NetworkRequest
  response: NetworkResponse
  /** 请求耗时时长 */
  duration: number
}
