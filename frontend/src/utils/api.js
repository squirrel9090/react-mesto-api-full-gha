class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _getHeaders() {
    const token = localStorage.getItem('token')
    return {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    }
  }

  _getJson(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  getCard() {
    const token = localStorage.getItem('token')
    return fetch(`${this._baseUrl}${'/cards'}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._getJson)
  }
  getCurrentUser() {
    const token = localStorage.getItem('token')
    return fetch(`${this._baseUrl}${'/users/me'}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._getJson)
  }

  postCardToServer(name, link) {
    const token = localStorage.getItem('token')
    return fetch(`${this._baseUrl}${'/cards'}`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._getJson)
  }

  getUserData() {
    const token = localStorage.getItem('token')
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._getJson)
  }

  patchUserData(name, about) {
    const token = localStorage.getItem('token')
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._getJson)
  }

  putLikeToCard(cardId) {
    const token = localStorage.getItem('token')
    return fetch(`${this._baseUrl}/cards/${cardId}/likes/`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._getJson)
  }

  deleteLikeFromCard(cardId) {
    const token = localStorage.getItem('token')
    return fetch(`${this._baseUrl}/cards/${cardId}/likes/`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._getJson)
  }

  //метод обновления аватара пользователя
  changeAvatar({ avatar }) {
    const token = localStorage.getItem('token')
    return fetch(`${this._baseUrl}${'/users/me/avatar'}`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ avatar }),
    }).then(this._getJson)
  }

  //удалить карточку
  deleteCard(cardId) {
    const token = localStorage.getItem('token')
    return fetch(`${this._baseUrl}${'/cards/'}${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._getJson)
  }
}

//экземпляр класса апи для работы с запросами на сервер
const api = new Api({
  baseUrl: 'https://mesto.yandex.students.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json',
  },
})
export default api
