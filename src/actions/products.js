import api from '../api'

export const FILE_UPLOAD = 'FILE_UPLOAD'
export const FILE_UPLOAD_SUCCESSFUL = 'FILE_UPLOAD_SUCCESSFUL'
export const FILE_UPLOAD_FAILED = 'FILE_UPLOAD_FAILED'

export const PRODUCT_CREATE = 'PRODUCT_CREATE'
export const PRODUCT_CREATE_SUCCESSFUL = 'PRODUCT_CREATE_SUCCESSFUL'
export const PRODUCT_CREATE_FAILED = 'PRODUCT_CREATE_FAILED'

export const createProduct = (file) => {
  return (dispatch, getState) => {
    const authState = getState().auth
    dispatch({type: FILE_UPLOAD, file})
    api.sendFile(authState.token, file)
      .then(createdFile => {
        console.log(createdFile)
        dispatch({type: FILE_UPLOAD_SUCCESSFUL, file: createdFile})
        return createdFile
      })
      .catch(error => {
        console.error(error)
        dispatch({type: FILE_UPLOAD_FAILED, error})
        return Promise.reject(error)
      })
      .then(createdFile => {
        const newProduct = {
          userId: authState.userId,
          fileId: createdFile.id,
          count: 1,
          name: createdFile.originalName || createdFile.filename
        }
        dispatch({type: PRODUCT_CREATE, product: newProduct})
        return api.createProduct(authState.token, newProduct)
      })
      .then(createdProduct => {
        console.log(createdProduct)
        dispatch({type: PRODUCT_CREATE_SUCCESSFUL, product: createdProduct})
      })
      .catch(error => {
        console.error(error)
        dispatch({type: PRODUCT_CREATE_FAILED, error})
        return Promise.reject(error)
      })
      .catch()
  }
}