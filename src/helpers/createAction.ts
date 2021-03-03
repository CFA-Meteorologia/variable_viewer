export default function createAction<T>(actionType: string) {
  const action = (payload: T) => ({
    payload,
    type: actionType,
  })

  action.toString = () => actionType

  return action
}
