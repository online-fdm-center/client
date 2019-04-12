import { combineReducers } from "redux"
import auth from './auth'
import register from './register'
import materials from './materials'
import threedFiles from './threedfiles'
import products from './products'

export default combineReducers({
  auth,
  materials,
  register,
  threedFiles,
  products
})