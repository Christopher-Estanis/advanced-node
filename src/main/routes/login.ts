import { Router } from 'express'

export default (router: Router): void => {
  router.post('/api/login/facebook', (request, response) => {
    response.send({ data: 'any_data' })
  })
}
