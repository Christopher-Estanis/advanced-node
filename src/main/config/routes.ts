import { Router, Express } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

export const setupRoutes = (app: Express): void => {
  const router = Router()

  readdirSync(join(__dirname, '../routes'))
    .filter(file => !file.endsWith('.map'))
    .map(async file => {
      (await import(`../routes/${file}`)).default(router)
    })

  router.post('/api/login/facebook', (request, response) => {
    response.send({ data: 'any_data' })
  })
  app.use(router)
}
