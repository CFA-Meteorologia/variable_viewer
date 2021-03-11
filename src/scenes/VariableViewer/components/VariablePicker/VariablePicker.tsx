import { useDispatch, useSelector } from 'react-redux'
import {
  selectAvailableVariableNames,
  selectCurrentDate,
  selectCurrentVariable,
} from '../../selectors'
import Button from 'components/Button/Button'
import styled from 'styled-components'
import { setCurrentVariable } from '../../actions'
import { useMemo } from 'react'
import makeChunks from 'helpers/makeChunks'
import Container from 'components/Container/Container'

const Row = styled.div`
  display: flex;
  margin-top: 3px;
  ${Button} {
    margin: 0 3px;
  }
  & > * {
    flex-grow: 1;
    flex-basis: 50px;
  }
`

const VariablePicker = () => {
  const dispatch = useDispatch()
  const variables = useSelector(selectAvailableVariableNames)
  const currentVariable = useSelector(selectCurrentVariable)
  const currentDate = useSelector(selectCurrentDate)
  const chunks = useMemo(() => makeChunks(variables, 3), [variables])

  return (
    <Container>
      {chunks.map((chunk, index) => (
        <Row key={currentDate + index}>
          {chunk.map((v) => (
            <Button
              theme="text"
              selected={v === currentVariable}
              onClick={() => dispatch(setCurrentVariable(v))}
              key={v}
            >
              {v}
            </Button>
          ))}
        </Row>
      ))}
    </Container>
  )
}

export default VariablePicker
