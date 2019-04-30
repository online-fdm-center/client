import qs from 'qs'

export class Api {
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

  register = (token, {name, mail, password, address}) => {
    return fetch(`//${Api.apiUrl}/register`, {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        name, mail, password, address
      })
    })
      .then(this.defaultResponseHandler)
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
   * Получение списка качеств с сервера
   * @param {string} token токен авторизации
   * @param {object} filter фильтр
   */
  getQualities = (token, filter) => {
    return fetch(`//${Api.apiUrl}/print-qualities?${qs.stringify({filter})}`, {
      headers: {
        'x-auth-token': token
      }
    })
      .then(this.defaultResponseHandler)
  }

  /**
   * Получение списка материалов с сервера
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

  /**
   * Отправка файла на сервер
   * @param {string} token токен авторизации
   * @param {File} file файл
   */
  sendFile = (token, file) => {
    const formData = new FormData()
    formData.append('file', file)
    return fetch(`//${Api.apiUrl}/files`, {
      headers: {
        'x-auth-token': token,
      },
      method: 'POST',
      body: formData
    })
      .then(this.defaultResponseHandler)
  }

  createProduct = (token, product) => {
    return fetch(`//${Api.apiUrl}/products`, {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(product)
    })
      .then(this.defaultResponseHandler)
  }

  getImage = (token, productId) => {
    return fetch(`//${Api.apiUrl}/products/${productId}/getImage`, {
      headers: {
        'x-auth-token': token
      }
    })
      .then(this.defaultResponseHandler)
  }
  
  getPreliminaryPrice = (token, productId) => {
    return fetch(`//${Api.apiUrl}/products/${productId}/getPreliminaryPrice`, {
      headers: {
        'x-auth-token': token
      }
    })
      .then(this.defaultResponseHandler)
  }
  
  getProduct = (token, id) => {
    return fetch(`//${Api.apiUrl}/products/${id}`, {
      headers: {
        'x-auth-token': token
      },
    })
      .then(this.defaultResponseHandler)
  }

  getProducts = (token, filter) => {
    return fetch(`//${Api.apiUrl}/products?${qs.stringify({filter})}`, {
      headers: {
        'x-auth-token': token
      },
    })
      .then(this.defaultResponseHandler)
  }

  updateProduct = (token, product) => {
    return fetch(`//${Api.apiUrl}/products/${product.id}`, {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(product)
    })
      .then(this.defaultResponseHandler)
  }

  deleteProduct = (token, id) => {
    return fetch(`//${Api.apiUrl}/products/${id}`, {
      headers: {
        'x-auth-token': token
      },
      method: 'DELETE',
    })
      .then(this.defaultResponseHandler)
  }

  setStatusProduct = (token, id, status) => {
    return fetch(`//${Api.apiUrl}/products/${id}/setStatus`, {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({status})
    })
      .then(this.defaultResponseHandler)
  }

}

export default new Api()