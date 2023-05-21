import { useState } from 'react'

import { getBrowserKernel } from '@plasticine-monitor-sdk/browser'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>

        <button
          onClick={() => {
            throw new Error('ops')
          }}
        >
          emit error
        </button>

        <button
          onClick={() => {
            getBrowserKernel()?.captureError(new Error('手动调用 captureError'))
          }}
        >
          手动调用 captureError
        </button>

        <button
          onClick={() => {
            getBrowserKernel()?.recordTTI?.()
          }}
        >
          手动标记为 TTI
        </button>

        <button
          onClick={() => {
            const xhr = new XMLHttpRequest()

            xhr.addEventListener('loadend', () => {})

            xhr.open('GET', '/api/todos/1', true)
            xhr.setRequestHeader('xx-plasticine', 'xhr')
            xhr.send()
          }}
        >
          发送 XHR 网络请求
        </button>

        <button
          onClick={() => {
            fetch('/api/todos/1', {
              method: 'GET',
              headers: [['xx-plasticine', 'fetch']],
            })
          }}
        >
          发送 Fetch 网络请求
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
