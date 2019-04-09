import {
  AUTH,
  AUTH_FAILED,
  AUTH_SUCCESS,
  UNLOGIN
} from '../actions/auth'

const initialState = {
  group: 'UNAUTHORIZED'
}

function authReducer(state = initialState, action) {
  switch (action.type) {
  case AUTH_SUCCESS:
    return {...state, ...action.token}
  case AUTH_FAILED:
  case UNLOGIN:
    return initialState
  default:
    return state
  }
}

export default authReducer