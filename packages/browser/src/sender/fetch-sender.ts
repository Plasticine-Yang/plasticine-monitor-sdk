import type { Sender } from '@plasticine-monitor-sdk/types'

export const fetchSender: Sender = {
  async send(url, data) {
    try {
      const response = await fetch(url, {
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
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      }
    }
  },
}
