import { AppState } from 'types/appState'

const selectState = (state: AppState) => state.variableViewerReducer

export const selectCurrentDate = (state) => selectState(state).currentDate
export const selectIsLoadingDaysWithData = (state) =>
  selectState(state).loadingDaysWithData

export const selectDaysWithData = (state) =>
  selectState(state).daysInMonthWithData
