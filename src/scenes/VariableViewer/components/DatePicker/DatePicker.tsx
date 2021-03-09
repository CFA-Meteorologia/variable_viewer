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
import Button from 'components/Button/Button'
import { format } from 'date-fns'

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const DatePickerContainer = styled.div`
  position: absolute;
  right: 0;
  margin-top: 5px;
`

const DatePicker: FC = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const currentDate = useSelector(selectCurrentDate)
  const [date, setDate] = useState(new Date(currentDate))
  const isLoading = useSelector(selectIsLoadingDaysWithData)
  const daysWithData = useSelector(selectDaysWithData)

  const handleCurrentDateChange = (date: Date) => {
    setDate(date)
    setOpen(false)
    dispatch(setCurrentDate(date.toISOString()))
  }

  const handleToggle = () => {
    setOpen(!open)
  }

  const handleMonthChange = (date: Date) => {
    setDate(date)
  }

  useEffect(() => {
    dispatch(getAvailableDataInMonth(currentDate))
  }, [dispatch, currentDate])

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <ButtonContainer>
            <Button onClick={handleToggle}> {format(date, 'dd-MMM-Y')}</Button>
          </ButtonContainer>
          {open && (
            <DatePickerContainer>
              <DPicker
                onChange={handleCurrentDateChange}
                selected={date}
                onMonthChange={handleMonthChange}
                includeDates={daysWithData.map((d) => new Date(d))}
                forceShowMonthNavigation
                inline
              />
            </DatePickerContainer>
          )}
        </>
      )}
    </>
  )
}

export default DatePicker
