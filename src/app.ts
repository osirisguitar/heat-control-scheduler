import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import api from './api'
import errorHandler from './middlewares/error-handler'

const app = new Koa()

app.on('error', (err) => {
  console.error(err)
})

app.use(errorHandler())

app.use(async (ctx, next) => {
  await next()
})

app.use(bodyParser())
app.use(api.routes())

export default app
