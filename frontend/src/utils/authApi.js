const BASE_URL = 'https://mesto.yandex.students.nomoredomains.work'

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}${'/signup'}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => getResponse(res))
}

export const login = (email, password) => {
  const token = localStorage.getItem('token')
  console.log(token)
  return fetch(`${BASE_URL}${'/signin'}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => getResponse(res))
}

export const getUserData = (token) => {
  return fetch(`${BASE_URL}${'/users/me'}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => getResponse(res))
}
