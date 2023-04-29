# @plasticine-monitor-sdk/browser

## Usage

```ts
import { init } from '@plasticine-monitor-sdk/browser'

init({ url: 'xxx', projectId: 'xxx', enableLogger: true })
```

如果希望调用 SDK 内核实例上的方法，可以通过以下两种方式获取内核实例

1. 通过包导出的 `getBrowserKernel` 函数获取

```tsx
import { getBrowserKernel } from '@plasticine-monitor-sdk/browser'

const Foo = () => {
  return (
    <button
      onClick={() => {
        getBrowserKernel()?.captureError(new Error('手动调用 captureError'))
      }}
    >
      手动调用 captureError
    </button>
  )
}
```

2. 引入全局类型声明文件后通过 `window` 获取

`tsconfig.json`

```json
{
  "compilerOptions": {
    "types": ["@plasticine-monitor-sdk/browser/globals"]
  }
}
```

```tsx
const Foo = () => {
  return (
    <button
      onClick={() => {
        window?__PLASTICINE_MONITOR__.captureError(new Error('手动调用 captureError'))
      }}
    >
      手动调用 captureError
    </button>
  )
}
```
