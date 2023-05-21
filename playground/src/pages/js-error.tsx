import { FC } from 'react'
import { Space, Divider, Button, Popover } from '@arco-design/web-react'
import { emitSyntaxError, emitRangeError, emitTypeError, emitURIError } from '@/utils/demos'
import { getBrowserKernel } from '@plasticine-monitor-sdk/browser'

const JSError: FC = () => {
  return (
    <Space direction="vertical">
      <Divider>触发常见的 JavaScript 运行时异常</Divider>
      <Space>
        {/* TypeError */}
        <Popover
          title="什么是 TypeError？"
          content={
            <span>
              <p>
                当代码尝试使用一个不支持的类型时，会抛出 TypeError
                异常。例如，当你尝试对一个非对象类型的值使用对象的方法或属性时，就会发生 TypeError 异常。
              </p>
              <span style={{ color: 'cyan' }}>
                <pre>const x = 123;</pre>
                <pre>// TypeError: x.toUpperCase is not a function</pre>
                <pre>x.toUpperCase();</pre>
              </span>
            </span>
          }
        >
          <Button type="primary" onClick={() => emitTypeError()}>
            emit TypeError
          </Button>
        </Popover>
        {/* ReferenceError */}
        <Popover
          title="什么是 ReferenceError？"
          content={
            <span>
              <p>
                当代码尝试访问一个不存在的变量或函数时，会抛出 ReferenceError
                异常。例如，在下面的示例中，代码尝试访问一个不存在的变量 y，就会发生 ReferenceError 异常
              </p>
              <span style={{ color: 'cyan' }}>
                <pre>const x = 123;</pre>
                <pre>// ReferenceError: y is not defined</pre>
                <pre>console.log(y);</pre>
              </span>
            </span>
          }
        >
          <Button type="primary" onClick={() => emitTypeError()}>
            emit ReferenceError
          </Button>
        </Popover>
        {/* RangeError */}
        <Popover
          title="什么是 RangeError？"
          content={
            <span>
              <p>当尝试使用超出有效范围的数字或长度时会抛出此异常。例如：</p>
              <span style={{ color: 'cyan' }}>
                <pre>// Uncaught RangeError: Invalid array length</pre>
                <pre>const arr = new Array(-1); </pre>
              </span>
            </span>
          }
        >
          <Button type="primary" onClick={() => emitRangeError()}>
            emit RangeError
          </Button>
        </Popover>

        {/* URIError */}
        <Popover
          title="什么是 URIError？"
          content={
            <span>
              <p>
                当代码尝试使用一个不合法的 URI（统一资源标识符）时，会抛出 URIError
                异常。例如，在下面的示例中，代码尝试使用一个不合法的 URI，就会发生 URIError 异常：
              </p>
              <span style={{ color: 'cyan' }}>
                <pre>// Uncaught URIError: URI malformed</pre>
                <pre>const uri = decodeURIComponent('%')</pre>
              </span>
            </span>
          }
        >
          <Button type="primary" onClick={() => emitURIError()}>
            emit URIError
          </Button>
        </Popover>

        {/* SyntaxError */}
        <Popover
          title="什么是 SyntaxError？"
          content={
            <span>
              <p>当代码包含语法错误时，会抛出 SyntaxError 异常。</p>
              <span style={{ color: 'cyan' }}>
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                  // Uncaught SyntaxError: Function statements require a function name
                </pre>
                <pre>eval('function() {}')</pre>
              </span>
            </span>
          }
        >
          <Button type="primary" onClick={() => emitSyntaxError()}>
            emit SyntaxError
          </Button>
        </Popover>
      </Space>

      <Divider>手动捕获异常</Divider>
      <Space>
        <Popover
          title="手动捕获异常是什么意思？"
          content={
            <span>
              <p>
                为了更好地满足业务需求，plasticine-monitor-sdk 除了能够自动捕获常见的 JavaScript
                运行时异常外，还提供了一个 `captureError` API 用于手动捕获异常
              </p>
              <p>上面的示例中更多的是被动捕获异常，而通过 `captureError` 则可以完成主动捕获异常并上报的效果</p>
              <p>
                `captureError` API 挂载在 SDK 的内核实例上，可以通过 `@plasticine-monitor-sdk/browser` 包提供的
                `getBrowserKernel` API 获取内核实例
              </p>
              <pre
                style={{ color: 'cyan', whiteSpace: 'pre-wrap' }}
              >{`import {getBrowserKernel} from '@plasticine-monitor-sdk/browser'`}</pre>
              <pre style={{ color: 'cyan', whiteSpace: 'pre-wrap' }}>
                getBrowserKernel()?.captureError(new Error('上报的自定义异常'))
              </pre>
            </span>
          }
        >
          <Button type="primary" onClick={() => getBrowserKernel()?.captureError(new Error('上报的自定义异常'))}>
            手动捕获异常
          </Button>
        </Popover>
      </Space>
    </Space>
  )
}

export default JSError
