import Base from '@/resources/Base'
import Contact, {
  IContact,
  IContactProperties,
  IContactSplit,
  IContactUpdate
} from '@/models/Contact'
import Page from '@/models/Page'
import ListParams from '@/models/ListParams'
import { IValidationCategory } from '@/models/ValidationCategory'
import { ProcessResponse } from '@/models/ProcessResponse'
import { CancelToken } from 'axios'

export default class ContactApi extends Base {
  async get (contact: IContact | string, fields?: string[]): Promise<Contact> {
    return this.axios.get('/customers/' + this.customer + '/contacts/' + ((contact as IContact).handle || contact), { params: { fields } })
      .then(response => new Contact(response.data))
  }

  async create (contact: IContact): Promise<ProcessResponse> {
    const fields = (({ handle, brand, name, organization, addressLine, postalCode, city, state, country, email, voice, fax }) => ({ handle, brand, name, organization, addressLine, postalCode, city, state, country, email, voice, fax }))(contact)

    return this.axios.post('/customers/' + this.customer + '/contacts/' + contact.handle, fields)
      .then(response => new ProcessResponse(response))
  }

  async update (contact: IContactUpdate): Promise<ProcessResponse> {
    const fields = (({ brand, name, organization, addressLine, postalCode, city, state, country, email, voice, fax, designatedAgent, disclosedFields }) => ({ brand, name, organization, addressLine, postalCode, city, state, country, email, voice, fax, designatedAgent, disclosedFields }))(contact)

    return this.axios.post('/customers/' + this.customer + '/contacts/' + contact.handle + '/update', fields)
      .then(response => new ProcessResponse(response))
  }

  async delete (contact: IContact | string): Promise<ProcessResponse> {
    return this.axios.delete('/customers/' + this.customer + '/contacts/' + ((contact as IContact).handle || contact))
      .then(response => new ProcessResponse(response))
  }

  async split (contact: IContact | string, data: IContactSplit): Promise<ProcessResponse> {
    return this.axios.post('/customers/' + this.customer + '/contacts/' + ((contact as IContact).handle || contact) + '/split', data)
      .then(response => new ProcessResponse(response))
  }

  async validate (contact: IContact | string, categories: string[] | IValidationCategory[]): Promise<ProcessResponse> {
    const validationCategories: string[] = []
    categories.forEach((category) => {
      if (typeof category === 'string') {
        validationCategories.push(category)
        return
      }
      validationCategories.push(category.name)
    })

    return this.axios.post('/customers/' + this.customer + '/contacts/' + ((contact as IContact).handle || contact) + '/validate', { categories: validationCategories })
      .then(response => new ProcessResponse(response))
  }

  async addProperties (contact: IContact | string, registry: string, addProperties: IContactProperties): Promise<ProcessResponse> {
    const fields = (({ properties }) => ({ properties }))(addProperties)
    return this.axios.post('/customers/' + this.customer + '/contacts/' + ((contact as Contact).handle || contact) + '/' + registry, fields)
      .then(response => new ProcessResponse(response))
  }

  async updateProperties (contact: IContact | string, registry: string, updateProperties: IContactProperties): Promise<ProcessResponse> {
    const fields = (({ properties }) => ({ properties }))(updateProperties)
    return this.axios.post('/customers/' + this.customer + '/contacts/' + ((contact as Contact).handle || contact) + '/' + registry + '/update', fields)
      .then(response => new ProcessResponse(response))
  }

  async list (params?: ListParams, cancelToken?: CancelToken): Promise<Page<Contact>> {
    return this.axios.get('/customers/' + this.customer + '/contacts/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: Contact[] = (response.data.entities || []).map((data: IContact) => new Contact(data))
        return new Page<Contact>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }
}
