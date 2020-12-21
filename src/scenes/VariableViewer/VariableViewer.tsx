import { useSideEffects } from '../../services/sideEffects'
import { useLayoutEffect } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

const VariableViewer = () => {
  const mapElemId = 'map'
  const { mapSideEffects } = useSideEffects()

  useLayoutEffect(() => {
    mapSideEffects.createMap(mapElemId)
  }, [])

  return <Wrapper id={mapElemId} />
}

export default VariableViewer
