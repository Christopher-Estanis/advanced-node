import { FacebookAuthentication } from '@/domain/features'
import { badRequest, HttpResponse, ok, serverError, unauthorized } from '@/application/helpers'
import { AuthenticationError } from '@/domain/errors'
import { RequiredFieldError } from '@/application/errors'

type HttpRequest = {
  token: string | undefined | null
}

type Model = Error | {
  accessToken: string
}

export class FacebookLoginController {
  constructor (private readonly facebookAuthentication: FacebookAuthentication) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      if (httpRequest.token === '' || httpRequest.token === null || httpRequest.token === undefined) {
        return badRequest(new RequiredFieldError('token'))
      }

      const result = await this.facebookAuthentication.perform({ token: httpRequest.token })

      if (result instanceof AuthenticationError) {
        return unauthorized()
      }

      return ok({
        accessToken: result.value
      })
    } catch (error: any) {
      return serverError(error)
    }
  }
}
