export interface ICredit {
  accounts: object[]
}

export default class Credit implements ICredit {
  accounts: object[]

  constructor (response: ICredit) {
    this.accounts = response.accounts
  }
}
