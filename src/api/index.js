import axios from 'axios'

/**
 * @see {@link https://developer.github.com/v3/#increasing-the-unauthenticated-rate-limit-for-oauth-applications}
 */
const getOAuthTokens = () => {
  if (!process.env.VUE_APP_GITHUB_CLIENTID || !process.env.VUE_APP_GITHUB_CLIENTSECRET) {
    return {}
  }
  return {
    params: {
      client_id: process.env.VUE_APP_GITHUB_CLIENTID,
      client_secret: process.env.VUE_APP_GITHUB_CLIENTSECRET
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
  const fullUrl = `${process.env.VUE_APP_GITHUB_URL}/${shortUrl}`

  return axios.get(fullUrl, getOAuthTokens()).then(response => {
    if (includeHeaders) {
      return response
    }
    return response.data
  })
}
