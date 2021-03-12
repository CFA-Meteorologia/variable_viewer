import axios, { AxiosInstance } from 'axios'
import variables from 'helpers/environmentVars'
import { IVariable, VariableLayer } from 'types/map'

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

  fetchVarData = async (varName: string, date: string, domain: number) => {
    const { data } = await this.conn.get<IVariable>(
      `variables/${varName}/${date}/${domain}`,
    )

    return data
  }
}

export default Api
