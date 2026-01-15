import Base from '@/resources/Base.ts'
import {
  ISiteLockAccount,
  ISiteLockAccountCreate,
  ISiteLockAccountPasswordReset,
  SiteLockAccount, SiteLockAccountField,
  SiteLockSso
} from '@/models/SiteLockAccount.ts'
import SiteLockSite, {
  ISiteLockSite,
  ISiteLockSiteUpdate,
  SiteLockSiteField,
} from '@/models/SiteLockSite.ts'
import { SiteLockAccountListParams, SiteLockSiteListParams } from '@/models/ListParams.ts'
import { CancelToken } from 'axios'
import Page from '@/models/Page.ts'
import { ProcessResponse } from '@/models/process/ProcessResponse.ts'
import Quote from '@/models/Quote.ts'

export default class SiteLockApi extends Base {
  /**
   * Get a SiteLock account.
   * @link https://dm.realtimeregister.com/docs/api/sitelock/accounts/get
   * @param account - Account username, or object.
   * @param fields - Fields to include in the response.
   */
  async getAccount (account: ISiteLockAccount | string, fields?: SiteLockAccountField[]): Promise<SiteLockAccount> {
    return this.axios.get('/sitelock/accounts/' + ((account as ISiteLockAccount).username || account), { params: { fields } })
      .then(response => new SiteLockAccount(response.data))
  }

  /**
   * List SiteLock accounts linked to your account.
   * @link https://dm.realtimeregister.com/docs/api/sitelock/accounts/list
   * @see SiteLockAccountListParams
   * @param params - Object containing parameters passed to the listing, see SiteLockAccountListParams.
   * @param cancelToken
   */
  async listAccounts (params?: SiteLockAccountListParams, cancelToken?: CancelToken): Promise<Page<SiteLockAccount>> {
    return this.axios.get('/sitelock/accounts/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: SiteLockAccount[] = (response.data.entities || []).map((data: ISiteLockAccount) => new SiteLockAccount(data))
        return new Page<SiteLockAccount>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  /**
   * Create a new SiteLock account.
   * @link https://dm.realtimeregister.com/docs/api/sitelock/accounts/create
   * @param account - Data for the new account.
   * @param quote - If true, returns a quote instead of a process response.
   */
  async createAccount (account: ISiteLockAccountCreate, quote?: boolean): Promise<ProcessResponse | Quote> {
    const fields = (({ email, password, language, brand, domainName, plan }, customer) => ({
      email,
      password,
      language,
      brand,
      domainName,
      plan,
      customer
    }))(account, this.customer)

    return this.axios.post('/sitelock/accounts/' + account.username, fields, { params: quote ? { quote: true } : undefined })
      .then(response => quote ? new Quote(response.data.quote) : new ProcessResponse(response))
  }

  /**
   * Delete an existing SiteLock account.
   * @link https://dm.realtimeregister.com/docs/api/sitelock/accounts/delete
   * @param account - Account username, or object.
   */
  async deleteAccount (account: ISiteLockAccount | string): Promise<ProcessResponse> {
    return this.axios.delete('/sitelock/accounts/' + ((account as ISiteLockAccount).username || account))
      .then(response => new ProcessResponse(response))
  }

  /**
   * Reset the password for an existing SiteLock account.
   * @link https://dm.realtimeregister.com/docs/api/sitelock/accounts/resetpassword
   * @param account - Account username, or object.
   */
  async resetPasswordAccount (account: ISiteLockAccountPasswordReset): Promise<ProcessResponse> {
    const fields = (({ password }) => ({ password }))(account)

    return this.axios.post('/sitelock/accounts/' + account.username + '/resetpassword', fields)
      .then(response => new ProcessResponse(response))
  }

  /**
   * Create a single sign-on link for an existing SiteLock account.
   * @link https://dm.realtimeregister.com/docs/api/sitelock/accounts/sso
   * @param account - Account username, or object.
   * @param site - The SiteLock site, if specified will cause the dashboard to display data for this site.
   */
  async ssoAccount (account: ISiteLockAccount | string, site?: string): Promise<SiteLockSso> {
    const fields = site ? { site } : {}
    return this.axios.post('/sitelock/accounts/' + ((account as ISiteLockAccount).username || account) + '/sso', fields)
      .then(response => new SiteLockSso(response.data))
  }

  /**
   * Get a SiteLock site.
   * @link https://dm.realtimeregister.com/docs/api/sitelock/sites/get
   * @param site - Site domain name, or object.
   * @param fields - Fields to include in the response.
   */
  async getSite (site: ISiteLockSite | string, fields?: SiteLockSiteField[]): Promise<SiteLockSite> {
    return this.axios.get('/sitelock/sites/' + ((site as ISiteLockSite).domainName || site), { params: { fields } })
      .then(response => new SiteLockSite(response.data))
  }

  /**
   * List SiteLock sites linked to your account, based on given parameters.
   * @link https://dm.realtimeregister.com/docs/api/sitelock/sites/list
   * @see SiteLockSiteListParams
   * @param params - Object containing parameters passed to the listing, see SiteLockSiteListParams.
   * @param cancelToken
   */
  async listSites (params?: SiteLockSiteListParams, cancelToken?: CancelToken): Promise<Page<SiteLockSite>> {
    return this.axios.get('/sitelock/sites/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: SiteLockSite[] = (response.data.entities || []).map((data: ISiteLockSite) => new SiteLockSite(data))
        return new Page<SiteLockSite>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  /**
   * Update a SiteLock site. Will determine which site to update based on the `domainName` parameter in the `site` object.
   * @link https://dm.realtimeregister.com/docs/api/sitelock/sites/update
   * @param site - Update data for the site.
   * @param quote - If true, returns a quote instead of a process response. Update won't be executed.
   */
  async updateSite (site: ISiteLockSiteUpdate, quote?: boolean): Promise<ProcessResponse | Quote> {
    const fields = (({ account, plan }) => ({ account, plan }))(site)

    return this.axios.post('/sitelock/sites/' + site.domainName + '/update', fields, { params: quote ? { quote: true } : undefined })
      .then(response => quote ? new Quote(response.data.quote) : new ProcessResponse(response))
  }

  /**
   * Create a new SiteLock site.
   * @link https://dm.realtimeregister.com/docs/api/sitelock/sites/create
   * @param site - Data for the new site.
   * @param quote - If true, returns a quote instead of a process response. Create won't be executed.
   */
  async createSite (site: ISiteLockSite, quote?: boolean): Promise<ProcessResponse | Quote> {
    const fields = (({ account, plan }) => ({
      account,
      plan
    }))(site)

    return this.axios.post('/sitelock/sites/' + site.domainName, fields, { params: quote ? { quote: true } : undefined })
      .then(response => quote ? new Quote(response.data.quote) : new ProcessResponse(response))
  }

  /**
   * Delete an existing SiteLock site.
   * @link https://dm.realtimeregister.com/docs/api/sitelock/sites/delete
   * @param site
   */
  async deleteSite (site: ISiteLockSite | string): Promise<ProcessResponse> {
    return this.axios.delete('/sitelock/sites/' + ((site as ISiteLockSite).domainName || site))
      .then(response => new ProcessResponse(response))
  }

}
