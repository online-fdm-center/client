import qs from 'qs'

class Api {
  // eslint-disable-next-line no-undef
  static apiUrl = API_URL

  /**
   * Стандартный обработчик ответа от сервера
   * @param {*} response 
   */
  defaultResponseHandler(response){
    if (response.ok){
      return (response.status === 204)
        ? null
        : response.json()
    } else{
      return Promise.reject(new Error(response.statusText))
    }
  }

  temporaryRegister = () => {
    return fetch(`//${Api.apiUrl}/temporaryRegister`, {
      method: 'POST'
    })
      .then(this.defaultResponseHandler)
  }

  auth = (token, mailPass) => {
    return fetch(`//${Api.apiUrl}/auth`, {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(mailPass)
    })
      .then(this.defaultResponseHandler)
  }

  /**
   * Получение пользователя с сервера по id
   * @param {string} token токен авторизации
   * @param {number} id id пользователя
   */
  getUser = (token, id) => {
    return fetch(`//${Api.apiUrl}/users/${id}`, {
      headers: {
        'x-auth-token': token
      }
    })
      .then(this.defaultResponseHandler)
  }

  /**
   * Получение списка пользователей с сервера
   * @param {string} token токен авторизации
   * @param {object} filter фильтр
   */
  getUsers = (token, filter) => {
    return fetch(`//${Api.apiUrl}/users?${qs.stringify({filter})}`, {
      headers: {
        'x-admin-token': token
      }
    })
      .then(this.defaultResponseHandler)
  }

  /**
   * Создание пользователя
   * @param {string} token токен авторизации
   * @param {object} user пользователь
   */
  createUser = (token, user) => {
    return fetch(`//${Api.apiUrl}/users`, {
      headers: {
        'x-admin-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
      method: 'POST'
    })
      .then(this.defaultResponseHandler)
  }

  /**
   * Изменение пользователя
   * @param {string} token токен авторизации
   * @param {object} user id пользователя
   */
  updateUser = (token, user) => {
    return fetch(`//${Api.apiUrl}/users/${user.id}`, {
      headers: {
        'x-admin-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
      method: 'PATCH'
    })
      .then(this.defaultResponseHandler)
  }

  /**
   * Удаление пользователя
   * @param {string} token токен авторизации
   * @param {number} id id пользователя
   */
  deleteUser = (token, id) => {
    return fetch(`//${Api.apiUrl}/users/${id}`, {
      headers: {
        'x-admin-token': token,
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    })
      .then(this.defaultResponseHandler)
  }

  /**
   * Получение списка пользователей с сервера
   * @param {string} token токен авторизации
   * @param {object} filter фильтр
   */
  getMaterials = (token, filter) => {
    return fetch(`//${Api.apiUrl}/materials?${qs.stringify({filter})}`, {
      headers: {
        'x-auth-token': token
      }
    })
      .then(this.defaultResponseHandler)
  }

  /**
   * Создание пользователя
   * @param {string} token токен авторизации
   * @param {object} user пользователь
   */
  createMaterial = (token, user) => {
    return fetch(`//${Api.apiUrl}/materials`, {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
      method: 'POST'
    })
      .then(this.defaultResponseHandler)
  }

  /**
   * Изменение пользователя
   * @param {string} token токен авторизации
   * @param {object} user id пользователя
   */
  updateMaterial = (token, user) => {
    return fetch(`//${Api.apiUrl}/materials/${user.id}`, {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
      method: 'PATCH'
    })
      .then(this.defaultResponseHandler)
  }

  /**
   * Удаление пользователя
   * @param {string} token токен авторизации
   * @param {number} id id пользователя
   */
  deleteMaterial = (token, id) => {
    return fetch(`//${Api.apiUrl}/materials/${id}`, {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    })
      .then(this.defaultResponseHandler)
  }
  
}

export default new Api()