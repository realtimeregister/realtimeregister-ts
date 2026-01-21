/**
 * Gateway-specific types and interfaces. Everything defined in here is only available
 * for Gateway accounts.
 */

/** @gateway */
export interface IContactRegistryAccount {
  id: string
  authCode?: string
  intendedUsage?: string[]
  registry: string
  registryAccount: string
  roid?: string
}

/** @gateway */
export class ContactRegistryAccount implements IContactRegistryAccount {
  id: string
  registry: string
  registryAccount: string
  authCode?: string
  intendedUsage?: string[]
  roid?: string

  constructor(account: IContactRegistryAccount) {
    this.id = account.id
    this.registry = account.registry
    this.registryAccount = account.registryAccount
    this.authCode = account.authCode
    this.intendedUsage = account.intendedUsage
    this.roid = account.roid
  }
}

/** @gateway */
export interface IRegistryAccount {
  registry: string
  name: string
  loginName: string
  sendWdrpNotifications: boolean
  sendErrpNotifications: boolean
  ianaId?: number
  registrarIdentifier?: string
  registrarSignature?: string
  renamedHostDomain?: string
  validationCategory?: string
  registrantChangeApprovalRequired: boolean
  registrantChangeTransferLock: boolean
  allowDesignatedAgent: string
  owner: string
  tlds?: string[]
}
/** @gateway */
export type RegistryAccountField = keyof IRegistryAccount
/** @gateway */
export type RegistryAccountFilterField = IRegistryAccount['tlds']

/** @gateway */
export class RegistryAccount implements IRegistryAccount {
  allowDesignatedAgent: string
  ianaId?: number
  loginName: string
  name: string
  owner: string
  registrantChangeApprovalRequired: boolean
  registrantChangeTransferLock: boolean
  registrarIdentifier?: string
  registrarSignature?: string
  registry: string
  renamedHostDomain?: string
  sendErrpNotifications: boolean
  sendWdrpNotifications: boolean
  tlds?: string[]
  validationCategory?: string

  constructor (account: IRegistryAccount) {
    this.allowDesignatedAgent = account.allowDesignatedAgent
    this.ianaId = account.ianaId
    this.loginName = account.loginName
    this.name = account.name
    this.owner = account.owner
    this.registrantChangeApprovalRequired = account.registrantChangeApprovalRequired
    this.registrantChangeTransferLock = account.registrantChangeTransferLock
    this.registrarIdentifier = account.registrarIdentifier
    this.registrarSignature = account.registrarSignature
    this.registry = account.registry
    this.renamedHostDomain = account.renamedHostDomain
    this.sendErrpNotifications = account.sendErrpNotifications
    this.sendWdrpNotifications = account.sendWdrpNotifications
    this.tlds = account.tlds
    this.validationCategory = account.validationCategory
  }

}

/**
 * Gateway-specific properties for domains.
 * @gateway
 */
export interface IDomainGateway {
  registryAccount?: string
  roid?: string
  premiumCategory?: string
  privacyContactId?: string
  lastErrpNotificationDate?: Date
  lastWdrpNotificationDate?: Date
}
