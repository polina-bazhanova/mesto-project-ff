const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-27/',
  headers: {
    authorization: 'ba944b24-1c04-4e3b-b14e-573939f5a617',
    'Content-Type': 'application/json'
  }
}

const getUserInfo = () => {
  return fetch(`${apiConfig.baseUrl}users/me`, {
    method: 'GET',
    headers: apiConfig.headers,
  }).then(resp => resp.json())
}

const editUserInfo = (name, about) => {
  return fetch(`${apiConfig.baseUrl}users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  }).then(resp => resp.json())
}

const editUserAvatar = (link) => {
  return fetch(`${apiConfig.baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: link,
    })
  }).then(resp => resp.json())
}

const getCards = () => {
  return fetch(`${apiConfig.baseUrl}cards`, {
    method: 'GET',
    headers: apiConfig.headers,
  }).then(resp => resp.json())
}

const addNewCard = (name, link) => {
  return fetch(`${apiConfig.baseUrl}cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  }).then(resp => resp.json())
}

const deleteCard = (id) => {
  return fetch(`${apiConfig.baseUrl}cards/${id}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  }).then(resp => resp.json())
}

const likeCard = (id, isLiked) => {
  return fetch(`${apiConfig.baseUrl}cards/likes/${id}`, {
    method: isLiked? 'DELETE': 'PUT',
    headers: apiConfig.headers,
  }).then(resp => resp.json())
}

export { getUserInfo, getCards, editUserInfo, addNewCard, deleteCard, likeCard, editUserAvatar };

