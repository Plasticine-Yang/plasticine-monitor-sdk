import type { Sender } from '@plasticine-monitor-sdk/types'

export const fetchSender: Sender = {
  async send(url, data) {
    // 启用了 user-behavior 插件，并且开启了 fetch 拦截的话需要从 window.__PLASTICINE_MONITOR__ 中获取原始 fetch
    const plasticineMonitorFetch = window.__PLASTICINE_MONITOR__?.fetch ?? window.fetch
    if (plasticineMonitorFetch) {
      const response = await plasticineMonitorFetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
      })

      const ok = response.ok

      if (ok) {
        return {
          success: true,
          message: 'success',
        }
      } else {
        throw new Error('上报数据时出错')
      }
    }

    throw new Error('SDK 全局对象中未发现 fetch')
  },
}
