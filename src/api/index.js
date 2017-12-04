import axios from 'axios'

/**
 * @see {@link https://developer.github.com/v3/#increasing-the-unauthenticated-rate-limit-for-oauth-applications}
 */
const getOAuthTokens = () => {
  if (!process.env.GITHUB_CLIENTID || !process.env.GITHUB_CLIENTSECRET) {
    return {}
  }
  return {
    params: {
      client_id: process.env.GITHUB_CLIENTID,
      client_secret: process.env.GITHUB_CLIENTSECRET
    }
  }
}

/**
 * Fetch data accross GitHub Api and put it into window storage
 * @param {string} shortUrl
 * @param {boolean} [includeHeaders=false] include headers in the response
 * @return {Promise<Object[]>} Promise with the fetched datas
 */
export function get (shortUrl, includeHeaders = false) {
  if (window.sessionStorage.getItem(shortUrl)) {
    return Promise.resolve(JSON.parse(window.sessionStorage.getItem(shortUrl)))
  }
  const fullUrl = `${process.env.GITHUB_URL}/${shortUrl}`

  return axios.get(fullUrl, getOAuthTokens()).then(response => {
    if (includeHeaders) {
      window.sessionStorage.setItem(shortUrl, JSON.stringify(response))
      return response
    }
    window.sessionStorage.setItem(shortUrl, JSON.stringify(response.data))
    return response.data
  })
}
