import api from '../api'
import afterAuth from './afterAuth'

export const FILE_UPLOAD = 'FILE_UPLOAD'
export const FILE_UPLOAD_SUCCESSFUL = 'FILE_UPLOAD_SUCCESSFUL'
export const FILE_UPLOAD_FAILED = 'FILE_UPLOAD_FAILED'

export const PRODUCT_CREATE = 'PRODUCT_CREATE'
export const PRODUCT_CREATE_SUCCESSFUL = 'PRODUCT_CREATE_SUCCESSFUL'
export const PRODUCT_CREATE_FAILED = 'PRODUCT_CREATE_FAILED'

export const createProduct = (file, history) => {
  return (dispatch, getState) => {
    const authState = getState().auth
    dispatch({type: FILE_UPLOAD, file})
    api.sendFile(authState.token, file)
      .then(createdFile => {
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
        dispatch({type: PRODUCT_CREATE_SUCCESSFUL, product: createdProduct})
        history.push(`/products/${createdProduct.id}`)
        dispatch(getPreliminaryPrice(createdProduct.id))
        dispatch(getRender(createdProduct.id))
      })
      .catch(error => {
        console.error(error)
        dispatch({type: PRODUCT_CREATE_FAILED, error})
        return Promise.reject(error)
      })
      .catch()
  }
}

export const GET_PRELIMINATYPRICE = 'GET_PRELIMINATYPRICE'
export const GET_PRELIMINATYPRICE_SUCCESSFUL = 'GET_PRELIMINATYPRICE_SUCCESSFUL'
export const GET_PRELIMINATYPRICE_FAILED = 'GET_PRELIMINATYPRICE_FAILED'

export const getPreliminaryPrice = (id) => {
  return (dispatch, getState) => {
    const authState = getState().auth
    dispatch({type: GET_PRELIMINATYPRICE})
    api.getPreliminaryPrice(authState.token, id)
      .then(answer => {
        if (answer.preliminaryPrice){
          dispatch({
            type: GET_PRELIMINATYPRICE_SUCCESSFUL,
            productId: id,
            preliminaryPrice: answer.preliminaryPrice
          })
        } else {
          setTimeout(() => dispatch(getPreliminaryPrice(id)), 3000)
        }
        
      })
      .catch(error => {
        console.error(error)
        dispatch({type: GET_PRELIMINATYPRICE_FAILED})
      })
  }
}

export const GET_RENDER = 'GET_RENDER'
export const GET_RENDER_SUCCESSFUL = 'GET_RENDER_SUCCESSFUL'
export const GET_RENDER_FAILED = 'GET_RENDER_FAILED'

export const getRender = (id) => {
  return (dispatch, getState) => {
    const authState = getState().auth
    dispatch({type: GET_RENDER})
    api.getImage(authState.token, id)
      .then(answer => {
        if (answer.image){
          dispatch({
            type: GET_RENDER_SUCCESSFUL,
            productId: id,
            render: answer.image
          })
          if(answer.image === 'error.png'){
            setTimeout(() => dispatch(getRender(id)), 3000)
          }
        } else {
          setTimeout(() => dispatch(getRender(id)), 3000)
        }
        
      })
      .catch(error => {
        console.error(error)
        dispatch({type: GET_RENDER_FAILED})
      })
  }
}

export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCTS_SUCCESSFUL = 'GET_PRODUCTS_SUCCESSFUL'
export const GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED'

export const getProduct = (id) => {
  return (dispatch, getState) => {
    const authState = getState().auth
    if (!authState.token){
      afterAuth.push(getProduct.bind(this, id))
      return 
    }
    dispatch({type: GET_PRODUCTS})
    api.getProduct(authState.token, id)
      .then(product => {
        console.log(product)
        dispatch({type: GET_PRODUCTS_SUCCESSFUL, products: [product]})
        dispatch(getPreliminaryPrice(product.id))
        dispatch(getRender(product.id))
      })
      .catch(error => {
        console.error(error)
        dispatch({type: GET_PRODUCTS_FAILED, error})
      })
  }
}

export const PRODUCT_EVENT = 'PRODUCT_EVENT'

