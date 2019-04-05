import { constants } from './constants'

export class ResponseHelper {

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

  static sendResponse(res, response) {
    if (response.error) {
      res.clearCookie(constants.TOKEN_COOKIE_NAME)
    }
    res.status(response.status || 200).send(response)
  }

}
