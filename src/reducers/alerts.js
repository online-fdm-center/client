import omit from 'lodash/omit'

import { DELETE_ALERT } from '../actions/alerts'

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
  default:
    return state
  }
}

export default alertsReducer