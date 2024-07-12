import {db} from './db'

export const AUTH_COOKIE = `react_app_token`

export function authenticate({
  username,
  password,
}: {
  username: string
  password: string
}) {
  const user = db.user.findFirst({
    where: {
      username: {
        equals: username,
      },
    },
  })

  if (user?.password === hash(password)) {
    const sanitizedUser = sanitizeUser(user)
    const encodedToken = encode(sanitizedUser)
    return {user: sanitizedUser, token: encodedToken}
  }
}

export function encode(obj: any) {
  const btoa =
    typeof window === 'undefined'
      ? (str: string) => Buffer.from(str, 'binary').toString('base64')
      : window.btoa
  return btoa(JSON.stringify(obj))
}

export const decode = (str: string) => {
  const atob =
    typeof window === 'undefined'
      ? (str: string) => Buffer.from(str, 'base64').toString('binary')
      : window.atob
  return JSON.parse(atob(str))
}

function omit<T extends object>(obj: T, keys: string[]): T {
  const result = {} as T
  for (const key in obj) {
    if (!keys.includes(key)) {
      result[key] = obj[key]
    }
  }

  return result
}

export function sanitizeUser<O extends object>(user: O) {
  return omit<O>(user, ['password'])
}

export function hash(stringValue: string) {
  let hash = 5381,
    i = stringValue.length

  while (i) {
    hash = (hash * 33) ^ stringValue.charCodeAt(--i)
  }
  return String(hash >>> 0)
}
