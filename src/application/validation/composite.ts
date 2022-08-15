import { Validator } from '@/application/validation/validator'

export class ValidationComposite implements Validator {
  constructor (private readonly validators: Validator[]) {}

  validate (): undefined | Error {
    for (const validator of this.validators) {
      const result = validator.validate()

      if (result !== undefined) {
        return result
      }
    }
  }
}
