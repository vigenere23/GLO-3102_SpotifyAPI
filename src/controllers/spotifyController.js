import { AxiosHelper } from '../helpers/axios'
import { ResponseHelper } from '../helpers/response'

const BASE_URL = 'https://api.spotify.com/v1'

export class SpotifyController {

  static async search (req, res) {
    const headers = {
      'Authorization': req.token
    }
    const url = `${BASE_URL}/search`

    const response = await AxiosHelper.axiosGet(
      url, { params: req.query, headers }
    )
    ResponseHelper.sendResponse(res, response)
  }

  static async similar (req, res) {
    const headers = {
      'Authorization': req.token
    }
    const url = `${BASE_URL}/artists/${req.artistId}/related-artists`

    const artistResponse = await AxiosHelper.axiosGet(
      url, { headers }
    )
    ResponseHelper.sendResponse(res, artistResponse)
  }

}
