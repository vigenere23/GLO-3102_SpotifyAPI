export class ExpressHelper {
  static getHeaders (req, headerNames) {
    if (!Array.isArray(headerNames)) {
      throw new Error('The list of header names must be an Array')
    }

    const headers = {}
    headerNames.forEach(headerName => {
      headers[headerName] = req.header(headerName)
    })

    return headers
  }
}
