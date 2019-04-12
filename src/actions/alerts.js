export const DELETE_ALERT = 'DELETE_ALERT'

export const deleteAlert = id => {
  return {type: DELETE_ALERT, id}
}