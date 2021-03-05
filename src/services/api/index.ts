import axios, { AxiosInstance } from 'axios'
import variables from 'helpers/environmentVars'
import { VariableLayer } from 'types/map'

class Api {
  conn: AxiosInstance
  constructor() {
    this.conn = axios.create({
      baseURL: variables.api_url,
    })
  }

  fetchAvailableDataInMonth = async (date: string) => {
    const { data } = await this.conn.get<string[]>(
      `variables/available_days_in_month/${date}`,
    )

    return data
  }

  fetchLayersInDay = async (date: string) => {
    const { data } = await this.conn.get<VariableLayer[]>(
      `variables/layers/${date}`,
    )

    return data
  }
}

export default Api
