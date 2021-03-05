import { FC, useState } from 'react'
import styled, { css } from 'styled-components'
import Button from 'components/Button/Button'

const Container = styled.div<any>`
  position: absolute;
  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  transition: all 0.2s ease-out;

  ${({ position }) =>
    position === 'right' &&
    css`
      right: 0;
      width: 300px;
      height: 100vh;
      padding: 30px 20px;
    `}

  ${({ open }) =>
    !open &&
    css`
      width: 40px;
      opacity: 0.5;

      &:hover {
        opacity: 1;
      }
    `}
`

const StyledButton = styled<any>(Button)`
  min-width: 32px;

  ${({ open }) =>
    !open &&
    css`
      transform: rotate(180deg);
    `}
`

const ChildrenContainer = styled.div`
  position: relative;
  margin-top: 20px;
`

interface IProps {
  position: 'bottom' | 'right'
}
const Panel: FC<IProps> = ({ children, position }) => {
  const [open, setOpen] = useState(true)

  return (
    <Container position={position} open={open}>
      <StyledButton open={open} onClick={() => setOpen(!open)}>
        {'>>'}
      </StyledButton>
      <ChildrenContainer>{open && children}</ChildrenContainer>
    </Container>
  )
}

export default Panel
