import KoaRouter from '@koa/router'
import { DateTime } from 'luxon'

import { createSchedulesForDay } from './services/scheduleService'
import { routes as priceRoutes, getSpotPrices } from './services/priceService'
import { setSchedules } from './services/heatControlService'

const router = new KoaRouter()

priceRoutes(router)

router.get('/schedule/:date*', async (ctx) => {
  const { params } = ctx

  let date = DateTime.now().plus({ days: 1 })

  if (params.date) {
    date = DateTime.fromFormat(params.date, 'yyyy-MM-dd')
  }

  const prices = await getSpotPrices(date)
  const schedules = await createSchedulesForDay(prices)

  ctx.body = schedules
})

router.post('/schedule/:date*', async (ctx) => {
  const { params } = ctx

  let date = DateTime.now().plus({ days: 1 })

  if (params.date) {
    date = DateTime.fromFormat(params.date, 'yyyy-MM-dd')
  }

  const prices = await getSpotPrices(date)
  const schedules = await createSchedulesForDay(prices)

  if (schedules) {
    const result = await setSchedules(schedules)
    ctx.body = result
  } else {
    ctx.body = { message: 'No schedule for day' }
  }
})

export default router
