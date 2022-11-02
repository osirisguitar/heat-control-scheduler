import { DateTime } from 'luxon'

import app from './app'

import { getSpotPrices } from './services/greenelyService'
import { createScheduleForDay } from './services/scheduleService'

app.listen(8001, () => {
  console.log(`listening on http://localhost:8001`)
})
;(async () => {
  const prices = await getSpotPrices(DateTime.now().plus({ days: 1 }))
  const schedule = await createScheduleForDay(prices)

  console.log(schedule)

  const output = schedule?.map((schedule) => {
    return {
      startTime: schedule.startTime.toFormat('yyyy-MM-dd HH:mm:ss.'),
      endTime: schedule.endTime.toFormat('yyyy-MM-dd HH:mm:ss'),
    }
  })

  console.log('Turn shit off between', output)
})()
