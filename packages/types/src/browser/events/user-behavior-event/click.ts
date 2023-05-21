/** 点击行为指标 */
export interface ClickMetrics {
  /** 被点击元素的 id */
  id?: string

  /** 被点击元素的所有 className */
  classList: string[]

  /** 被点击元素的标签名 */
  tagName: string

  /** 被点击元素的文本内容 */
  textContent?: string
}
