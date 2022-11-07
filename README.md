# heat-control-scheduler

Heat control scheduler gets electricity prices and creates a schedule for when the heat should be turned off during peak hours.

Requirements:

- A heating pump controllable by heat-control (build your own hardware controller from a raspberry pi and a relay)
- Electricty contract with hourly spot prices
- Slow-reacting house (concrete slab etc.) that will retain temperature even if heating is turned off during intervals during the day
