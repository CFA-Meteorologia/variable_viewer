import VariableMap from 'services/map/classes/VariablesMap'
import Api from 'services/api'
import { TimeDimension } from 'leaflet-timedimension-scoped'

export interface ISagasDependencies {
  variablesMap: VariableMap
  timeDimension: TimeDimension
  api: Api
}
