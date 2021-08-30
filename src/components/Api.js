export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _contactTheServer(currentPromise) {
    return currentPromise
      .then(response => {
        if (!response.ok) {
          return Promise.reject(`Ошибка ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        return console.log('Failed connection attempt!');
      })
  }

  getUserInformation() {
    return this._contactTheServer(fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'GET',
    }));
  }

  getCards() {
    return this._contactTheServer(fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'GET',
    }));
  }

  editProfile(newUserInfo) {
    return this._contactTheServer(fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(newUserInfo),
    }));
  }

  addNewCardToServer(newCardInfo) {
    return this._contactTheServer(fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(newCardInfo)
    }));
  }

  deleteCardFromServer(cardId) {
    return this._contactTheServer(fetch(`${this._url}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    }));
  }

  putLike(card, isNotLiked) {
    return this._contactTheServer(fetch(`${this._url}/cards/likes/${card._id}`, {
      headers: this._headers,
      method: isNotLiked ? 'PUT': 'DELETE',
    }));
  }

  updateAvatar(avatar) {
    return this._contactTheServer(fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(avatar)
    }));
  }
}
