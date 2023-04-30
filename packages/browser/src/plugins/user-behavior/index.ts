import {
  BrowserKernel,
  BrowserPlugin,
  EventTypeEnum,
  UserBehaviorEvent,
  UserBehaviorPayload,
} from '@plasticine-monitor-sdk/types'

import { initPV } from './page-view'
import { UserBehaviorQueueImpl } from './queue'

interface PluginUserBehaviorOptions {
  /** 超过最大长度后进行上报 */
  maxLengthToReport: number
}

const defaultOptions: PluginUserBehaviorOptions = {
  maxLengthToReport: 100,
}

export function pluginUserBehavior(options: PluginUserBehaviorOptions = defaultOptions): BrowserPlugin {
  const { maxLengthToReport } = options

  let browserKernel: BrowserKernel
  let destroyPV: VoidFunction

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
      destroyPV = initPV(browserKernel.userBehaviorQueue!)
    },

    beforeDestroy() {
      destroyPV()

      browserKernel.userBehaviorQueue!.clear()
      delete browserKernel.userBehaviorQueue

      window.removeEventListener('beforeunload', handleReportBeforeUnload)
      document.removeEventListener('visibilitychange', handleReportWhenInvisible)
    },
  }
}
