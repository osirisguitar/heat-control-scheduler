import { DateTime } from 'luxon'

interface HourPrice {
  startTimestamp: number
  startLocalTime: DateTime
  price: number
}

interface Schedule {
  startTime: DateTime
  endTime: DateTime
}

export { HourPrice, Schedule }
