import { AppState } from 'types/appState'
import { createSelector } from 'reselect'
import uniques from 'helpers/uniques'

const selectState = (state: AppState) => state.variableViewer

export const selectCurrentDate = (state) => selectState(state).currentDate
export const selectIsLoadingDaysWithData = (state) =>
  selectState(state).loadingDaysWithData

export const selectDaysWithData = (state) =>
  selectState(state).daysInMonthWithData

export const selectLayers = (state) => selectState(state).layers

export const selectAvailableVariableNames = createSelector(
  selectLayers,
  (layers) => uniques(layers.map((layer) => layer.variable)),
)

export const selectCurrentVariable = (state) =>
  selectState(state).currentVariable
