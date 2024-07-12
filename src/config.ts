import * as z from 'zod'

const createEnv = () => {
  const envSchema = z.object({
    API_URL: z.string(),
    ENABLE_API_MOCKING: z
      .string()
      .refine(s => ['true', 'false'].includes(s))
      .transform(s => s === 'true')
      .optional(),
    APP_URL: z.string().optional().default('http://localhost:3000'),
    AUTH_TOKEN_LOCAL_STORAGE_KEY: z.string().optional(),
  })

  type EnvRecord = Record<string, any>
  const envVars = Object.entries(import.meta.env).reduce<EnvRecord>(
    (acc, current) => {
      const [key, value] = current
      if (key.startsWith('VITE_APP_')) {
        acc[key.replace('VITE_APP_', '')] = value
      }
      return acc
    },
    {},
  )

  const parsedEnv = envSchema.safeParse(envVars)

  if (!parsedEnv.success) {
    const errorFieldsString = Object.entries(
      parsedEnv.error.flatten().fieldErrors,
    )
      .map(([k, v]) => `- ${k}: ${v}`)
      .join('\n')

    throw Error(
      `Invalid env configuration on the following variables: ${errorFieldsString}`,
    )
  }

  return parsedEnv.data
}

export const env = createEnv()
