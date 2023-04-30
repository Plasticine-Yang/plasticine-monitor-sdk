import { init, xhrSender } from '@plasticine-monitor-sdk/browser'

export function setupPlasticineMonitor() {
  init({ url: '', projectId: '', enableLogger: true, sender: xhrSender })
}
