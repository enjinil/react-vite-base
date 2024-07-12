import {HttpResponse, delay, http} from 'msw'

import {env} from '@/config'

import {authHandlers} from './auth'
import {decode} from '../utils'
import {db} from '../db'

export const handlers = [
  ...authHandlers,
  http.get(`${env.API_URL}/user/me`, async ({request}) => {
    await delay()

    try {
      if (!request.headers.get('authorization')) {
        return HttpResponse.json({message: 'Unauthenticated'}, {status: 401})
      }

      const {username} = decode(
        request.headers.get('authorization')?.replace('Bearer ', '') as string,
      )

      return HttpResponse.json({user: {username}})
    } catch {
      return HttpResponse.json({message: 'Unauthenticated'}, {status: 401})
    }
  }),
  http.get(`${env.API_URL}/healthcheck`, async () => {
    await delay()
    return HttpResponse.json({ok: true})
  }),
  // Allow CORS
  http.options(`${env.API_URL}/*`, async () => {
    return HttpResponse.text(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': '*',
      },
    })
  }),
]
