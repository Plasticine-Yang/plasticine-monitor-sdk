import { Button, Divider, Space } from '@arco-design/web-react'
import { getBrowserKernel } from '@plasticine-monitor-sdk/browser'
import { FC, useEffect } from 'react'

const Network: FC = () => {
  useEffect(() => {
    getBrowserKernel()?.recordTTI?.()
  }, [])

  return (
    <Space direction="vertical">
      <Divider>正常网络请求</Divider>
      <Space>
        <Button
          status="default"
          type="primary"
          onClick={() =>
            fetch('https://jsonplaceholder.typicode.com/posts', {
              method: 'GET',
              headers: {
                'x-author-name': 'Wenfeng Yang',
                'x-demo-header': 'plasticine-monitor',
              },
            })
          }
        >
          GET
        </Button>

        <Button
          status="success"
          type="primary"
          onClick={() =>
            fetch('https://jsonplaceholder.typicode.com/posts', {
              method: 'POST',
              headers: {
                'x-author-name': 'Wenfeng Yang',
                'x-demo-header': 'plasticine-monitor',
              },
              body: JSON.stringify({
                title: 'foo',
                content: 'bar',
              }),
            })
          }
        >
          POST
        </Button>

        <Button
          status="warning"
          type="primary"
          onClick={() =>
            fetch('https://jsonplaceholder.typicode.com/posts/1', {
              method: 'PUT',
              headers: {
                'x-author-name': 'Wenfeng Yang',
                'x-demo-header': 'plasticine-monitor',
              },
              body: JSON.stringify({
                title: 'foo',
                content: 'bar',
              }),
            })
          }
        >
          PUT
        </Button>

        <Button
          status="warning"
          type="primary"
          onClick={() =>
            fetch('https://jsonplaceholder.typicode.com/posts/1', {
              method: 'PATCH',
              headers: {
                'x-author-name': 'Wenfeng Yang',
                'x-demo-header': 'plasticine-monitor',
              },
              body: JSON.stringify({
                title: 'foo',
                content: 'bar',
              }),
            })
          }
        >
          PATCH
        </Button>

        <Button
          status="danger"
          type="primary"
          onClick={() =>
            fetch('https://jsonplaceholder.typicode.com/posts/1', {
              method: 'DELETE',
              headers: {
                'x-author-name': 'Wenfeng Yang',
                'x-demo-header': 'plasticine-monitor',
              },
            })
          }
        >
          DELETE
        </Button>
      </Space>

      <Divider>异常网络请求</Divider>
      <Space>
        <Button
          status="danger"
          type="primary"
          onClick={() =>
            fetch('https://jsonplaceholder.typicode.com/posts/1', {
              method: 'GET',
              headers: {
                'x-author-name': '杨文锋',
                'x-demo-header': 'plasticine-monitor',
              },
            })
          }
        >
          无法发送出去的请求
        </Button>
      </Space>
    </Space>
  )
}

export default Network
