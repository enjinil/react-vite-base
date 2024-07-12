import React from 'react'
import ReactDOM from 'react-dom/client'
import {bootstrap} from './bootstrap'
import App from '@/app/App'
import {AppProviders} from '@/context/AppContext'

const root = document.getElementById('root');
if (!root) throw new Error('☢️ Root element is not found');

bootstrap().then(() => {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
  )
})


