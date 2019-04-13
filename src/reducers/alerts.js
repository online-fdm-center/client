import omit from 'lodash/omit'

import { DELETE_ALERT } from '../actions/alerts'
import {
  AUTH_FAILED,
  AUTH_SUCCESS,
} from '../actions/auth'
import {
  FILE_UPLOAD_SUCCESSFUL,
  FILE_UPLOAD_FAILED,
  PRODUCT_CREATE_SUCCESSFUL,
  PRODUCT_CREATE_FAILED,
  UPDATE_PRODUCT_SUCCESSFUL,
  UPDATE_PRODUCT_FAILED,
  GET_PRODUCTS_SUCCESSFUL,
  GET_PRODUCTS_FAILED
} from '../actions/products'

const initialState = {
  byTimeStamp: {}
}

function addAlertReducer(state, variant, text, closeAfter){
  const id = Date.now()
  return {
    ...state,
    byTimeStamp: {
      ...state.byTimeStamp,
      [id]: {
        id,
        variant,
        text,
        closeAfter
      }
    }
  }
}

function alertsReducer(state = initialState, action) {
  switch (action.type) {
  case DELETE_ALERT:
    return {...state, byTimeStamp: omit(state.byTimeStamp, [action.id])}
  case AUTH_SUCCESS: return addAlertReducer(state, 'success', 'Авторизован на сервере', 500)
  case AUTH_FAILED: return addAlertReducer(state, 'danger', 'Ошибка авторизации', 1000)
  case FILE_UPLOAD_SUCCESSFUL: return addAlertReducer(state, 'success', 'Файл загружен', 1000)
  case FILE_UPLOAD_FAILED: return addAlertReducer(state, 'danger', 'Ошибка загрузки файла', 1000)
  case PRODUCT_CREATE_SUCCESSFUL: return addAlertReducer(state, 'success', 'Изделие создано', 1000)
  case PRODUCT_CREATE_FAILED: return addAlertReducer(state, 'danger', 'Ошибка создания изделия', 1000)
  case UPDATE_PRODUCT_SUCCESSFUL: return addAlertReducer(state, 'success', 'Изделие обновлено', 1000)
  case UPDATE_PRODUCT_FAILED: return addAlertReducer(state, 'danger', 'Ошибка обновления изделия', 1000)
  case GET_PRODUCTS_FAILED: return addAlertReducer(state, 'danger', 'Ошибка загрузки изделия', 2000)
  default:
    return state
  }
}

export default alertsReducer