import { HourPrice } from '../../common/types'

const alwaysOkThreshold = 100
const neverOkThreshold = 250
const minumumActiveHours = 12

const createScheduleForDay = (day: Date, prices: HourPrice[]) => {
  const alwaysOkPrices = prices.filter((price) => {
    return price.price < alwaysOkThreshold
  })

  if (alwaysOkPrices.length < minumumActiveHours) {
  }

  console.log(alwaysOkPrices)
}

export { createScheduleForDay }
