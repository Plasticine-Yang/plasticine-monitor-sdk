import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

import BasicLayout from '@/layouts/basic-layout'

const Index: FC = () => {
  return (
    <BasicLayout>
      <Outlet />
    </BasicLayout>
  )
}

export default Index
