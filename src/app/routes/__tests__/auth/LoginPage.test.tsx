import App from '@/app/App'
import {db} from '@/testing/mocks/db'
import {buildUser} from '@/testing/mocks/generate'
import {hash} from '@/testing/mocks/utils'
import {
  act,
  render,
  screen,
  stringLike,
  waitForElementToBeRemoved,
  waitForLoadingToFinish,
} from '@/testing/test-utils'
import {faker} from '@faker-js/faker'
import {userEvent} from '@storybook/test'

const registeredUser = buildUser()

test('can login as registered user', async () => {
  await act(async () => {
    db.user.create({
      username: registeredUser.username,
      password: hash(registeredUser.password),
    })
  })

  await render(<App />, {route: '/auth/login', user: null})

  expect(screen.getByRole('heading', {name: /login/i})).toBeInTheDocument()

  await act(async () => {
    await userEvent.type(
      screen.getByLabelText('Username'),
      registeredUser.username,
    )
    await userEvent.type(
      screen.getByLabelText('Password'),
      registeredUser.password,
    )

    await userEvent.click(screen.getByRole('button', {name: /login/i}))
  })

  await waitForElementToBeRemoved(() =>
    screen.getByRole('button', {name: /loading/i}),
  )
  await waitForLoadingToFinish(screen)

  expect(window.location.href).toContain('/app/dashboard')
})

test('validates username and password', async () => {
  await render(<App />, {route: '/auth/login', user: null})

  await act(async () => {
    await userEvent.click(screen.getByRole('button', {name: /login/i}))
  })

  expect(screen.queryByText(/username is required/i)).toBeInTheDocument()
  expect(screen.queryByText(/password is required/i)).toBeInTheDocument()

  await act(async () => {
    await userEvent.type(
      screen.getByLabelText('Username'),
      registeredUser.username,
    )
  })

  expect(screen.queryByText(/username is required/i)).not.toBeInTheDocument()

  await act(async () => {
    await userEvent.type(
      screen.getByLabelText('Password'),
      registeredUser.password,
    )
  })

  expect(screen.queryByText(/password is required/i)).not.toBeInTheDocument()
})

test('shows alert when credentials is invalid', async () => {
  const newUser = buildUser()

  await render(<App />, {route: '/auth/login', user: null})

  await act(async () => {
    await userEvent.type(screen.getByLabelText('Username'), newUser.username)
    await userEvent.type(screen.getByLabelText('Password'), newUser.password)

    await userEvent.click(screen.getByRole('button', {name: /login/i}))
  })

  await waitForElementToBeRemoved(() =>
    screen.getByRole('button', {name: /loading/i}),
  )

  expect(screen.getByRole('alert')).toHaveTextContent(
    stringLike('Login failed, please try again with different credentials'),
  )
})
