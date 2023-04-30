import type { Sender } from '@plasticine-monitor-sdk/types'

export const xhrSender: Sender = {
  send(url, data) {
    return new Promise((resolve, reject) => {
      // 启用了 user-behavior 插件，并且开启了 XHR 拦截的话需要从 window.__PLASTICINE_MONITOR__ 中获取原始 XHR
      const PlasticineMonitorXHR = window.__PLASTICINE_MONITOR__?.XMLHttpRequest ?? window.XMLHttpRequest
      if (PlasticineMonitorXHR) {
        const xhr = new PlasticineMonitorXHR()

        xhr.open('POST', url, true)
        xhr.addEventListener('readystatechange', () => {
          if (xhr.readyState === PlasticineMonitorXHR.DONE && xhr.status === 200) {
            resolve({ success: true, message: 'success' })
          } else {
            reject(new Error('上报数据时出错'))
          }
        })
        xhr.send(JSON.stringify(data))
      } else {
        reject(new Error('SDK 全局对象中未发现 XMLHttpRequest'))
      }
    })
  },
}
