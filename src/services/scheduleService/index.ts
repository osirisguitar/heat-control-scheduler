import { DateTime } from 'luxon'
import * as dotenv from 'dotenv'
dotenv.config()

import { HourPrice, Schedule } from '../../common/types'

const alwaysOkThreshold = process.env.ALWAYS_OK_THRESHOLD
  ? Number(process.env.ALWAYS_OK_THRESHOLD)
  : 100
const neverOkThreshold = process.env.NEVER_OK_THRESHOLD
  ? Number(process.env.NEVER_OK_THRESHOLD)
  : 250
const maximumInactiveHours = process.env.MAXIMUM_INACTIVE_HOURS
  ? Number(process.env.MAXIMUM_INACTIVE_HOURS)
  : 9

const createSchedulesForDay = (prices: HourPrice[]): Schedule[] | null => {
  let inactiveHours = prices.filter((price) => {
    return price.price > alwaysOkThreshold
  })

  if (inactiveHours.length > maximumInactiveHours) {
    const additionalHours = prices
      .filter((price) => {
        return price.price > alwaysOkThreshold && price.price < neverOkThreshold
      })
      .sort((price1, price2) => {
        return price1.price < price2.price ? -1 : 1
      })
      .slice(0, inactiveHours.length - maximumInactiveHours)

    inactiveHours = inactiveHours.filter(
      (price) => additionalHours.indexOf(price) === -1
    )
  }

  inactiveHours = inactiveHours.sort((price1, price2) => {
    return price1.startTimestamp < price2.startTimestamp ? -1 : 1
  })

  if (inactiveHours.length === 0) {
    return []
  }

  let lastTime: DateTime | null = null
  let startTime: DateTime | null = null
  const schedules: Schedule[] = []

  inactiveHours.forEach((price) => {
    console.log('startTime', startTime?.hour, 'lastTime', lastTime?.hour)
    if (lastTime) {
      if (price.startLocalTime.hour !== lastTime.hour + 1) {
        if (startTime) {
          schedules.push({
            startTime: startTime,
            endTime: lastTime.plus({ hours: 1 }),
          })

          startTime = null
        } else {
          startTime = price.startLocalTime
        }
      }
    }

    if (!startTime) {
      startTime = price.startLocalTime
    }

    lastTime = price.startLocalTime
  })

  if (startTime && lastTime) {
    schedules.push({
      startTime: startTime,
      endTime: (lastTime as DateTime).plus({ hours: 1 }),
    })
  }

  return schedules
}

export { createSchedulesForDay }
