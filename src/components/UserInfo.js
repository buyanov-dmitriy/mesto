export default class UserInfo {
  constructor({ name, description }) {
    this._nameElement = document.querySelector(name);
    this._descriptionElement = document.querySelector(description);
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };

    return userInfo;
  }

  setUserInfo(inputValuesObject) {
    this._nameElement.textContent = inputValuesObject.name;
    this._descriptionElement.textContent = inputValuesObject.description;
  }
}
