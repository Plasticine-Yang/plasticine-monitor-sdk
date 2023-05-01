import { init, xhrSender } from '@plasticine-monitor-sdk/browser'

import pkg from '../../package.json'

export function setupPlasticineMonitor() {
  init({
    url: 'http://localhost:8868/api/v1/browser-event',
    projectId: 'abc123',
    enableLogger: true,
    sender: xhrSender,
    env: import.meta.env.MODE,
    release: pkg.version,
  })
}
