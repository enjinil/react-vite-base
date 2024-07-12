import * as z from 'zod'
import {Form} from '@/components/ui/form/Form'
import {Button} from '@/components/ui/button/Button'
import {Input} from '@/components/ui/form/Input'
import {fn} from '@storybook/test'
import {Meta, StoryObj} from '@storybook/react/*'

export default {
  title: 'ui/Form',
} as Meta

export const Default: StoryObj<typeof Form> = {
  render: ({onSubmit}) => (
    <Form
      onSubmit={onSubmit}
      schema={z.object({
        title: z.string().min(1, 'Required'),
      })}
      id="my-form"
    >
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
    </Form>
  ),
  args: {
    onSubmit: fn(),
  },
}
