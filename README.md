# Realtime Register REST API - TypeScript SDK
[![NPM Version](https://img.shields.io/npm/v/%40realtimeregister%2Fapi?logo=npm)](https://www.npmjs.com/package/@realtimeregister/api)
[![GitHub License](https://img.shields.io/github/license/realtimeregister/realtimeregister-ts)](https://github.com/realtimeregister/realtimeregister-ts?tab=MIT-1-ov-file)

Official TypeScript SDK for our REST API.
```bash
pnpm add @realtimeregister/api
```

## Supported APIs

* [Billing API](https://dm.realtimeregister.com/docs/api/financial)
* [Brand API](https://dm.realtimeregister.com/docs/api/brands)
* [Contacts API](https://dm.realtimeregister.com/docs/api/contacts)
* [Customers API](https://dm.realtimeregister.com/docs/api/customers)
* [Dns Template API](https://dm.realtimeregister.com/docs/api/templates)
* [Dns Zone API](https://dm.realtimeregister.com/docs/api/zones)
* [Domains API](https://dm.realtimeregister.com/docs/api/domains)
* [Hosts API](https://dm.realtimeregister.com/docs/api/hosts)
* [Notifications API](https://dm.realtimeregister.com/docs/api/notifications)
* [Processes API](https://dm.realtimeregister.com/docs/api/processes)
* [Providers API](https://dm.realtimeregister.com/docs/api/providers)
* [SiteLock API](https://dm.realtimeregister.com/docs/api/sitelock)
* [SSL API](https://dm.realtimeregister.com/docs/api/ssl)
* [TLDs API](https://dm.realtimeregister.com/docs/api/tlds)
* [Validation API](https://dm.realtimeregister.com/docs/api/validation)

## Example usage

```ts
import RealtimeRegisterAPI from '@realtimeregister/api'
import { AuthenticationError } from '@realimeregister/api/exceptions'
// Or...
const RealtimeRegisterAPI = require('@realtimeregister/api').default
const { AuthenticationError } = require('@realtimeregister/api/exceptions')
```
```ts
const rtr = new RealtimeRegisterAPI({
  apiKey: 'YOUR_API_KEY',
  customer: 'YOUR_CUSTOMER_HANDLE'
})

// Get TLD metadata
rtr.tld.info('nl').then((response) => {
  console.log(response)
  //Metadata(hash=..., applicableFor=..., metadata=..., provider=...)
  console.log(response.metadata)
  // {....}
}).catch((err) => {
  if (err instanceof AuthenticationError) {
    console.log('Authentication error')
  }
})

// Check domain
rtr.domains.check('testdomain.com').then((response) => {
  console.log(response)
  /* {
  *   available: false,
  *   reason: 'test',
      premium: false,
      currency: 'USD',
      price: 3000
  * } 
  */
})
```

## License
This project is licensed under the MIT license.
