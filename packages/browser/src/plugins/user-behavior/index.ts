import type {
  BrowserKernel,
  BrowserPlugin,
  PluginUserBehaviorOptions,
  UserBehaviorEvent,
  UserBehaviorPayload,
} from '@plasticine-monitor-sdk/types'
import { EventTypeEnum } from '@plasticine-monitor-sdk/types'

import { monitorNetwork } from './network'
import { monitorPV } from './page-view'
import { UserBehaviorQueueImpl } from './queue'
import { DEFAULT_MAX_LENGTH_TO_REPORT, DEFAULT_RECORD_FETCH, DEFAULT_RECORD_XHR } from '../../constants'

export function pluginUserBehavior(options?: PluginUserBehaviorOptions): BrowserPlugin {
  const resolvedOptions = resolveOptions(options)
  const { maxLengthToReport, recordFetch, recordXMLHttpRequest } = resolvedOptions

  let browserKernel: BrowserKernel

  let cancelMonitorPV: VoidFunction
  let cancelMonitorNetwork: VoidFunction

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

  const handleReportBeforeUnload = () => {
    reportUserBehavior()
  }

  return {
    name: 'user-behavior',

    init(kernel) {
      browserKernel = kernel

      // 动态挂载到内核实例上，让其他插件也可以往里面添加用户行为 - 比如遇到 JS Error 时记录一下
      browserKernel.userBehaviorQueue = new UserBehaviorQueueImpl(maxLengthToReport, handleReportWhenExceed)

      // 页面隐藏时上报
      document.addEventListener('visibilitychange', handleReportWhenInvisible)

      // 页面关闭之前上报
      window.addEventListener('beforeunload', handleReportBeforeUnload)

      // PV
      cancelMonitorPV = monitorPV(browserKernel.userBehaviorQueue!)

      // 网络请求
      cancelMonitorNetwork = monitorNetwork(browserKernel.userBehaviorQueue, { recordFetch, recordXMLHttpRequest })
    },

    beforeDestroy() {
      cancelMonitorNetwork()
      cancelMonitorPV()

      browserKernel.userBehaviorQueue!.clear()
      delete browserKernel.userBehaviorQueue

      window.removeEventListener('beforeunload', handleReportBeforeUnload)
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
  }
}
