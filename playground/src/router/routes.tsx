import { Navigate, RouteObject } from 'react-router-dom'

import Index from '@/pages/index'
import JSError from '@/pages/js-error'
import Network from '@/pages/network'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Index />,
    children: [
      {
        path: '',
        element: <Navigate to="/js-error" replace />,
      },
      {
        path: '/js-error',
        element: <JSError />,
      },
      {
        path: '/network',
        element: <Network />,
      },
    ],
  },
]
