import KoaRouter from '@koa/router'

import { createSchedulesForDay } from './services/scheduleService'
import { routes as priceRoutes, getSpotPrices } from './services/priceService'
import { setSchedules } from './services/heatControlService'

const router = new KoaRouter()

priceRoutes(router)

router.get('/schedule', async (ctx) => {
  const prices = await getSpotPrices()
  const schedules = await createSchedulesForDay(prices)

  ctx.body = schedules
})

router.post('/schedule', async (ctx) => {
  const prices = await getSpotPrices()
  const schedules = await createSchedulesForDay(prices)

  if (schedules) {
    const result = await setSchedules(schedules)
    ctx.body = result
  } else {
    ctx.body = { message: 'No schedule for day' }
  }
})

export default router
