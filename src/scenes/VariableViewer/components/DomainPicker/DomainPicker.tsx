import { FC } from 'react'
import Container from 'components/Container/Container'
import { useDispatch, useSelector } from 'react-redux'
import { selectSelectedDomains } from '../../selectors'
import { selectDomains } from '../../actions'
import Button from 'components/Button/Button'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  display: flex;
  & > * {
    margin: 0 3px;
  }
`

const domains = ['d01', 'd02', 'd03']
const DomainPicker: FC = () => {
  const selectedDomains = useSelector(selectSelectedDomains)
  const dispatch = useDispatch()
  const handleSelection = (domain) => {
    let clonedDomains
    if (selectedDomains.includes(domain))
      clonedDomains = selectedDomains.filter((d) => d !== domain)
    else clonedDomains = [...selectedDomains, domain]

    if (clonedDomains.length === 0) clonedDomains.push(domains[0])

    dispatch(selectDomains(clonedDomains))
  }
  return (
    <StyledContainer>
      {domains.map((d) => (
        <Button
          theme="text"
          selected={selectedDomains.includes(d)}
          onClick={() => handleSelection(d)}
          key={d}
        >
          {d}
        </Button>
      ))}
    </StyledContainer>
  )
}

export default DomainPicker
