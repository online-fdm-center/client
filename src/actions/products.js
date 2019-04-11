import api from '../api'

export const FILE_UPLOAD = 'FILE_UPLOAD'
export const FILE_UPLOAD_SUCCESSFUL = 'FILE_UPLOAD_SUCCESSFUL'
export const FILE_UPLOAD_FAILED = 'FILE_UPLOAD_FAILED'

export const sendFile = (file) => {
  return (dispatch, getState) => {
    const authState = getState().auth
    dispatch({type: FILE_UPLOAD, file})
    api.sendFile(authState.token, file)
      .then(createdFile => {
        console.log(createdFile)
        dispatch({type: FILE_UPLOAD_SUCCESSFUL, file: createdFile})
      })
      .catch(error => {
        console.error(error)
        dispatch({type: FILE_UPLOAD_FAILED, error})
      })
  }
}