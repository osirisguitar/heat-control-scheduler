# Heat-Control Scheduler

Heat control scheduler gets electricity prices and creates a schedule for when the heat should be turned off during peak hours. It can also send the created schedule to a running heat-control instance.

Requirements:

- A heating pump controllable by heat-control (build your own hardware controller from a raspberry pi and a relay)
- Electrity contract with hourly spot prices
- A source of spot prices (default implementation is for https://greenely.se/)
- Slow-reacting house (concrete slab etc.) that will retain temperature even if heating is turned off during intervals during the day

## Running

1. Copy template.env to .env, and populate with appropriate values for you. The threshold values for the default implementation (Greenely) is in Swedish öre, so 100 = 1 SEK.
2. nvm use
3. npm install
4. npm run dev

## Endpoints

### GET /prices{/:date}

Returns prices for a day, default tomorrow. If specified, for a specific date (format yyyy-MM-dd)

### GET /prices{/:date}

Returns schedule for a day, default tomorrow. If specified, for a specific date (format yyyy-MM-dd)

### POST /prices{/:date}

Creates schedule for a day (default tomorrow) and posts it to a heat-control application, URL specified in .env. If specified, for a specific date (format yyyy-MM-dd)
