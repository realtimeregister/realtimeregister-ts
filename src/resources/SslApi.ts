import Base from '@/resources/Base.ts'
import { SSLListParams, SSLProductListParams } from '@/models/ListParams.ts'
import Page, { IPage } from '@/models/Page.ts'
import Certificate, {
  CertificateField,
  CsrInfo,
  IAddNote,
  ICertificate,
  ICertificateDownload,
  ICertificateImport,
  ICertificateReissue,
  ICertificateRenew,
  ICertificateRequest,
  ICertificateRevoke,
  ICsrDecode,
  IResendDcv,
  IScheduleValidationCall,
  ISubscriberAgreement
} from '@/models/Certificate.ts'
import type { IProcess } from '@/models/process/Process.ts'
import { ProcessResponse } from '@/models/process/ProcessResponse.ts'
import { CertificateProcessResponse } from '@/models/process/CertificateProcess.ts'
import Quote from '@/models/Quote.ts'
import { CancelToken } from 'axios'
import SslProduct, { ISslProduct, SslProductField } from '@/models/SslProduct.ts'
import AuthKey, { IAuthKey } from '@/models/Authkey.ts'

export default class SslApi extends Base {
  async get (certificateId: ICertificate | number, fields?: CertificateField[]): Promise<Certificate> {
    return this.axios.get('/ssl/certificates/' + ((certificateId as ICertificate).id || certificateId), { params: { fields } })
      .then(response => new Certificate(response.data))
  }

  /**
   * Get information about an SSL product.
   * @link https://dm.realtimeregister.com/docs/api/ssl/products/get
   * @see SslProductField
   * @param product - Name of the product.
   * @param fields - Fields to include in the response, see SslProductField
   */
  async getProduct (product: string, fields: SslProductField[]): Promise<SslProduct> {
    return this.axios.get<ISslProduct>('/ssl/products/' + product, { params: { fields } })
      .then(response => new SslProduct(response.data))
  }

  /**
   * Request an SSL certificate.
   * @param {ICertificateRequest} data
   * @param {boolean} quote - If true, validate the request and request a quote for the action
   */
  async request (data: ICertificateRequest, quote?: boolean): Promise<CertificateProcessResponse | Quote> {
    const fields = (({
      product,
      period,
      csr,
      domainName,
      san,
      organization,
      department,
      address,
      postalCode,
      city,
      state,
      country,
      language,
      coc,
      saEmail,
      approver,
      dcv,
      authKey
    }, customer) =>
      ({
        product,
        period,
        csr,
        domainName,
        san,
        organization,
        department,
        address,
        postalCode,
        city,
        state,
        country,
        language,
        coc,
        saEmail,
        approver,
        dcv,
        authKey,
        customer
      }))(data, this.customer)
    return this.axios.post('/ssl/certificates/', fields, { params: quote ? { quote: true } : undefined })
      .then(response => quote ? new Quote(response.data.quote) : new CertificateProcessResponse(response.data, response))
  }

  async reissue (certificateId: ICertificate | number, data: ICertificateReissue, quote?: boolean): Promise<CertificateProcessResponse | Quote> {
    const fields = (({
      csr,
      domainName,
      san,
      organization,
      department,
      address,
      postalCode,
      city,
      state,
      coc,
      approver,
      dcv,
      authKey
    }) =>
      ({
        csr,
        domainName,
        san,
        organization,
        department,
        address,
        postalCode,
        city,
        state,
        coc,
        approver,
        dcv,
        authKey
      }))(data)
    return this.axios.post('/ssl/certificates/' + ((certificateId as ICertificate).id || certificateId) + '/reissue/', fields, { params: quote ? { quote: true } : undefined })
      .then(response => quote ? new Quote(response.data.quote) : new CertificateProcessResponse(response.data, response))
  }

  async renew (certificateId: ICertificate | number, data: ICertificateRenew, quote?: boolean): Promise<CertificateProcessResponse | Quote> {
    const fields = (({
      period,
      csr,
      domainName,
      san,
      organization,
      department,
      address,
      postalCode,
      city,
      state,
      language,
      coc,
      saEmail,
      approver,
      dcv,
      product,
      authKey
    }) =>
      ({
        period,
        csr,
        domainName,
        san,
        organization,
        department,
        address,
        postalCode,
        city,
        state,
        language,
        coc,
        saEmail,
        approver,
        dcv,
        product,
        authKey
      }))(data)
    return this.axios.post('/ssl/certificates/' + ((certificateId as ICertificate).id || certificateId) + '/renew/', fields, { params: quote ? { quote: true } : undefined })
      .then(response => quote ? new Quote(response.data.quote) : new CertificateProcessResponse(response.data, response))
  }

