import userEvent from '@testing-library/user-event'
import {buildUser} from './mocks/generate'
import {db} from '@/testing/mocks/db'
import {authenticate, hash} from './mocks/utils'
import * as auth from '@/lib/auth-provider'
import {
  Screen,
  waitForElementToBeRemoved,
  render as rtlRender,
  RenderOptions,
  screen,
} from '@testing-library/react'
import {AppProviders} from '@/context/AppContext'

export * from '@testing-library/react'
export {userEvent}

export const stringLike = (str: string) => new RegExp(str, 'i')

export const loginAsUser = () => {
  const user = buildUser()

  db.user.create({username: user.username, password: hash(user.password)})

  window.localStorage.setItem(auth.LOCAL_STORAGE_KEY, authenticate(user)!.token)

  return user
}

export const waitForLoadingToFinish = (screen: Screen) => {
  if (!screen.queryByLabelText(/loading/i)) {
    return Promise.resolve()
  }

  return waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByTestId(/loading/i),
  ])
}

export const render = async (
  ui: React.ReactNode,
  {
    user,
    route,
  }: RenderOptions & {
    user?: {username: string; password: string} | null
    route?: string
  } = {},
) => {
  const loggedInUser = user === undefined ? loginAsUser() : null

  route && window.history.pushState({}, 'Test page', route)

  const returnValue = {
    ...rtlRender(ui, {wrapper: AppProviders}),
    user: loggedInUser,
  }

  await waitForLoadingToFinish(screen)

  return returnValue
}
