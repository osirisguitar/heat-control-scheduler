import { Schedule } from '../../common/types'

import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()

const baseHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
}

const setSchedule = async (schedule: Schedule): Promise<any> => {
  const payload = {
    from: schedule.startTime.toFormat('yyyy-MM-dd HH:mm:ss.SSS'),
    to: schedule.endTime.toFormat('yyyy-MM-dd HH:mm:ss.SSS'),
    state: 1,
  }

  const options = {
    method: 'post',
    url: process.env.HEAT_CONTROL_URL,
    headers: baseHeaders,
    data: payload,
  }

  const { data } = await axios(options)

  return data
}

const setSchedules = async (schedules: Schedule[]): Promise<any> => {
  const result: any[] = []

  for (let i = 0; i < schedules.length; i++) {
    result.push(await setSchedule(schedules[i]))
  }

  return result
}

export { setSchedules }
