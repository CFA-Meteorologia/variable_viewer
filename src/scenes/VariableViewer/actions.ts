import createAction from 'helpers/createAction'

export const GET_AVAILABLE_DATA_IN_MONTH = 'GET_AVAILABLE_DATA_IN_MONTH'
export const GET_AVAILABLE_DATA_IN_MONTH_SUCCESSFUL =
  'GET_AVAILABLE_DATA_IN_MONTH_SUCCESSFUL'

export const SET_CURRENT_DATE = 'SET_CURRENT_DATE'

export const getAvailableDataInMonth = createAction<string>(
  GET_AVAILABLE_DATA_IN_MONTH,
)
export const getAvailableDataInMonthSuccessful = createAction<string[]>(
  GET_AVAILABLE_DATA_IN_MONTH_SUCCESSFUL,
)

export const setCurrentDate = createAction<string>(SET_CURRENT_DATE)
