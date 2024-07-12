import * as matchers from '@testing-library/jest-dom/matchers'
import {server} from './server/node-server'
import {initializeDb, resetDb} from './mocks/db'
import * as auth from '@/lib/auth-provider'

expect.extend(matchers)

beforeAll(() => {
  server.listen({onUnhandledRequest: 'error'})
})

afterAll(() => server.close())

beforeEach(async () => {
  window.btoa = (str: string) => Buffer.from(str, 'binary').toString('base64')
  window.atob = (str: string) => Buffer.from(str, 'base64').toString('binary')

  initializeDb()
})

afterEach(async () => {
  await auth.logout()
  server.resetHandlers()
  resetDb()
})
