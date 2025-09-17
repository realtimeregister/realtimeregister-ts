import staticAxios, { AxiosInstance } from 'axios'

/** Create an axios instance for testing. */
export function createAxios (): AxiosInstance {
  return staticAxios.create({ baseURL: 'https://api.yoursrs-ote.com/v2/' })
}