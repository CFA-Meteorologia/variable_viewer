export type VariableDomain = 'd01' | 'd02' | 'd03'

export type Coord = {
  long: number
  lat: number
}
export type Bbox = {
  northWest: Coord
  southEast: Coord
}
export interface VariableLayer {
  variable: string
  domain: string
  bbox: Bbox
  // ISO 8601 time period
  time: string
}

export interface IVariable {
  domain: VariableDomain
  data: number[][]
  projection: string
  date: Date
  variableName: string
  bbox: Bbox
}
