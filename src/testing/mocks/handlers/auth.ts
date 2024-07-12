import {env} from '@/config'
import {http, delay, HttpResponse} from 'msw'
import {db, persistDb} from '../db'
import {authenticate, hash} from '../utils'

type RegisterBody = {
  username: string
  password: string
}

export const authHandlers = [
  http.post(`${env.API_URL}/auth/register`, async ({request}) => {
    await delay()
    try {
      const data = (await request.json()) as RegisterBody

      // somehow destructuring directly on request.json() result
      // is not working on vite-node
      const {username, password} = data

      const existingUser = db.user.findFirst({
        where: {
          username: {
            equals: username,
          },
        },
      })

      if (existingUser) {
        throw Error()
      }

      db.user.create({
        username,
        password: hash(password),
      })

      await persistDb('user')

      const result = authenticate({
        username,
        password,
      })

      if (!result) {
        throw Error()
      }

      return HttpResponse.json(result)
    } catch (error: any) {
      return HttpResponse.json(
        {message: error?.message || 'Server Error'},
        {status: 500},
      )
    }
  }),
  http.post(`${env.API_URL}/auth/login`, async ({request}) => {
    await delay()
    try {
      const {username, password} = (await request.json()) as RegisterBody

      const result = authenticate({
        username,
        password,
      })

      if (!result) {
        throw Error()
      }

      return HttpResponse.json(result)
    } catch (error: any) {
      return HttpResponse.json(
        {message: error?.message || 'Server Error'},
        {status: 500},
      )
    }
  }),
]
