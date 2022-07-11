import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/repos'
import { FacebookAccount } from '@/domain/models'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError | undefined> {
    const fbData = await this.facebookApi.loadUser(params)

    if (fbData === undefined) return new AuthenticationError()

    const accountData = await this.userAccountRepo.load({ email: fbData?.email })
    const facebookAccount = new FacebookAccount(fbData, accountData)
    await this.userAccountRepo.saveWithFacebook(facebookAccount)
  }
}
