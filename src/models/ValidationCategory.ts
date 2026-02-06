export interface IValidationCategoryTerms {
  version: number
  validUntil: Date
  terms: string
}

export interface IValidationCategory {
  version: number
  name: string
  description: string
  fields: string[]
  terms: IValidationCategoryTerms[]
}

export type ValidationCategoryField = keyof IValidationCategory
export type ValidationCategoryFilterField = Exclude<ValidationCategoryField, 'version' | 'description' | 'fields' | 'terms'>

export default class ValidationCategory {
  version: number
  name: string
  description: string
  fields: string[]
  terms: IValidationCategoryTerms[]

  constructor(category: IValidationCategory) {
    this.version = category.version
    this.name = category.name
    this.description = category.description
    this.fields = category.fields
    this.terms = category.terms
  }
}

