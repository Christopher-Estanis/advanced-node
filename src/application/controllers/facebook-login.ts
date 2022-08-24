import { FacebookAuthentication } from '@/domain/features'
import { badRequest, HttpResponse, ok, serverError, unauthorized } from '@/application/helpers'
import { AuthenticationError } from '@/domain/errors'
import { ValidationBuilder, ValidationComposite } from '@/application/validation'

type HttpRequest = {
  token: string
}

type Model = Error | {
  accessToken: string
}

export class FacebookLoginController {
  constructor (private readonly facebookAuthentication: FacebookAuthentication) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const error = this.validate(httpRequest)
      if (error !== undefined) {
        return badRequest(error)
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

  private validate (httpRequest: HttpRequest): Error | undefined {
    const validators = ValidationBuilder
      .of({ fieldName: 'token', value: httpRequest.token })
      .required()
      .build()

    return new ValidationComposite(validators).validate()
  }
}
