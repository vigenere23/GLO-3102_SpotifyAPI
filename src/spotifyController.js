import { AxiosHelper } from './helpers/axios'

const AUTH = 'Basic ZGM3Njg0OTRkYzU2NDVlMGEyMGYyMTUxN2FhNjBjY2I6OGI0YTk5NWEyMGZiNGY5ZGE2YmFiYTIzMzgyNzIwOTE='
const AUTH_URL = 'https://accounts.spotify.com/api/token'
const URL = 'https://api.spotify.com/v1'

async function getToken(req, res) {
  let token = req.cookies['spotify_token']
  if (!token) {
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
      res.cookie('spotify_token', token, { expires: new Date(Date.now() + authResponse.expires_in * 1000 - 10) })
    }
  }

  return token
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
    
    res.status(response.status || 200).send(response)
  }

}
