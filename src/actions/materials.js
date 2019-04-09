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

export const CREATE_MATERIAL = 'CREATE_MATERIAL'
export const CREATE_MATERIAL_ERROR = 'CREATE_MATERIAL_ERROR'
export const CREATE_MATERIAL_SUCCESS = 'CREATE_MATERIAL_SUCCESS'

export const createMaterial = (material) => {
  return (dispatch, getState) => {
    const { token } = getState().auth
    dispatch({type: CREATE_MATERIAL})
    api.createMaterial(token.token, material)
      .then(material => {
        dispatch({type: CREATE_MATERIAL_SUCCESS, material})
        dispatch(getMaterials())
      })
      .catch(error => {
        console.error(error)
        dispatch({type: CREATE_MATERIAL_ERROR, error})
      })
  }
}

export const DELETE_MATERIAL = 'DELETE_MATERIAL'
export const DELETE_MATERIAL_ERROR = 'DELETE_MATERIAL_ERROR'
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'

export const deleteMaterial = (id) => {
  return (dispatch, getState) => {
    const { token } = getState().auth
    dispatch({type: DELETE_MATERIAL})
    api.deleteMaterial(token, id)
      .then(() => {
        dispatch({type: DELETE_USER_SUCCESS})
        dispatch(getMaterials())
      })
      .catch(error => {
        console.error(error)
        dispatch({type: DELETE_MATERIAL_ERROR, error})
      })
  }
}

export const UPDATE_MATERIAL = 'UPDATE_MATERIAL'
export const UPDATE_MATERIAL_ERROR = 'UPDATE_MATERIAL_ERROR'
export const UPDATE_MATERIAL_SUCCESS = 'UPDATE_MATERIAL_SUCCESS'

export const updateMaterial = (material) => {
  return (dispatch, getState) => {
    const { token } = getState().auth
    dispatch({type: UPDATE_MATERIAL})
    api.updateMaterial(token, material)
      .then(() => {
        dispatch({type: UPDATE_MATERIAL_SUCCESS})
        dispatch(getMaterials())
      })
      .catch(error => {
        console.error(error)
        dispatch({type: UPDATE_MATERIAL_ERROR, error})
      })
  }
}