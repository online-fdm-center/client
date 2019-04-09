import {
  GET_MATERIALS,
  GET_MATERIALS_ERROR,
  GET_MATERIALS_SUCCESSFUL
} from '../actions/materials'

const initialState = {
  materials: [],
}

function materialsReducer(state = initialState, action) {
  switch (action.type) {
  case GET_MATERIALS:
    return { ...state, materials: [] }
  case GET_MATERIALS_SUCCESSFUL:
    return { ...state, materials: action.materials }
  case GET_MATERIALS_ERROR:
    return { ...state, materials: [] }
  default:
    return state
  }
}

export default materialsReducer