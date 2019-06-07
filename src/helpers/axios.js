import axios from 'axios'
import qs from 'qs'
import { ResponseHelper } from './response'

export class AxiosHelper {
  static async axiosGet (url, options) {
    try {
      const response = await axios.get(url, options)
      return response.data
    } catch (err) {
      return ResponseHelper.parseError(err)
    }
  }

  static async axiosPost (url, body, options) {
    try {
      const response = await axios.post(url, qs.stringify(body), options)
      return response.data
    } catch (err) {
      return ResponseHelper.parseError(err)
    }
  }
}
