import { combineReducers } from "redux"
import auth from './auth'
import alerts from './alerts'
import register from './register'
import materials from './materials'
import threedFiles from './threedfiles'
import products from './products'

export default combineReducers({
  auth,
  alerts,
  materials,
  register,
  threedFiles,
  products
})