  async list (params?: SSLListParams, cancelToken?: CancelToken): Promise<Page<Certificate>> {
    return this.axios.get('/ssl/certificates/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: Certificate[] = (response.data.entities || []).map((data: Certificate) => new Certificate(data))
        return new Page<Certificate>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  /**
   * List and search SSL products based on given parameters.
   * @link https://dm.realtimeregister.com/docs/api/ssl/products/list
   * @see SSLProductListParams
   * @param params - Object containing parameters passed to the listing, see SSLProductListParams.
   * @param cancelToken
   */
  async listProducts (params?: SSLProductListParams, cancelToken?: CancelToken): Promise<Page<SslProduct>> {
    return this.axios.get<IPage<ISslProduct>>('/ssl/products/', { params: this.listParamsToUrlParams(params), ...cancelToken })
      .then((response) => {
        const entities: SslProduct[] = (response.data.entities || []).map((data: ISslProduct) => new SslProduct(data))
        return new Page<SslProduct>(entities, response.data.pagination.limit, response.data.pagination.offset, response.data.pagination.total)
      })
  }

  async import (data: ICertificateImport): Promise<ProcessResponse> {
    const fields = (({ certificate, csr, coc, domainName }, customer) => ({
      certificate,
      csr,
      coc,
      customer,
      domainName
    }))(data, this.customer)
    return this.axios.post('/ssl/import/', fields)
      .then(response => new ProcessResponse(response))
  }

  async download (certificateId: ICertificate | string, data: ICertificateDownload): Promise<Blob> {
    return this.axios.get('/ssl/certificates/' + ((certificateId as ICertificate).id || certificateId) + '/download', {
      responseType: 'blob',
      params: data
    })
      .then(response => response.data)
  }

  async revoke (certificateId: ICertificate | number, data: ICertificateRevoke): Promise<ProcessResponse> {
    const fields = (({ reason }) => ({ reason }))(data)
    return this.axios.delete('/ssl/certificates/' + certificateId, { data: fields })
      .then(response => new ProcessResponse(response))
  }

  async resend (process: IProcess | number, data: IResendDcv): Promise<void> {
    return this.axios.post('/processes/' + ((process as IProcess).id || process) + '/resend', data)
  }

  async decodeCsr (csrDecode: ICsrDecode): Promise<CsrInfo> {
    const fields = (({ csr }) => ({ csr }))(csrDecode)

    return this.axios.post('/ssl/decodecsr', fields)
      .then(response => new CsrInfo(response.data))
  }

  async dcvEmailAddressList (domain: string, product: string): Promise<string[]> {
    return this.axios.get('/ssl/dcvemailaddresslist/' + domain, { params: { product } })
      .then(response => response.data)
  }

  async addNote (process: IProcess | number, data: IAddNote): Promise<void> {
    console.warn('addNote is deprecated, as of 19-02-2024 Sectigo will no longer support notes on certificate requests.')
    const fields = (({ message }) => ({ message }))(data)
    return this.axios.post('/processes/' + ((process as IProcess).id || process) + '/add-note', fields)
  }

  async scheduleValidationCall (process: IProcess | number, data: IScheduleValidationCall): Promise<void> {
    const fields = (({ date }) => ({ date }))(data)
    return this.axios.post('/processes/' + ((process as IProcess).id || process) + '/schedule-validation-call', fields)
  }

  async sendSubscriberAgreement (process: IProcess | number, data: ISubscriberAgreement): Promise<void> {
    const fields = (({ email, language }) => ({ email, language }))(data)
    return this.axios.post('/processes/' + ((process as IProcess).id || process) + '/send-subscriber-agreement', fields)
  }

  /**
   * AuthKey for immediate issuance certificates.
   * @param product - Name of the product.
   * @param csr - CSR
   */
  async generateAuthKey (product: string, csr: string): Promise<AuthKey> {
    return this.axios.post<IAuthKey>('/ssl/authkey', { product, csr })
      .then(response => new AuthKey(response.data))
  }

}
