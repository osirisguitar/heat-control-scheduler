import app from './app'

import { getSpotPrices } from './services/greenelyService'

app.listen(8001, () => {
  console.log(`listening on http://localhost:8001`)
})
;(async () => {
  await getSpotPrices()
})()
