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
  it('should call sign with correct params', async () => {
    const fakeJwt = jwt as jest.Mocked<typeof jwt>

    const sut = new JwtTokenGenerator('any_secret')

    await sut.generateToken({ key: { any: 'any_key' }, expirationInMs: 1000 })

    expect(fakeJwt.sign).toHaveBeenCalledWith({ any: 'any_key' }, 'any_secret', { expiresIn: 1 })
    expect(fakeJwt.sign).toHaveBeenCalledTimes(1)
  })
})
