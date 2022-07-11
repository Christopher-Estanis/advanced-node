import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { LoadUserAccountRepository, CreateFacebookAccountRepository, UpdateFacebookAccountRepository } from '@/data/contracts/repos'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & CreateFacebookAccountRepository & UpdateFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError | undefined> {
    const fbData = await this.facebookApi.loadUser(params)

    if (fbData == null) return new AuthenticationError()

    const accountData = await this.userAccountRepo.load({ email: fbData?.email })

    if (accountData?.name !== undefined) {
      await this.userAccountRepo.updateWithFacebook({
        id: accountData.id,
        name: accountData.name,
        facebookId: fbData.facebookId
      })
    } else {
      await this.userAccountRepo.createFromFacebook(fbData)
    }
  }
}
