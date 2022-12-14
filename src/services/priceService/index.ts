import { HourPrice } from '../../common/types'

import KoaRouter from '@koa/router'
import axios from 'axios'
import { DateTime } from 'luxon'
import * as dotenv from 'dotenv'
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

  return data.data.parameters.facility_id
}

const getSpotPrices = async (day?: DateTime): Promise<HourPrice[]> => {
  const jwt = await login()
  const facilictyId = await getFacilityId(jwt)

  if (!day) {
    day = DateTime.now().plus({ days: 1 })
  }

  day = day.plus({ days: 1 })
  const today = day.minus({ days: 1 })

  const fromDateString = today.toFormat('yyyy-MM-dd')
  const toDateString = day.toFormat('yyyy-MM-dd')

  const headers = {
    ...baseHeaders,
    Authorization: 'JWT ' + jwt,
  }

  const options = {
    method: 'get',
    url:
      baseUrl +
      `/v1/facilities/${facilictyId}/spot-price?from=${fromDateString}&to=${toDateString}&resolution=hourly`,
    headers,
  }

  const { data } = await axios(options)

  const hourPrices = Object.keys(data.data).map((timestamp) => {
    const dataPoint = data.data[timestamp]
    return {
      startTimestamp: Number(timestamp),
      startLocalTime: DateTime.fromFormat(
        dataPoint.localtime,
        'yyyy-MM-dd hh:mm'
      ),
      price: dataPoint.price / 1000,
    }
  })

  if (
    hourPrices.every((price) => {
      return price.price === 0
    })
  ) {
    return []
  }

  return hourPrices
}

export { getSpotPrices }

export const routes = (router: KoaRouter) => {
  router.get('/prices/:date*', async (ctx) => {
    const { params } = ctx

    let date = DateTime.now().plus({ days: 1 })

    if (params.date) {
      date = DateTime.fromFormat(params.date, 'yyyy-MM-dd')
    }

    const result = await getSpotPrices(date)

    ctx.body = result
  })
}
