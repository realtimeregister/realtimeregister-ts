import Base from '@/resources/Base'
import {
  ISiteLockAccount,
  ISiteLockAccountCreate,
  ISiteLockAccountPasswordReset,
  SiteLockAccount,
  SiteLockSso
} from '@/models/SiteLockAccount'
import SiteLockSite, { ISiteLockSite, ISiteLockSiteUpdate } from '@/models/SiteLockSite'
import { SiteLockAccountListParams, SiteLockSiteListParams } from '@/models/ListParams'
import { CancelToken } from 'axios'
import Page from '@/models/Page'
import { ProcessResponse } from '@/models/ProcessResponse'
import Quote from '@/models/Quote'

export default class SiteLockApi extends Base {
  /**
   * Accounts
   */
  async getAccount (account: ISiteLockAccount | string, fields?: string[]): Promise<SiteLockAccount> {
    return this.axios.get('/sitelock/accounts/' + ((account as ISiteLockAccount).username || account), { params: { fields } })
      .then(response => new SiteLockAccount(response.data))
  }

  async listAccounts (params?: SiteLockAccountListParams, cancelToken?: CancelToken): Promise<Page<SiteLockAccount>> {
    return this.axios.get('/sitelock/accounts/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: SiteLockAccount[] = (response.data.entities || []).map((data: ISiteLockAccount) => new SiteLockAccount(data))
        return new Page<SiteLockAccount>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

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

  async deleteAccount (account: ISiteLockAccount | string): Promise<ProcessResponse> {
    return this.axios.delete('/sitelock/accounts/' + ((account as ISiteLockAccount).username || account))
      .then(response => new ProcessResponse(response))
  }

  async resetPasswordAccount (account: ISiteLockAccountPasswordReset): Promise<ProcessResponse> {
    const fields = (({ password }) => ({ password }))(account)

    return this.axios.post('/sitelock/accounts/' + account.username + '/resetpassword', fields)
      .then(response => new ProcessResponse(response))
  }

  async ssoAccount (account: ISiteLockAccount | string, site?: string): Promise<SiteLockSso> {
    const fields = site ? { site } : {}
    return this.axios.post('/sitelock/accounts/' + ((account as ISiteLockAccount).username || account) + '/sso', fields)
      .then(response => new SiteLockSso(response.data))
  }

  /**
   * Sites
   */
  async getSite (site: ISiteLockSite | string, fields?: string[]): Promise<SiteLockSite> {
    return this.axios.get('/sitelock/sites/' + ((site as ISiteLockSite).domainName || site), { params: { fields } })
      .then(response => new SiteLockSite(response.data))
  }

  async listSites (params?: SiteLockSiteListParams, cancelToken?: CancelToken): Promise<Page<SiteLockSite>> {
    return this.axios.get('/sitelock/sites/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: SiteLockSite[] = (response.data.entities || []).map((data: ISiteLockSite) => new SiteLockSite(data))
        return new Page<SiteLockSite>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  async updateSite (site: ISiteLockSiteUpdate, quote?: boolean): Promise<ProcessResponse | Quote> {
    const fields = (({ account, plan }) => ({ account, plan }))(site)

    return this.axios.post('/sitelock/sites/' + site.domainName + '/update', fields, { params: quote ? { quote: true } : undefined })
      .then(response => quote ? new Quote(response.data.quote) : new ProcessResponse(response))
  }

  async createSite (site: ISiteLockSite, quote?: boolean): Promise<ProcessResponse | Quote> {
    const fields = (({ account, plan }) => ({
      account,
      plan
    }))(site)

    return this.axios.post('/sitelock/sites/' + site.domainName, fields, { params: quote ? { quote: true } : undefined })
      .then(response => quote ? new Quote(response.data.quote) : new ProcessResponse(response))
  }

  async deleteSite (site: ISiteLockSite | string): Promise<ProcessResponse> {
    return this.axios.delete('/sitelock/sites/' + ((site as ISiteLockSite).domainName || site))
      .then(response => new ProcessResponse(response))
  }

}
