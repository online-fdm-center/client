import {
  GET_QUALITIES,
  GET_QUALITIES_ERROR,
  GET_QUALITIES_SUCCESSFUL
} from '../actions/qualities'

const initialState = {
  array: [],
  byId: {}
}

function arrayToObjectById(array){
  const byId = {}
  array.forEach(item => {
    byId[item.id] = item
  })
  return byId
}

function qualitiesReducer(state = initialState, action) {
  switch (action.type) {
  case GET_QUALITIES:
    return initialState
  case GET_QUALITIES_SUCCESSFUL:
    return {
      ...state,
      array: action.qualities,
      byId: arrayToObjectById(action.qualities)
    }
  case GET_QUALITIES_ERROR:
    return initialState
  default:
    return state
  }
}

export default qualitiesReducer