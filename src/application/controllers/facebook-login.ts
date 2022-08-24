import { FacebookAuthentication } from '@/domain/features'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { AuthenticationError } from '@/domain/errors'
import { ValidationBuilder, Validator } from '@/application/validation'
import { Controller } from '@/application/controllers'

type HttpRequest = {
  token: string
}

type Model = Error | {
  accessToken: string
}

export class FacebookLoginController extends Controller {
  constructor (private readonly facebookAuthentication: FacebookAuthentication) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const result = await this.facebookAuthentication.perform({ token: httpRequest.token })

    if (result instanceof AuthenticationError) {
      return unauthorized()
    }

    return ok({
      accessToken: result.value
    })
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    const validators = [
      ...ValidationBuilder.of({ fieldName: 'token', value: httpRequest.token }).required().build()
    ]

    return validators
  }
}
