import { combineReducers } from "redux"
import auth from './auth'
import register from './register'
import materials from './materials'

export default combineReducers({
  auth,
  materials,
  register
})