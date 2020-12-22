export interface MapSideEffectsType {
  createMap: (elementId: string) => void
  removeMap: () => void
  moveView: (lat: number, lng: number) => void
}
