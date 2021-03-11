import { IVariableViewerState } from 'scenes/VariableViewer/reducer'
import { IMapState } from 'services/map/reducer'
import { ITimeDimensionState } from 'services/timeDimension/reducer'

export type AppState = {
  variableViewer: IVariableViewerState
  map: IMapState
  timeDimension: ITimeDimensionState
}
