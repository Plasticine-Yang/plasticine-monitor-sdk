/** 上报的事件类型 */
export enum EventTypeEnum {
  /** JS 运行时错误 */
  JSError = 'js-error',
  /** 网络请求 */
  NetworkRequest = 'network-request',
  /** PV */
  PageView = 'page-view',
  /** 性能指标 */
  Performance = 'performance',
}

/** 性能指标种类 */
export enum PerformanceMetricsEnum {
  FP = 'FP',
  FCP = 'FCP',
}
