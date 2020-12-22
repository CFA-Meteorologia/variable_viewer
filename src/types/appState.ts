import { IVariableViewerState } from 'scenes/VariableViewer/reducer'
import { IMapState } from 'services/map/reducer'

export type AppState = {
  variableViewerReducer: IVariableViewerState
  mapReducer: IMapState
}
