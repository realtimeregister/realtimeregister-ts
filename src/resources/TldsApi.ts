import Base from '@/resources/Base.ts'
import Metadata from '@/models/Metadata.ts'


export default class TldsApi extends Base {

  /**
   * Get TLD metadata.
   * @param {string} tld - tld to get metadata for.
   */
  async info (tld: string): Promise<Metadata> {
    return this.axios.get('/tlds/' + tld + '/info').then(response => new Metadata(response.data))
  }

}