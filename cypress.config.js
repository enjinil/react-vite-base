import {defineConfig} from 'cypress'
import fs from 'fs'

const transformedEnvFile = fs
  .readFileSync('./.env')
  .toString('utf-8')
  .split('\n')
  .map(keyValue => keyValue.split(/=(.*)/s))
  .reduce(
    (cypressEnv, [key, value]) => ({
      ...cypressEnv,
      [key]: value,
    }),
    {},
  )

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'e2e/tests/*.test.js',
    supportFile: 'e2e/support/e2e.js',
  },
  env: transformedEnvFile,
})
