import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { LoadUserAccountRepository, CreateFacebookAccountRepository } from '@/data/contracts/repos'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserApi: LoadFacebookUserApi,
    private readonly loadUserAccountRepo: LoadUserAccountRepository,
    private readonly createFacebookAccountRepo: CreateFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError | undefined> {
    const fbData = await this.loadFacebookUserApi.loadUser(params)

    if (fbData == null) return new AuthenticationError()

    await this.loadUserAccountRepo.load({ email: fbData?.email })
    await this.createFacebookAccountRepo.createFromFacebook(fbData)
  }
}
