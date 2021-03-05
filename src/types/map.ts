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
  domain: number
  bbox: Bbox
  // ISO 8601 time period
  time: string
}
