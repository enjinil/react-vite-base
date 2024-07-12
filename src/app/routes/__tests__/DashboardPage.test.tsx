import App from '@/app/App'
import {stringLike, render, screen} from '@/testing/test-utils'

test('can see username', async () => {
  const {user} = await render(<App />, {route: '/app/dashboard'})

  expect(
    screen.getByText(stringLike(`Hello, ${user!.username}`)),
  ).toBeInTheDocument()
})
