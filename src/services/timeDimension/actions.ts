import createAction from 'helpers/createAction'

export const SET_TIMES_TO_SHOW = 'SET_TIMES_TO_SHOW'
export const SET_LOADING_NEXT_FRAME = 'SET_LOADING_NEXT_FRAME'
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME'

export const setTimesToShow = createAction<number[]>(SET_TIMES_TO_SHOW)
export const setLoadingNextFrame = createAction<boolean>(SET_LOADING_NEXT_FRAME)
export const setCurrentTime = createAction<number>(SET_CURRENT_TIME)
