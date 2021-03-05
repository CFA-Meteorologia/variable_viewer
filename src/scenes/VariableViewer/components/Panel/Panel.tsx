import { FC } from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div<any>`
  position: absolute;
  z-index: 100;

  background: white;

  ${({ position }) =>
    position === 'right' &&
    css`
      right: 0;
      width: 300px;
      height: 100vh;
      padding: 30px 20px;
    `}
`

interface IProps {
  position: 'bottom' | 'right'
}
const Panel: FC<IProps> = ({ children, position }) => {
  return <Container position={position}>{children}</Container>
}

export default Panel
