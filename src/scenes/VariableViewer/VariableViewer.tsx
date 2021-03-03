import { useLayoutEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { createMap, removeMap } from 'services/map/actions'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
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

  return <Wrapper id={mapElemId} />
}

export default VariableViewer
