import {
  BrowserKernel,
  BrowserPlugin,
  EventTypeEnum,
  PluginUserBehaviorOptions,
  UserBehaviorEvent,
  UserBehaviorPayload,
} from '@plasticine-monitor-sdk/types'

import {
  DEFAULT_MAX_LENGTH_TO_REPORT,
  DEFAULT_RECORD_FETCH,
  DEFAULT_RECORD_XHR,
  DEFAULT_REPORT_INTERVAL,
} from '../../constants'
import { monitorNetwork } from './network'
import { monitorPV } from './page-view'
import { UserBehaviorQueueImpl } from './queue'
import { monitorClick } from './click'

export function pluginUserBehavior(options?: PluginUserBehaviorOptions): BrowserPlugin {
  const resolvedOptions = resolveOptions(options)
  const { maxLengthToReport, recordFetch, recordXMLHttpRequest, reportIntervalTimeout } = resolvedOptions

  let browserKernel: BrowserKernel

  let cancelMonitorPV: VoidFunction
  let cancelMonitorClick: VoidFunction
  let cancelMonitorNetwork: VoidFunction
  let reportInterval: number

  /** 当用户行为队列的长度超出配置的最大值时触发上报 */
  const handleReportWhenExceed = (userBehaviorPayloads: UserBehaviorPayload[]) => {
    browserKernel.reportEvent({
      eventType: EventTypeEnum.UserBehavior,
      payload: userBehaviorPayloads,
    })
  }

  const reportUserBehavior = async () => {
    // 仅当有记录用户行为时才上报
    if (browserKernel.userBehaviorQueue!.getLength() > 0) {
      const userBehaviorEvent: UserBehaviorEvent = {
        eventType: EventTypeEnum.UserBehavior,
        payload: browserKernel.userBehaviorQueue!.getPayload(),
      }

      await browserKernel.reportEvent(userBehaviorEvent)

      // 上报完后清空用户行为队列
      browserKernel.userBehaviorQueue!.clear()
    }
  }

  /** 当页面隐藏时进行上报 */
  const handleReportWhenInvisible = () => {
    if (document.visibilityState === 'hidden') {
      reportUserBehavior()
    }
  }

  return {
    name: 'user-behavior',

    init(kernel) {
      browserKernel = kernel

      // 动态挂载到内核实例上，让其他插件也可以往里面添加用户行为 - 比如遇到 JS Error 时记录一下
      browserKernel.userBehaviorQueue = new UserBehaviorQueueImpl(maxLengthToReport, handleReportWhenExceed)

      // 页面不可见时上报
      document.addEventListener('visibilitychange', handleReportWhenInvisible)

      // PV
      cancelMonitorPV = monitorPV(browserKernel.userBehaviorQueue!)

      // 点击行为
      cancelMonitorClick = monitorClick(browserKernel.userBehaviorQueue!)

      // 网络请求
      cancelMonitorNetwork = monitorNetwork(browserKernel.userBehaviorQueue!, { recordFetch, recordXMLHttpRequest })

      // 每隔 reportInterval 时间上报一次用户行为事件
      reportInterval = window.setInterval(() => {
        reportUserBehavior()
      }, reportIntervalTimeout)
    },

    beforeDestroy() {
      // 取消定时上报
      clearInterval(reportInterval)

      // 取消所有用户行为监听器
      cancelMonitorNetwork()
      cancelMonitorClick()
      cancelMonitorPV()

      // 清空用户行为队列
      browserKernel.userBehaviorQueue!.clear()
      delete browserKernel.userBehaviorQueue

      // 取消页面不可见时上报
      document.removeEventListener('visibilitychange', handleReportWhenInvisible)
    },
  }
}

function resolveOptions(options?: PluginUserBehaviorOptions): Required<PluginUserBehaviorOptions> {
  const { maxLengthToReport, recordFetch, recordXMLHttpRequest } = options ?? {}

  return {
    maxLengthToReport: maxLengthToReport ?? DEFAULT_MAX_LENGTH_TO_REPORT,
    recordFetch: recordFetch ?? DEFAULT_RECORD_FETCH,
    recordXMLHttpRequest: recordXMLHttpRequest ?? DEFAULT_RECORD_XHR,
    reportIntervalTimeout: DEFAULT_REPORT_INTERVAL,
  }
}
