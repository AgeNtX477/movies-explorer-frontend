class AuthApi {
  constructor ({ baseUrl }) {
    this._baseUrl = baseUrl
  }

  _checkResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  signUp (name, email, password) {
    // регистрация пользователя
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then(this._checkResponse)
  }

  signIn (email, password) {
    // авторизация(логин) пользователя
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(this._checkResponse)
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token)
          return data
        }
      })
  }

  checkToken (jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    })
      .then(this._checkResponse)
      .then(data => {
        return data
      })
  }
}

const authApi = new AuthApi({
  baseUrl: 'https://api.agentx.explorer.nomoredomains.club'
})

export default authApi
