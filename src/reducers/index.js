import { combineReducers } from "redux"
import auth from './auth'
import materials from './materials'

export default combineReducers({
  auth,
  materials
})