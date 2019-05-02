import { AxiosHelper } from '../helpers/axios'
import { constants } from '../helpers/constants'
import { ResponseHelper } from '../helpers/response'

const BASE_URL = 'https://accounts.spotify.com/api/token'

async function getToken(req, res) {
  let token = req.cookies[constants.TOKEN_COOKIE_NAME]
  if (!token) {
    console.log('[INFO] Getting token from spotify')
    const body = { grant_type: 'client_credentials' }
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: process.env.SPOTIFY_AUTHORIZATION
    }
    const authResponse = await AxiosHelper.axiosPost(BASE_URL, body, { headers })

    if (authResponse.error) {
      throw new Error("Could not get token from Spotify")
    } else {
      token = `${authResponse.token_type} ${authResponse.access_token}`
      res.cookie(
        constants.TOKEN_COOKIE_NAME,
        token,
        {
          expires: new Date(Date.now() + (authResponse.expires_in - 100) * 1000)
        }
      )
    }
  }

  return token
}

export class AuthController {

  static async ensureToken (req, res, next) {
    try {
      req.token = await getToken(req, res)
      next()
    }
    catch (err) {
      const response = ResponseHelper.parseError(err)
      res.status(response.status).send(response.error)
    }
  }

}