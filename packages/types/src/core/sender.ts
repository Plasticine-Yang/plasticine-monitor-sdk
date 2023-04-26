export interface SenderResponse {
  success: boolean
  message: string
}

export interface Sender {
  send(url: string, data: any): Promise<SenderResponse>
}
