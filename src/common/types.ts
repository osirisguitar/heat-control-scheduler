interface HourPrice {
  startTimestamp: number
  startLocalTime: Date
  price: number
}

interface Schedule {
  startTime: Date
  endTime: Date
}

export { HourPrice, Schedule }
