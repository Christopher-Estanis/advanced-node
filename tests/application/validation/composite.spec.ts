import { mock, MockProxy } from 'jest-mock-extended'
import { Validator } from '@/application/validation/validator'
import { ValidationComposite } from '@/application/validation/composite'

describe('ValidationComposite', () => {
  let sut: ValidationComposite
  let validator1: MockProxy<Validator>
  let validator2: MockProxy<Validator>
  let validators: Validator[]

  beforeAll(() => {
    validator1 = mock<Validator>()
    validator1.validate.mockReturnValue(undefined)
    validator2 = mock<Validator>()
    validator2.validate.mockReturnValue(undefined)

    validators = [validator1, validator2]
  })

  beforeEach(() => {
    sut = new ValidationComposite(validators)
  })

  it('should return undefined if all Validatiors return undefined', () => {
    const result = sut.validate()

    expect(result).toBeUndefined()
  })

  it('should return the first error', () => {
    validator1.validate.mockReturnValueOnce(new Error('error_1'))
    validator2.validate.mockReturnValueOnce(new Error('error_2'))

    const result = sut.validate()

    expect(result).toEqual(new Error('error_1'))
  })

  it('should return the error founded', () => {
    validator2.validate.mockReturnValueOnce(new Error('error_2'))

    const result = sut.validate()

    expect(result).toEqual(new Error('error_2'))
  })
})
