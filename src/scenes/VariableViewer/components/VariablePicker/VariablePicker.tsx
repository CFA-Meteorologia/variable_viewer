import { useDispatch, useSelector } from 'react-redux'
import {
  selectAvailableVariableNames,
  selectCurrentVariable,
} from '../../selectors'
import Button from 'components/Button/Button'
import styled from 'styled-components'
import { setCurrentVariable } from '../../actions'
import { useMemo } from 'react'
import makeChunks from 'helpers/makeChunks'

const Container = styled.div`
  background: #bdbdbd;
  padding: 5px;
  margin-top: 5px;
  border-radius: 5px;
`

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
  const chunks = useMemo(() => makeChunks(variables, 3), [variables])

  return (
    <Container>
      {chunks.map((chunk) => (
        <Row>
          {chunk.map((v) => (
            <Button
              theme="text"
              selected={v === currentVariable}
              onClick={() => dispatch(setCurrentVariable(v))}
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
