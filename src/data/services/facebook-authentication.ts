import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { LoadUserAccountRepository, CreateFacebookAccountRepository } from '@/data/contracts/repos'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & CreateFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError | undefined> {
    const fbData = await this.facebookApi.loadUser(params)

    if (fbData == null) return new AuthenticationError()

    await this.userAccountRepo.load({ email: fbData?.email })
    await this.userAccountRepo.createFromFacebook(fbData)
  }
}
