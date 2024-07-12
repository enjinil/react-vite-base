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

const newUser = buildUser()

test('can register new user and enter the app', async () => {
  await render(<App />, {route: '/auth/register', user: null})

  expect(screen.getByRole('heading', {name: /register/i})).toBeInTheDocument()

  await act(async () => {
    await userEvent.type(screen.getByLabelText('Username'), newUser.username)
    await userEvent.type(screen.getByLabelText('Password'), newUser.password)

    await userEvent.click(screen.getByRole('button', {name: /register/i}))
  })

  await waitForElementToBeRemoved(() =>
    screen.getByRole('button', {name: /loading/i}),
  )
  await waitForLoadingToFinish(screen)

  expect(window.location.href).toContain('/app/dashboard')
})

test('validates username and password', async () => {
  await render(<App />, {route: '/auth/register', user: null})

  await act(async () => {
    await userEvent.click(screen.getByRole('button', {name: /register/i}))
  })

  expect(screen.queryByText(/username is required/i)).toBeInTheDocument()
  expect(screen.queryByText(/password is required/i)).toBeInTheDocument()

  await act(async () => {
    await userEvent.type(screen.getByLabelText('Username'), newUser.username)
  })

  expect(screen.queryByText(/username is required/i)).not.toBeInTheDocument()

  await act(async () => {
    await userEvent.type(screen.getByLabelText('Password'), newUser.password)
  })

  expect(screen.queryByText(/password is required/i)).not.toBeInTheDocument()
})

test('shows alert when username already exist', async () => {
  const existingUser = buildUser()

  await act(async () => {
    db.user.create({
      username: existingUser.username,
      password: hash(existingUser.password),
    })
  })

  await render(<App />, {route: '/auth/register', user: null})

  await act(async () => {
    await userEvent.type(
      screen.getByLabelText('Username'),
      existingUser.username,
    )
    await userEvent.type(
      screen.getByLabelText('Password'),
      existingUser.password,
    )

    await userEvent.click(screen.getByRole('button', {name: /register/i}))
  })

  await waitForElementToBeRemoved(() =>
    screen.getByRole('button', {name: /loading/i}),
  )

  expect(screen.getByRole('alert')).toHaveTextContent(
    stringLike('Username already registered'),
  )
})
