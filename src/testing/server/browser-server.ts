import {setupWorker} from 'msw/browser'
import {handlers} from '../mocks/handlers'
import {env} from '@/config'
import {initializeDb} from '../mocks/db'

const server = setupWorker(...handlers)

initializeDb()

export const startServer = () =>
  server.start({
    quiet: true,
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })

export * from 'msw'
