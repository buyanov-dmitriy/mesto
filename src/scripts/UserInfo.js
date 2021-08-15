const popupNameOfAuthor = document.querySelector('#name');
const popupDescriptionOfAuthor = document.querySelector('#description');

export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data[0]);
    this._description = document.querySelector(data[1]);
  }

  getUserInfo() {
    popupNameOfAuthor.value = this._name.textContent;
    popupDescriptionOfAuthor.value = this._description.textContent;
  }

  setUserInfo(inputValues) {
    this._name.textContent = inputValues[0].value;
    this._description.textContent = inputValues[1].value;
  }
}
