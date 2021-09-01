export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
      avatar: this._avatar.src,
      userId: this._userId,
    };

    return userInfo;
  }

  setUserInfo(inputValuesObject) {
    this._nameElement.textContent = inputValuesObject.name;
    this._descriptionElement.textContent = inputValuesObject.description;
    this._avatar.src = inputValuesObject.avatar;
    this._userId = inputValuesObject.userId;
  }
}
