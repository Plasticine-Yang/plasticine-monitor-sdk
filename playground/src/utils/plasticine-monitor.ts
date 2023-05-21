import { init, xhrSender } from '@plasticine-monitor-sdk/browser'

import pkg from '../../package.json'

export function setupPlasticineMonitor() {
  init({
    url: 'http://localhost:8868/api/v1/browser-event',
    projectId: '64607b2af3f06f90577fed12',
    enableLogger: true,
    sender: xhrSender,
    env: import.meta.env.MODE,
    release: pkg.version,
  })
}
