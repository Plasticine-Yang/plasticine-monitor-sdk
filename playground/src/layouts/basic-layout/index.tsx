import { Breadcrumb, Layout, Menu } from '@arco-design/web-react'
import { IconCalendar, IconCaretLeft, IconCaretRight } from '@arco-design/web-react/icon'
import { FC, PropsWithChildren, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './style.scss'

const Header = Layout.Header
const Sider = Layout.Sider
const Content = Layout.Content
const Footer = Layout.Footer
const MenuItem = Menu.Item

const BasicLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props

  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(false)

  const handleCollapsed = () => {
    setCollapsed((state) => !state)
  }

  return (
    <Layout className="layout-collapse-demo">
      <Sider
        collapsed={collapsed}
        onCollapse={handleCollapsed}
        collapsible
        trigger={collapsed ? <IconCaretRight /> : <IconCaretLeft />}
        breakpoint="xl"
        width={250}
      >
        <div className="logo" />

        <Menu defaultSelectedKeys={['/js-error']} onClickMenuItem={(key) => navigate(key)} style={{ width: '100%' }}>
          <MenuItem key="/js-error">
            <IconCalendar />
            JavaScript 运行时异常
          </MenuItem>

          <MenuItem key="/page1">
            <IconCalendar />
            Page 1
          </MenuItem>

          <MenuItem key="/page2">
            <IconCalendar />
            Page 2
          </MenuItem>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ paddingLeft: 20 }}>Web 前端性能监控系统演示 Demo</Header>
        <Layout style={{ padding: '0 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Foo</Breadcrumb.Item>
            <Breadcrumb.Item>Bar</Breadcrumb.Item>
            <Breadcrumb.Item>Baz</Breadcrumb.Item>
          </Breadcrumb>

          <Content>{children}</Content>

          <Footer>作者：杨文锋</Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
