import { useLayoutEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { createMap, removeMap } from 'services/map/actions'
import Panel from './components/Panel/Panel'
import DatePicker from './components/DatePicker/DatePicker'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
`

const VariableViewer = () => {
  const mapElemId = 'map'
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(createMap(mapElemId))
    return () => {
      dispatch(removeMap())
    }
  }, [])

  return (
    <Wrapper>
      <Wrapper id={mapElemId} />
      <Panel position="right">
        <DatePicker />
      </Panel>
    </Wrapper>
  )
}

export default VariableViewer
