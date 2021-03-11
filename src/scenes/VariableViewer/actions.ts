import createAction from 'helpers/createAction'
import { VariableLayer } from '../../types/map'

export const GET_AVAILABLE_DATA_IN_MONTH = 'GET_AVAILABLE_DATA_IN_MONTH'
export const GET_AVAILABLE_DATA_IN_MONTH_SUCCESSFUL =
  'GET_AVAILABLE_DATA_IN_MONTH_SUCCESSFUL'

export const SET_CURRENT_DATE = 'SET_CURRENT_DATE'
export const SET_CURRENT_DATE_SUCCESSFUL = 'SET_CURRENT_DATE_SUCCESSFUL'

export const SET_CURRENT_VARIABLE = 'SET_CURRENT_VARIABLE'

export const SELECT_DOMAINS = 'SET_SELECT_DOMAINS'

export const getAvailableDataInMonth = createAction<string>(
  GET_AVAILABLE_DATA_IN_MONTH,
)
export const getAvailableDataInMonthSuccessful = createAction<string[]>(
  GET_AVAILABLE_DATA_IN_MONTH_SUCCESSFUL,
)

export const setCurrentDate = createAction<string>(SET_CURRENT_DATE)
export const setCurrentDateSuccessful = createAction<VariableLayer[]>(
  SET_CURRENT_DATE_SUCCESSFUL,
)

export const setCurrentVariable = createAction<string>(SET_CURRENT_VARIABLE)

export const selectDomains = createAction<string[]>(SELECT_DOMAINS)
