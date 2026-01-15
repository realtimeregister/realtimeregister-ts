/**
 * @see AuthKey
 */
export interface IAuthKey {
  authKey: string
  validity: string
}


/**
 * @interface IAuthKey
 * @var validity - Timestamp string until the authKey is valid.
 */
export default class AuthKey implements IAuthKey {
  authKey: string
  validity: string

  constructor(data: IAuthKey) {
    this.authKey = data.authKey
    this.validity = data.validity
  }

}
