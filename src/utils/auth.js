export const BASE_URL = 'https://auth.nomoreparties.co';

function resultStatus(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(res.status)
}

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  })
  .then(resultStatus)
}

export function login(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  })
  .then(resultStatus)
}

export function checkToken(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${jwt}`
    }
  })
  .then(resultStatus)
}
