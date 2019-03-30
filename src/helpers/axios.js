import axios from 'axios'
import qs from 'qs'

export class AxiosHelper {

  static async axiosGet(url, options) {
    try {
      const response = await axios.get(url, options);
      return response.data;
    } catch (err) {
      return this.parseError(err)
    }
  }

  static async axiosPost(url, body, options) {
    try {
      const response = await axios.post(url, qs.stringify(body), options);
      return response.data;
    } catch (err) {
      return this.parseError(err)
    }
  }

  static parseError (err) {
    if (err.response && err.response.status) {
      console.error(err.response.data)
      return {
        status: err.response.status,
        error: err.response.data
      }
    }
    else {
      console.error(err)
      return {
        status: 500,
        error: err.toString()
      }
    }
  }

}
