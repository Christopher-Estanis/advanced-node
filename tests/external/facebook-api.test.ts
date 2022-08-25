import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook API Integration Tests', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)
  })

  it('should return a Facebook User if token is valid', async () => {
    // [INFO] TOKEN EXPIRES IN 3 MONTHS - 24/08/22
    const fbUser = await sut.loadUser({ token: 'EAAFnkT3gDg8BACjI5y2mNU88mZAGZA4xvu4NJvsdrXJ1WhNHZAhmGCZAhmZCMPMBbAWHM9hin9xkOHXjeJ0TmFsgTfZBjsRU7naXSRDfg6jlVgrAX9VkioSzAj4JFoSFP1Lh2hMQhyAIZBtrtwZBprkbpUAQuZAZBEZBzqxtee8OT12jQiZC24Rq68RMxxK3OaZCoPZCdz0hnIAWWbYNiFZBhtIlxmc' })

    expect(fbUser).toEqual({
      facebookId: '111665798328849',
      email: 'christopher_vfulgqe_teste@tfbnw.net',
      name: 'Christopher Teste'
    })
  })

  it('should return undefined token is invalid', async () => {
    // TOKEN VALIDATE IN 3 MONTHS - 24/08/22
    const fbUser = await sut.loadUser({ token: 'undefined' })

    expect(fbUser).toBeUndefined()
  })
})
