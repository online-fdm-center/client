import {
  REGISTER,
  REGISTER_FAILED,
  REGISTER_SUCCESS
} from '../actions/auth'

const initialState = {
  status: null
}

function registerReducer(state = initialState, action) {
  switch (action.type) {
  case REGISTER:
    return initialState
  case REGISTER_SUCCESS:
    return initialState
  case REGISTER_FAILED:
    return {...state, status: REGISTER_FAILED}
  default:
    return state
  }
}

export default registerReducer