import app from './app'

import { getSpotPrices } from './services/greenelyService'
import { createScheduleForDay } from './services/scheduleService'

app.listen(8001, () => {
  console.log(`listening on http://localhost:8001`)
})
;(async () => {
  const prices = await getSpotPrices()
  await createScheduleForDay(new Date(), prices)
})()
