import { BallSpinFadeLoader } from 'react-pure-loaders'
import styled from 'styled-components'

const Container = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`
const Loader = () => (
  <Container>
    <BallSpinFadeLoader color="black" loading />
  </Container>
)

export default Loader
