import api from '../api'

export const AUTH = 'AUTH'
export const AUTH_FAILED = 'AUTH_FAILED'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'

export const tempAuth = () => {
  return (dispatch) => {
    dispatch({type: AUTH})
    let token
    api.temporaryRegister()
      .then(answer => {
        token = answer
        return api.getUser(answer.token, answer.userId)
      })
      .then(user => {
        token = {
          ...token,
          ...user
        }
        console.log(token)
        localStorage.setItem('token', JSON.stringify(token))
        dispatch({type: AUTH_SUCCESS, token})
      })
      .catch(error => {
        console.error(error)
        dispatch({type: AUTH_FAILED, error})
      })
  }
}

export const login = (mailPass) => {
  return (dispatch, getState) => {
    dispatch({type: AUTH})
    const authState = getState().auth
    let token
    api.auth(authState.token, mailPass)
      .then(answer => {
        token = answer
        return api.getUser(answer.token, answer.userId)
      })
      .then(user => {
        token = {
          ...token, 
          ...user
        }
        console.log(token)
        localStorage.setItem('token', JSON.stringify(token))
        dispatch({type: AUTH_SUCCESS, token})
      })
      .catch(error => {
        console.error(error)
        dispatch({type: AUTH_FAILED, error})
      })
  }
}

export const UNLOGIN = 'UNLOGIN'

export const unlogin = () => {
  return (dispatch) => {
    localStorage.removeItem('token')
    dispatch({type: UNLOGIN})
    dispatch(tempAuth())
  }
}

export const initAuth = () => {
  return (dispatch) => {
    const localStorageTokenStringified = localStorage.getItem('token')
    if (!localStorageTokenStringified){
      dispatch(tempAuth())
      return
    }
    try{
      const localStorageToken = JSON.parse(localStorageTokenStringified)
      api.getUser(localStorageToken.token, localStorageToken.id)
        .then(user => {
          if (localStorageToken.group === user.group){
            dispatch({type: AUTH_SUCCESS, token: localStorageToken})
          } else {
            console.warn('localstorage token не валиден', localStorageToken, user)
            dispatch(unlogin())
          }
        })
    } catch (e) {
      console.error(e)
      dispatch(unlogin())
      return
    }
    
  }
}

export const REGISTER = 'REGISTER'
export const REGISTER_FAILED = 'REGISTER_FAILED'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'

export const register = (user, history) => {
  return (dispatch, getState) => {
    const authState = getState().auth
    dispatch({type: REGISTER})
    api.register(authState.token, user)
      .then(user => {
        dispatch({type: REGISTER_SUCCESS}, user)
        history.push('/')
      })
      .catch(error => {
        console.error(error)
        dispatch({type: REGISTER_FAILED, error})
      })
  }
}