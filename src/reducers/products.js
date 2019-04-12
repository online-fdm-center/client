import {
  PRODUCT_CREATE,
  PRODUCT_CREATE_FAILED,
  PRODUCT_CREATE_SUCCESSFUL
} from '../actions/products'

const initialState = {
  byId: {}
}

function productsReducer(state = initialState, action) {
  switch (action.type) {
  case PRODUCT_CREATE:
    return {
      ...state,
      byId: {
        ...state.byId,
        creating: {
          ...action.product,
          status: PRODUCT_CREATE
        }
      }
    }
  case PRODUCT_CREATE_FAILED:
    return {
      ...state,
      byId: {
        ...state.byId,
        creating: {
          status: PRODUCT_CREATE_FAILED
        }
      }
    }
  case PRODUCT_CREATE_SUCCESSFUL:
    return {
      ...state,
      byId: {
        ...state.byId,
        uploading: null,
        [action.product.id]: {
          ...action.product,
        }
      }
    }
  default:
    return state
  }
}

export default productsReducer