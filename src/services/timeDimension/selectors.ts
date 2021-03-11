import { AppState } from 'types/appState'

const selectState = (state: AppState) => state.timeDimension

export const selectCurrentTime = (state) => selectState(state).currentTime
export const selectAvailableTimes = (state) => selectState(state).availableTimes
