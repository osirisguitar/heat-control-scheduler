import app from './app'

import { getSpotPrices } from './services/greenelyService'
import { createScheduleForDay } from './services/scheduleService'

const prices = [
  {
    startTimestamp: 1667170800,
    startLocalTime: new Date(Date.parse('2022-10-31 00:00')),
    price: 75.664,
  },
  {
    startTimestamp: 1667174400,
    startLocalTime: new Date(Date.parse('2022-10-31 01:00')),
    price: 71.258,
  },
  {
    startTimestamp: 1667178000,
    startLocalTime: new Date(Date.parse('2022-10-31 02:00')),
    price: 60.55,
  },
  {
    startTimestamp: 1667181600,
    startLocalTime: new Date(Date.parse('2022-10-31 03:00')),
    price: 55.04,
  },
  {
    startTimestamp: 1667185200,
    startLocalTime: new Date(Date.parse('2022-10-31 04:00')),
    price: 54.508,
  },
  {
    startTimestamp: 1667188800,
    startLocalTime: new Date(Date.parse('2022-10-31 05:00')),
    price: 95.348,
  },
  {
    startTimestamp: 1667192400,
    startLocalTime: new Date(Date.parse('2022-10-31 06:00')),
    price: 191.404,
  },
  {
    startTimestamp: 1667196000,
    startLocalTime: new Date(Date.parse('2022-10-31 07:00')),
    price: 221.521,
  },
  {
    startTimestamp: 1667199600,
    startLocalTime: new Date(Date.parse('2022-10-31 08:00')),
    price: 229.16,
  },
  {
    startTimestamp: 1667203200,
    startLocalTime: new Date(Date.parse('2022-10-31 09:00')),
    price: 209.109,
  },
  {
    startTimestamp: 1667206800,
    startLocalTime: new Date(Date.parse('2022-10-31 10:00')),
    price: 195.536,
  },
  {
    startTimestamp: 1667210400,
    startLocalTime: new Date(Date.parse('2022-10-31 11:00')),
    price: 193.628,
  },
  {
    startTimestamp: 1667214000,
    startLocalTime: new Date(Date.parse('2022-10-31 12:00')),
    price: 193.64,
  },
  {
    startTimestamp: 1667217600,
    startLocalTime: new Date(Date.parse('2022-10-31 13:00')),
    price: 194.322,
  },
  {
    startTimestamp: 1667221200,
    startLocalTime: new Date(Date.parse('2022-10-31 14:00')),
    price: 206.354,
  },
  {
    startTimestamp: 1667224800,
    startLocalTime: new Date(Date.parse('2022-10-31 15:00')),
    price: 223.159,
  },
  {
    startTimestamp: 1667228400,
    startLocalTime: new Date(Date.parse('2022-10-31 16:00')),
    price: 227.824,
  },
  {
    startTimestamp: 1667232000,
    startLocalTime: new Date(Date.parse('2022-10-31 17:00')),
    price: 239.978,
  },
  {
    startTimestamp: 1667235600,
    startLocalTime: new Date(Date.parse('2022-10-31 18:00')),
    price: 240.96,
  },
  {
    startTimestamp: 1667239200,
    startLocalTime: new Date(Date.parse('2022-10-31 19:00')),
    price: 222.272,
  },
  {
    startTimestamp: 1667242800,
    startLocalTime: new Date(Date.parse('2022-10-31 20:00')),
    price: 194.678,
  },
  {
    startTimestamp: 1667246400,
    startLocalTime: new Date(Date.parse('2022-10-31 21:00')),
    price: 181.16,
  },
  {
    startTimestamp: 1667250000,
    startLocalTime: new Date(Date.parse('2022-10-31 22:00')),
    price: 137.988,
  },
  {
    startTimestamp: 1667253600,
    startLocalTime: new Date(Date.parse('2022-10-31 23:00')),
    price: 60.345,
  },
]

app.listen(8001, () => {
  console.log(`listening on http://localhost:8001`)
})
;(async () => {
  const date = new Date()
  date.setDate(new Date().getDate())
  const prices = await getSpotPrices(date)
  await createScheduleForDay(prices)
})()
