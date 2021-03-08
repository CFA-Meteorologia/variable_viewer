const re = /[\d]$/

const domainToNumber = (v: string) => {
  const matched = v.match(re)

  if (matched) return parseInt(matched[0], 10)
  return 3
}

export default domainToNumber
