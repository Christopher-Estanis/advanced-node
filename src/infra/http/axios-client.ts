import axios from 'axios'
import { HttpGetClient } from '@/infra/http'

export class AxiosHttpClient implements HttpGetClient {
  async get (args: HttpGetClient.Params): Promise<any> {
    const result = await axios.get(args.url, { params: args.params })
    return result.data
  }
}
