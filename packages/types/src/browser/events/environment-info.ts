import { BrowserSDKOptions } from '../options'

export interface EnvironmentInfo {
  projectId: BrowserSDKOptions['projectId']
  env: BrowserSDKOptions['env']
  release: BrowserSDKOptions['release']
  pagePath: string
  timestamp: number
  url: string
  userId: string
  sessionId: string
}
