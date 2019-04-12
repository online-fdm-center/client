import {
  FILE_UPLOAD,
  FILE_UPLOAD_FAILED,
  FILE_UPLOAD_SUCCESSFUL
} from '../actions/products'

const initialState = {
  byId: {}
}

function threedfilesReducer(state = initialState, action) {
  switch (action.type) {
  case FILE_UPLOAD:
    return {
      ...state,
      byId: {
        ...state.byId,
        uploading: {
          ...action.file,
          status: FILE_UPLOAD
        }
      }
    }
  case FILE_UPLOAD_FAILED:
    return {
      ...state,
      byId: {
        ...state.byId,
        uploading: {
          status: FILE_UPLOAD_FAILED
        }
      }
    }
  case FILE_UPLOAD_SUCCESSFUL:
    return {
      ...state,
      byId: {
        ...state.byId,
        uploading: null,
        [action.file.id]: {
          ...action.file,
        }
      }
    }
  default:
    return state
  }
}

export default threedfilesReducer