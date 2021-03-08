import styled, { css } from 'styled-components'

interface IProps {
  theme?: 'text'
  selected?: boolean
  onClick: () => void
}

const Button = styled.button<IProps>`
  box-sizing: border-box;
  display: inline-block;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  color: #000000;
  padding: 7px 10px;
  min-width: 50px;
  text-align: center;
  white-space: nowrap;
  background-color: #f0f0f0;
  border: 1px solid #aeaeae;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #ececec;
  }
  ${({ theme, selected }) =>
    theme === 'text' &&
    css`
      border: none;
      background: none;
      display: flex;
      justify-content: center;
      padding: 7px 0;
      ${selected && `background-color: #ececec`}
    `}
`

export default Button
