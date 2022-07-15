import jwt from 'jsonwebtoken'

import { JwtTokenGenerator } from '@/infra/crypto'

jest.mock('jsonwebtoken')

describe('JwtTokenGenerator', () => {
  let sut: JwtTokenGenerator
  let fakeJwt: jest.Mocked<typeof jwt>

  let key: object
  let expirationInMs: number
  let secret: string
  let token: string

  beforeAll(() => {
    key = { any: 'any_key' }
    expirationInMs = 1000
    secret = 'any_secret'

    fakeJwt = jwt as jest.Mocked<typeof jwt>
    fakeJwt.sign.mockImplementation(() => token)
  })

  beforeEach(() => {
    sut = new JwtTokenGenerator(secret)
  })

  it('should call sign with correct params', async () => {
    await sut.generateToken({ key, expirationInMs })

    expect(fakeJwt.sign).toHaveBeenCalledWith(key, secret, { expiresIn: 1 })
    expect(fakeJwt.sign).toHaveBeenCalledTimes(1)
  })

  it('should return token on success', async () => {
    const result = await sut.generateToken({ key, expirationInMs })

    expect(result).toEqual(token)
  })

  it('should rethrow if sign throws', async () => {
    fakeJwt.sign.mockImplementationOnce(() => { throw new Error('any_error') })

    const promise = sut.generateToken({ key, expirationInMs })

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
