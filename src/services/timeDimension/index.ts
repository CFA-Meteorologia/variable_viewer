import { Store } from 'redux'
import { AppState } from 'types/appState'
import { TimeDimension } from 'leaflet-timedimension-scoped'
import { setCurrentTime, setLoadingNextFrame, setTimesToShow } from './actions'
import { selectCurrentTime } from './selectors'

export const createTimeDimension = (store: Store<AppState, any>) => {
  const timeDimension = new TimeDimension({})

  // @ts-ignore
  timeDimension.on('availabletimeschanged', ({ availableTimes }) => {
    store.dispatch(setTimesToShow(availableTimes))
    store.dispatch(setCurrentTime(availableTimes[0]))
  })

  timeDimension.on('timeload', () => {
    const currentAppTime = selectCurrentTime(store.getState())
    const currentTimeDimensionTime = timeDimension.getCurrentTime()
    if (
      currentAppTime !== currentTimeDimensionTime &&
      typeof currentTimeDimensionTime === 'number'
    )
      store.dispatch(setCurrentTime(currentTimeDimensionTime))
  })

  return timeDimension
}
