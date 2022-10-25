import axios from 'axios'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const baseUrl = 'https://api2.greenely.com'

const baseHeaders = {
  'Accept-Language': 'sv-SE',
  'User-Agent': 'Android 2 111',
  'Content-Type': 'application/json; charset=utf-8',
}

const login = async (): Promise<string> => {
  const payload = {
    email: process.env.GREENELY_EMAIL,
    password: process.env.GREENELY_PASSWORD,
  }

  const options = {
    method: 'post',
    url: baseUrl + '/v1/login',
    headers: baseHeaders,
    data: payload,
  }

  const { data } = await axios(options)

  console.log(data)

  return data.jwt
}

const getFacilityId = async (jwt: string): Promise<string> => {
  const headers = {
    ...baseHeaders,
    Authorization: 'JWT ' + jwt,
  }

  const options = {
    method: 'get',
    url:
      baseUrl +
      '/v1/facilities/primary?includes=retail_state&includes=consumption_limits&includes=parameters',
    headers,
  }

  const { data } = await axios(options)

  console.log(data)

  return data.data.parameters.facility_id
}

const getSpotPrices = async () => {
  const jwt = await login()
  const facilictyId = await getFacilityId(jwt)

  const headers = {
    ...baseHeaders,
    Authorization: 'JWT ' + jwt,
  }

  const options = {
    method: 'get',
    url:
      baseUrl +
      `/v1/facilities/${facilictyId}/spot-price?from=2022-10-26&to=2022-10-27&resolution=hourly`,
    headers,
  }

  console.log(headers)

  const { data } = await axios(options)

  console.log(data.data)
}

export { getSpotPrices }
