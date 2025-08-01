export interface IAddresses {
  address: string
  ipVersion: string
}

export class Addresses {
  address: string
  ipVersion: string

  constructor (address: IAddresses) {
    this.address = address.address
    this.ipVersion = address.ipVersion
  }
}

export interface IHost {
  hostName: string
  addresses?: IAddresses[]
  createdDate: Date
  updatedDate?: Date
}

export interface IHostCreate {
  hostName: string
  addresses: IAddresses[]
}
export type IHostUpdate = IHostCreate

export type HostField = keyof IHost
export type HostFilterField = Exclude<HostField, 'addresses'> | 'domain'

export default class Host implements IHost {
  hostName: string
  addresses?: Addresses[]
  createdDate: Date
  updatedDate?: Date

  constructor (host: IHost) {
    this.hostName = host.hostName
    if (host.addresses) {
      this.addresses = host.addresses.map(a => new Addresses(a))
    }
    this.createdDate = host.createdDate ? new Date(host.createdDate) : host.createdDate
    this.updatedDate = host.updatedDate ? new Date(host.updatedDate) : host.updatedDate
  }
}
