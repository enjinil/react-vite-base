import {test, expect, vi} from 'vitest'
import * as z from 'zod'

import {Form} from '@/components/ui/form/Form'
import {Button} from '@/components/ui/button/Button'
import {Input} from '@/components/ui/form/Input'
import {render, screen, userEvent, waitFor} from '@/testing/test-utils'

const schema = z.object({
  title: z.string().min(1, 'Required'),
})

const testData = {
  title: 'Hello.',
}

test('should render and submit form', async () => {
  const handleSubmit = vi.fn()

  await render(
    <Form onSubmit={handleSubmit} schema={schema} id="my-form">
      {({register, formState}) => (
        <>
          <Input
            label="Title"
            error={formState.errors['title']}
            registration={register('title')}
          />

          <Button name="submit" type="submit">
            Submit
          </Button>
        </>
      )}
    </Form>,
  )

  await userEvent.type(screen.getByLabelText(/title/i), testData.title)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith(testData, expect.anything()),
  )
})

test('should not submit if form is invalid', async () => {
  const handleSubmit = vi.fn()

  await render(
    <Form onSubmit={handleSubmit} schema={schema} id="my-form">
      {({register, formState}) => (
        <>
          <Input
            label="Title"
            error={formState.errors['title']}
            registration={register('title')}
          />

          <Button name="submit" type="submit">
            Submit
          </Button>
        </>
      )}
    </Form>,
  )

  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await screen.findByRole('alert', {name: /required/i})

  expect(handleSubmit).toHaveBeenCalledTimes(0)
})
