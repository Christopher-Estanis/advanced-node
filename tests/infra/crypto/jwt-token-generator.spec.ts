import { TokenGenerator } from '@/data/contracts/crypto'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

class JwtTokenGenerator {
  constructor (private readonly secret: string) {}

  async generateToken (params: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    const expirationInSeconds = params.expirationInMs / 1000

    const token = jwt.sign(params.key, this.secret, { expiresIn: expirationInSeconds })

    return token
  }
}

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
})
