import api from '../api'

export const GET_QUALITIES = 'GET_QUALITIES'
export const GET_QUALITIES_ERROR = 'GET_QUALITIES_ERROR'
export const GET_QUALITIES_SUCCESSFUL = 'GET_QUALITIES_SUCCESSFUL'

export const getQualities = (filter) => {
  return (dispatch, getState) => {
    const { token } = getState().auth
    dispatch({type: GET_QUALITIES, filter})
    api.getQualities(token)
      .then(qualities => {
        dispatch({type: GET_QUALITIES_SUCCESSFUL, qualities})
      })
      .catch(error => {
        dispatch({type: GET_QUALITIES_ERROR, error})
      })
  }
}