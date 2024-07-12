import {env} from '@/config'
import {z} from 'zod'

const LOCAL_STORAGE_KEY =
  env.AUTH_TOKEN_LOCAL_STORAGE_KEY || 'AUTH_PROVIDER_TOKEN'
const AUTH_URL = env.API_URL + '/auth'

export type BaseEntity = {
  id: string
}

export type Entity<T> = {
  [K in keyof T]: T[K]
} & BaseEntity

export type User = Entity<{
  username: string
}>

export type AuthResponse = {
  token: string
  user: User
}

export const loginInputSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(5, 'Password is required'),
})

export type LoginInput = z.infer<typeof loginInputSchema>

export const registerInputSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(5, 'Password is required'),
})

export type RegisterInput = z.infer<typeof registerInputSchema>

async function getToken() {
  return window.localStorage.getItem(LOCAL_STORAGE_KEY)
}

function persistUserToken(user: AuthResponse) {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, user.token)
  return user
}

function login(data: LoginInput): Promise<AuthResponse> {
  return client('login', data).then(persistUserToken)
}

function register(data: RegisterInput): Promise<AuthResponse> {
  return client('register', data).then(persistUserToken)
}

async function logout() {
  window.localStorage.removeItem(LOCAL_STORAGE_KEY)
}

async function client(endpoint: string, data: Record<string, any>) {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  }

  return window
    .fetch(`${AUTH_URL}/${endpoint}`, config)
    .then(async response => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

export {getToken, login, register, logout, LOCAL_STORAGE_KEY}
