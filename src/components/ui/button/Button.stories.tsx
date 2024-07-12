import {fn} from '@storybook/test'
import {Meta, StoryObj} from '@storybook/react'
import {Button} from './Button'

export default {
  title: 'ui/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
} as Meta

export const Default: StoryObj = {
  args: {
    children: 'Button',
    onClick: fn(),
  },
}
