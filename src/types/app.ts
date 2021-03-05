import VariableMap from 'services/map/classes/VariablesMap'
import Api from 'services/api'

export interface ISagasDependencies {
  variablesMap: VariableMap
  api: Api
}
