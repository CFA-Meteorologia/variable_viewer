const uniques = (values: any[]) => {
  const dict = {}
  values.forEach((v) => (dict[v] = v))
  return Object.keys(dict)
}

export default uniques
