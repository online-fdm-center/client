import {
  PRODUCT_CREATE,
  PRODUCT_CREATE_FAILED,
  PRODUCT_CREATE_SUCCESSFUL,
  GET_PRODUCTS_SUCCESSFUL,
  GET_PRELIMINATYPRICE_SUCCESSFUL,
  GET_RENDER_SUCCESSFUL,
  GET_MY_PRODUCTS_SUCCESSFUL,
  PRODUCT_EVENT,
} from '../actions/products'

const initialState = {
  byId: {},
  preliminaryPrices: {},
  renders: {},
  myProducts: []
}

function arrayToObjectById(array){
  const byId = {}
  array.forEach(item => {
    byId[item.id] = item
  })
  return byId
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
  case GET_PRODUCTS_SUCCESSFUL:
    return {
      ...state,
      byId: {
        ...state.byId,
        ...arrayToObjectById(action.products)
      }
    }
  case GET_MY_PRODUCTS_SUCCESSFUL:
    return {
      ...state,
      myProducts: action.products
    }
  case GET_PRELIMINATYPRICE_SUCCESSFUL:
    return {
      ...state,
      preliminaryPrices: {
        ...state.preliminaryPrices,
        [action.productId]: action.preliminaryPrice
      }
    }
  case GET_RENDER_SUCCESSFUL:
    return {
      ...state, 
      renders: {
        ...state.renders,
        [action.productId]: action.render
      }
    }
  case PRODUCT_EVENT:
    return {
      ...state,
      byId: {
        ...state.byId,
        [action.id]: {
          ...state.byId[action.id],
          status: state.byId[action.id].status === "WAITING_FOR_PROCESSING" ? "PROCESSING" : state.byId[action.id].status,
          progress: action.progress,
          progressText: action.text,
          progressError: action.error
        }
      }
    }
  default:
    return state
  }
}

export default productsReducer