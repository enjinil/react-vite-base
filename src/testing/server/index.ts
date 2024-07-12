import {env} from '@/config'

export const enableMocking = async () => {
  if (env.ENABLE_API_MOCKING) {
    const {startServer} = await import('./browser-server')
    return await startServer()
  }
}
