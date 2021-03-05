import { FC, useEffect, useState } from 'react'
import DPicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentDate,
  selectDaysWithData,
  selectIsLoadingDaysWithData,
} from 'scenes/VariableViewer/selectors'
import { getAvailableDataInMonth, setCurrentDate } from '../../actions'
import Loader from 'components/Loader'
import styled from 'styled-components'

const StyledButton = styled.button``

const DatePicker: FC = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [time, setTime] = useState(new Date())
  const currentDate = useSelector(selectCurrentDate)
  const isLoading = useSelector(selectIsLoadingDaysWithData)
  const daysWithData = useSelector(selectDaysWithData)

  const handleCurrentDateChange = (date: Date) => {
    setTime(date)
    // dispatch(setCurrentDate(date.toISOString()))
  }

  const handleToggle = () => {
    setOpen(!open)
  }

  const handleMonthChange = (date: Date) => {
    dispatch(getAvailableDataInMonth(date.toISOString()))
    setTime(date)
  }

  useEffect(() => {
    dispatch(getAvailableDataInMonth(currentDate))
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <StyledButton onClick={handleToggle}> bbb</StyledButton>
          {open && (
            <DPicker
              onChange={handleCurrentDateChange}
              selected={time}
              onMonthChange={handleMonthChange}
              // excludeDates={daysWithoutData}
              includeDates={daysWithData.map((d) => new Date(d))}
              forceShowMonthNavigation
              inline
            />
          )}
        </>
      )}
    </>
  )
}

export default DatePicker
