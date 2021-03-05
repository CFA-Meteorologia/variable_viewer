import React, { FC } from 'react'

import styled, { css } from 'styled-components'

const Button = styled.button`
  box-sizing: border-box;
  display: inline-block;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  color: #000000;
  padding: 7px 10px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
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
`

export default Button
