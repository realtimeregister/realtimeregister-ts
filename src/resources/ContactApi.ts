import Base from '@/resources/Base.ts'
import Contact, {
  ContactField,
  IContact,
  IContactProperties,
  IContactSplit,
  IContactUpdate
} from '@/models/Contact.ts'
import Page from '@/models/Page.ts'
import { ContactListParams } from '@/models/ListParams.ts'
import { IValidationCategory } from '@/models/ValidationCategory.ts'
import { ProcessResponse } from '@/models/process/ProcessResponse.ts'
import { CancelToken } from 'axios'

export default class ContactApi extends Base {

  /**
   * Get a contact
   * @link https://dm.realtimeregister.com/docs/api/contacts/get
   * @param contact - Contact handle or object.
   * @param fields - Contact fields to include in response, some fields will always be returned.
   */
  async get (contact: IContact | string, fields?: ContactField[]): Promise<Contact> {
    return this.axios.get('/customers/' + this.customer + '/contacts/' + ((contact as IContact).handle || contact), { params: { fields } })
      .then(response => new Contact(response.data))
  }

  /**
   * Create a new contact
   * @link https://dm.realtimeregister.com/docs/api/contacts/create
   * @param contact - Contact data.
   */
  async create (contact: IContact): Promise<ProcessResponse> {
    const fields = (({ handle, brand, name, organization, addressLine, postalCode, city, state, country, email, voice, fax }) => ({ handle, brand, name, organization, addressLine, postalCode, city, state, country, email, voice, fax }))(contact)

    return this.axios.post('/customers/' + this.customer + '/contacts/' + contact.handle, fields)
      .then(response => new ProcessResponse(response))
  }

  /**
   * Update an existing contact.
   * @link https://dm.realtimeregister.com/docs/api/contacts/update
   * @param contact - Contact data, will update based on provided fields. Provided handle will determine the contact to update.
   */
  async update (contact: IContactUpdate): Promise<ProcessResponse> {
    const fields = (({ brand, name, organization, addressLine, postalCode, city, state, country, email, voice, fax, designatedAgent, disclosedFields }) => ({ brand, name, organization, addressLine, postalCode, city, state, country, email, voice, fax, designatedAgent, disclosedFields }))(contact)

    return this.axios.post('/customers/' + this.customer + '/contacts/' + contact.handle + '/update', fields)
      .then(response => new ProcessResponse(response))
  }

  /**
   * Delete an existing contact.
   * @link https://dm.realtimeregister.com/docs/api/contacts/delete
   * @param contact - Contact handle or object.
   */
  async delete (contact: IContact | string): Promise<ProcessResponse> {
    return this.axios.delete('/customers/' + this.customer + '/contacts/' + ((contact as IContact).handle || contact))
      .then(response => new ProcessResponse(response))
  }

  /**
   * Split a contact into two separate contacts.
   * @link https://dm.realtimeregister.com/docs/api/contacts/split
   * @param contact - Contact handle or object.
   * @param data - New contact data.
   */
  async split (contact: IContact | string, data: IContactSplit): Promise<ProcessResponse> {
    return this.axios.post('/customers/' + this.customer + '/contacts/' + ((contact as IContact).handle || contact) + '/split', data)
      .then(response => new ProcessResponse(response))
  }

  /**
   * Start pre-emptive validation of a contact or send a reminder for an active contact validation.
   * @link https://dm.realtimeregister.com/docs/api/contacts/validate
   * @param contact - Contact handle, or object.
   * @param categories - Categories to validate.
   */
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

  /**
   * Add contact registry properties
   * @link https://dm.realtimeregister.com/docs/api/contacts/properties/add
   * @param contact - Contact handle or object.
   * @param registry - Registry name.
   * @param addProperties - Properties to add.
   */
  async addProperties (contact: IContact | string, registry: string, addProperties: IContactProperties): Promise<ProcessResponse> {
    const fields = (({ properties }) => ({ properties }))(addProperties)
    return this.axios.post('/customers/' + this.customer + '/contacts/' + ((contact as Contact).handle || contact) + '/' + registry, fields)
      .then(response => new ProcessResponse(response))
  }

  /**
   * Update contact registry properties. Properties must first be added before they can be updated.
   * @link https://dm.realtimeregister.com/docs/api/contacts/properties/update
   * @see addProperties
   * @param contact - Contact handle, or object.
   * @param registry - Registry name.
   * @param updateProperties - Properties to update.
   */
  async updateProperties (contact: IContact | string, registry: string, updateProperties: IContactProperties): Promise<ProcessResponse> {
    const fields = (({ properties }) => ({ properties }))(updateProperties)
    return this.axios.post('/customers/' + this.customer + '/contacts/' + ((contact as Contact).handle || contact) + '/' + registry + '/update', fields)
      .then(response => new ProcessResponse(response))
  }

  /**
   * List contacts available within your account based on given parameters.
   * @link https://dm.realtimeregister.com/docs/api/contacts/list
   * @see ContactListParams
   * @param params - Object containing parameters passed to the listing.
   * @param cancelToken
   */
  async list (params?: ContactListParams, cancelToken?: CancelToken): Promise<Page<Contact>> {
    return this.axios.get('/customers/' + this.customer + '/contacts/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: Contact[] = (response.data.entities || []).map((data: IContact) => new Contact(data))
        return new Page<Contact>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }
}
