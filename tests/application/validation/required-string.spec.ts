import { RequiredFieldError } from '@/application/errors'

class RequiredStringValidator {
  constructor (
    private readonly value: string,
    private readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    if (this.value === '' || this.value === null || this.value === undefined) {
      return new RequiredFieldError(this.fieldName)
    }
  }
}

describe('RequiredStringValidator', () => {
  it('should return RequiredStringValidator if value is empty', () => {
    const sut = new RequiredStringValidator('', 'any_field')

    const result = sut.validate()

    expect(result).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return RequiredStringValidator if value is null', () => {
    const sut = new RequiredStringValidator(null as any, 'any_field')

    const result = sut.validate()

    expect(result).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return RequiredStringValidator if value is undefined', () => {
    const sut = new RequiredStringValidator(undefined as any, 'any_field')

    const result = sut.validate()

    expect(result).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return undefined if value contains characters', () => {
    const sut = new RequiredStringValidator('any_character', 'any_field')

    const result = sut.validate()

    expect(result).toBeUndefined()
  })
})
