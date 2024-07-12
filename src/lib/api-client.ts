import {env} from '@/config'
import * as auth from '@/lib/auth-provider'
import {HttpMethods} from 'msw'

export interface ClientConfig {
  method?: 'HEAD' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS' | 'DELETE'
  data?: string | number | Array<any> | Record<string, any>
  headers?: {
    Authorization?: string
    'Content-Type'?: string
  } & Record<string, string>
  token?: string | null
}

async function client(
  endpoint: string,
  {data, token, headers: customHeaders, ...customConfig}: ClientConfig = {},
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    } as Record<string, string>,
    ...customConfig,
  }

  // Replace fetch with library like axios
  return window
    .fetch(`${env.API_URL}/${endpoint}`, config)
    .then(async response => {
      if (response.status === 401) {
        await auth.logout()
        // Refresh page
        window.location.assign(window.location.href)
        return Promise.reject({message: 'Authentication failed.'})
      }

      const data = await response.json()

      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

export {client}
