import { DateTime } from 'luxon'

interface HourPrice {
  startTimestamp: number
  startLocalTime: DateTime
  price: number
}

interface Schedule {
  startTime: DateTime
  endTime: DateTime
  minPrice: Number
  maxPrice: Number
  prices: Number[]
  savings: Number
}

export { HourPrice, Schedule }
