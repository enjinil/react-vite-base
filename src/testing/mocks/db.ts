import {drop, factory, primaryKey} from '@mswjs/data'
import {faker} from '@faker-js/faker'

const LOCAL_STORAGE_DB_KEY = 'msw-db'
const dbFilePath = 'mocked-db.json'

const models = {
  user: {
    id: primaryKey(faker.string.uuid),
    username: String,
    password: String,
  },
}

export type Models = typeof models
export type Model = keyof typeof models

export const db = factory(models)

const loadDb = async () => {
  // If we are running in a Node.js environment
  if (typeof window === 'undefined') {
    const {readFile, writeFile} = await import('fs/promises')
    try {
      const data = await readFile(dbFilePath, 'utf8')
      return JSON.parse(data)
    } catch (error: any) {
      if (error?.code === 'ENOENT') {
        const emptyDB = {}
        await writeFile(dbFilePath, JSON.stringify(emptyDB, null, 2))
        return emptyDB
      } else {
        console.error('Error loading mocked DB:', error)
        return null
      }
    }
  }

  // If we are running in a browser environment
  return Object.assign(
    JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_DB_KEY) || '{}'),
  )
}

export const initializeDb = async () => {
  const database = await loadDb()
  Object.entries(db).forEach(([key, model]) => {
    const dataEntries = database[key]
    if (dataEntries) {
      dataEntries?.forEach((entry: Record<string, any>) => {
        model.create(entry)
      })
    }
  })
}

export const storeDb = async (data: string) => {
  // If we are running in a Node.js environment
  if (typeof window === 'undefined') {
    const {writeFile} = await import('fs/promises')
    await writeFile(dbFilePath, data)
  } else {
    // If we are running in a browser environment
    window.localStorage.setItem('msw-db', data)
  }
}

export const persistDb = async (model: Model) => {
  if (process.env.NODE_ENV === 'test') return
  const data = await loadDb()
  data[model] = db[model].getAll()

  await storeDb(JSON.stringify(data))
}

export const resetDb = () => {
  drop(db)
  window.localStorage.clear()
}
