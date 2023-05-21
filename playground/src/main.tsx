import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import '@arco-design/web-react/dist/css/arco.css'

import { router } from './router'
import './styles/reset.scss'
import { setupPlasticineMonitor } from './utils'

setupPlasticineMonitor()

// Arco Design 深色模式
document.body.setAttribute('arco-theme', 'dark')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement, {}).render(<RouterProvider router={router} />)
