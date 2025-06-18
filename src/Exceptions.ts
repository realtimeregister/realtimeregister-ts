import { AxiosResponse } from 'axios'
import Quote from '@/models/Quote'

export abstract class ApiException extends Error {
  response: AxiosResponse

  constructor (response: AxiosResponse, message?: string) {
    super(message || response.data.message)
    this.response = response
  }
}

export class ConstraintViolation {
  field: string
  message: string
  value?: string

  constructor (field: string, message: string, value?: string) {
    this.field = field
    this.message = message
    this.value = value
  }
}

export class ConstraintViolationException extends ApiException {
  violations: ConstraintViolation[]

  constructor (response: AxiosResponse) {
    super(response)

    this.violations = response.data.violations.map((d: { field: string, message: string, value?: string }) => new ConstraintViolation(d.field, d.message, d.value))
  }
}

export class AuthenticationError extends ApiException {
}

export class NotFound extends ApiException {
}

export class TooManyRequests extends ApiException {
}

export class AuthorizationError extends ApiException {
}

export class InsufficientCreditException extends ApiException {
}

export class InternalSRSError extends ApiException {
}

export class NoContractException extends ApiException {
}

export class ObjectDoesNotExist extends ApiException {
}

export class ObjectExists extends ApiException {
}

export class ProcessError extends ApiException {
}

export class ProviderConnectionError extends ApiException {
}

export class ProviderUnavailable extends ApiException {
  startDate?: Date
  endDate?: Date

  constructor (response: AxiosResponse) {
    super(response)
    this.startDate = response.data.startDate ? new Date(response.data.startDate) : undefined
    this.endDate = response.data.endDate ? new Date(response.data.endDate) : undefined
  }
}

export class UnrecognizedPropertyException extends ApiException {
  property: string

  constructor (response: AxiosResponse) {
    super(response)
    this.property = response.data.property
  }
}

export class ObjectStatusProhibitsOperation extends ApiException {
}

export class ValidationError extends ApiException {
}

export class BillableAcknowledgmentNeededException extends ApiException {
  quote: Quote

  constructor (response: AxiosResponse) {
    super(response)
    this.quote = new Quote(response.data.quote)
  }
}


export class ContactUpdateValidationError extends ApiException {
  errors: Map<string, string>

  constructor (response: AxiosResponse) {
    super(response)
    this.errors = response.data.errors
  }
}

export class DnsConfigurationException extends ApiException {
  errors?: Map<number, Map<string, string>>
  conflicts?: Map<number, number[]>

  constructor (response: AxiosResponse) {
    super(response)
    this.errors = response.data.errors
    this.conflicts = response.data.conflicts
  }
}

export class InvalidCSRException extends ApiException {
}

export class InvalidMessage extends ApiException {
}

export class UnsupportedTld extends ApiException {

}
