import {enableMocking} from './testing/server'
import './main.css'

export const bootstrap = async () => {
  await enableMocking()
}
