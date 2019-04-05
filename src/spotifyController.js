import { AxiosHelper } from './helpers/axios'

const AUTH = 'Basic ZGM3Njg0OTRkYzU2NDVlMGEyMGYyMTUxN2FhNjBjY2I6OGI0YTk5NWEyMGZiNGY5ZGE2YmFiYTIzMzgyNzIwOTE='
const AUTH_URL = 'https://accounts.spotify.com/api/token'
const URL = 'https://api.spotify.com/v1'
const TOKEN_COOKIE_NAME = 'spotify_token'

async function getToken(req, res) {
  let token = req.cookies[TOKEN_COOKIE_NAME]
  if (!token) {
    console.log('[INFO] Getting token from spotify')
    const body = { grant_type: 'client_credentials' }
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: AUTH
    }
    const authResponse = await AxiosHelper.axiosPost(AUTH_URL, body, { headers })

    if (authResponse.error) {
      throw new Error("Could not get token from Spotify")
    } else {
      token = `${authResponse.token_type} ${authResponse.access_token}`
      res.cookie(TOKEN_COOKIE_NAME, token, { expires: new Date(Date.now() + authResponse.expires_in * 1000 - 100) })
    }
  }

  return token
}

function sendResponse(res, response) {
  if (response.error) {
    res.clearCookie(TOKEN_COOKIE_NAME)
  }
  res.status(response.status || 200).send(response)
}

export class SpotifyController {

  static async ensureToken (req, res, next) {
    try {
      req.token = await getToken(req, res)
      next()
    }
    catch (err) {
      const response = AxiosHelper.parseError(err)
      res.status(response.status).send(response.error)
    }
  }

  static async search (req, res) {
    const headers = {
      'Authorization': req.token
    }
    const url = `${URL}/search`

    const response = await AxiosHelper.axiosGet(
      url, { params: req.query, headers }
    )

    sendResponse(res, response)
  }

  static async similar (req, res) {

  }

}
