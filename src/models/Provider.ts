export interface IProvider {
  name: string
  tlds?: string[]
}

export interface IProviderDowntimeWindow {
  id: number
  startDate: Date
  endDate: Date
  reason?: string
  provider: IProvider
}

export type ProviderDowntimeWindowField = keyof IProviderDowntimeWindow
export type ProviderDowntimeWindowFilterField = Exclude<ProviderDowntimeWindowField, 'reason' | 'provider'>

export class Provider implements IProvider {
  name: string
  tlds?: string[]

  constructor (provider: IProvider) {
    this.name = provider.name
    this.tlds = provider.tlds
  }
}

export type ProviderField = keyof IProvider
export type ProviderFilterField = Exclude<ProviderField, 'tlds'>

export class ProviderDowntimeWindow implements IProviderDowntimeWindow {
  id: number
  startDate: Date
  endDate: Date
  reason?: string
  provider: Provider

  constructor (provider: IProviderDowntimeWindow) {
    this.id = provider.id
    this.startDate = provider.startDate ? new Date(provider.startDate) : provider.startDate
    this.endDate = provider.endDate ? new Date(provider.endDate) : provider.endDate
    this.reason = provider.reason
    this.provider = new Provider(provider.provider)
  }
}
