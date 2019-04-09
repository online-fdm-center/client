import api from '../api'

export const GET_MATERIALS = 'GET_MATERIALS'
export const GET_MATERIALS_ERROR = 'GET_MATERIALS_ERROR'
export const GET_MATERIALS_SUCCESSFUL = 'GET_MATERIALS_SUCCESSFUL'

export const getMaterials = (filter) => {
  return (dispatch, getState) => {
    const { token } = getState().auth
    if (!filter) filter = getState().materials.filter
    dispatch({type: GET_MATERIALS, filter})
    api.getMaterials(token.token, filter)
      .then(materials => {
        dispatch({type: GET_MATERIALS_SUCCESSFUL, materials})
      })
      .catch(error => {
        dispatch({type: GET_MATERIALS_ERROR, error})
      })
  }
}