import { Navigate, RouteObject } from 'react-router-dom'

import Index from '@/pages/index'
import JSError from '@/pages/js-error'
import Page1 from '@/pages/page1'
import Page2 from '@/pages/page2'

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
        path: '/page1',
        element: <Page1 />,
      },
      {
        path: '/page2',
        element: <Page2 />,
      },
    ],
  },
]