export const getProductEvent = (id) => {
  return (dispatch, getState) => {
    const {auth, products} = getState()
    console.log('product status', products.byId[id] && products.byId[id].status)
    if (!products.byId[id] || (products.byId[id].status !== 'WAITING_FOR_PROCESSING' && products.byId[id].status !== 'PROCESSING')){
      return
    }
    console.log('product status3', products.byId[id] && products.byId[id].status)
    api.getEvent(auth.token, id)
      .then(progressEvent => {
        console.log('progressEvent', progressEvent)
        if (progressEvent === null){
          dispatch(getProductEvent(id))
        } else {
          dispatch({type: PRODUCT_EVENT, id, ...progressEvent})
          if (progressEvent.progress !== 1){
            dispatch(getProductEvent(id))
          }
          if (progressEvent.progress > 0.9){
            dispatch(getProduct(id))
          }
        }
      })
  }
}

export const GET_MY_PRODUCTS_SUCCESSFUL = 'GET_MY_PRODUCTS_SUCCESSFUL'

export const getMyProducts = () => {
  return (dispatch, getState) => {
    const authState = getState().auth
    if (!authState.token){
      afterAuth.push(getMyProducts.bind(this))
      return 
    }
    dispatch({type: GET_PRODUCTS})
    api.getProducts(authState.token, {where: {userId: authState.id}})
      .then(products => {
        console.log(products)
        products.forEach(product => dispatch(getPreliminaryPrice(product.id)))
        dispatch({type: GET_PRODUCTS_SUCCESSFUL, products: products})
        dispatch({type: GET_MY_PRODUCTS_SUCCESSFUL, products: products.map(product => product.id)})
      })
      .catch(error => {
        console.error(error)
        dispatch({type: GET_PRODUCTS_FAILED, error})
      })
  }
}

export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const UPDATE_PRODUCT_SUCCESSFUL = 'UPDATE_PRODUCT_SUCCESSFUL'
export const UPDATE_PRODUCT_FAILED = 'UPDATE_PRODUCT_FAILED'

export const updateProduct = (product) => {
  return (dispatch, getState) => {
    const authState = getState().auth
    dispatch({type: UPDATE_PRODUCT, product})
    api.updateProduct(authState.token, product)
      .then(() => {
        dispatch({type: UPDATE_PRODUCT_SUCCESSFUL, product})
        dispatch(getProduct(product.id))
      })
      .catch(error => {
        console.error(error)
        dispatch({type: UPDATE_PRODUCT_FAILED, error})
      })
  }
}

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const DELETE_PRODUCT_SUCCESSFUL = 'DELETE_PRODUCT_SUCCESSFUL'
export const DELETE_PRODUCT_FAILED = 'DELETE_PRODUCT_FAILED'

export const deleteProduct = (id) => {
  return (dispatch, getState) => {
    const authState = getState().auth
    dispatch({type: DELETE_PRODUCT, id})
    api.deleteProduct(authState.token, id)
      .then(() => {
        dispatch({type: DELETE_PRODUCT_SUCCESSFUL, id})
        dispatch(getMyProducts())
      })
      .catch(error => {
        console.error(error)
        dispatch({type: DELETE_PRODUCT_FAILED, error})
      })    
  }
}

export const SETSTATUS_PRODUCT = 'SETSTATUS_PRODUCT'
export const SETSTATUS_PRODUCT_SUCCESSFUL = 'SETSTATUS_PRODUCT_SUCCESSFUL'
export const SETSTATUS_PRODUCT_FAILED = 'SETSTATUS_PRODUCT_FAILED'

export const setStatusProduct = (id, status) => {
  return (dispatch, getState) => {
    const authState = getState().auth
    dispatch({type: SETSTATUS_PRODUCT, id})
    api.setStatusProduct(authState.token, id, status)
      .then(() => {
        dispatch({type: SETSTATUS_PRODUCT_SUCCESSFUL, id})
        dispatch(getProduct(id))
      })
      .catch(error => {
        console.error(error)
        dispatch({type: SETSTATUS_PRODUCT_FAILED, error})
      })    
  }
}