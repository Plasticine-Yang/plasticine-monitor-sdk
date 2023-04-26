import type { DataForReport } from './data-for-report'

export interface Kernel {
  /** 上报数据 */
  reportData(data: DataForReport): void
}
