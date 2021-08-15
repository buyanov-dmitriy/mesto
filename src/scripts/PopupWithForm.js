import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = document.querySelector(popupSelector).querySelector('.popup__container');
  }

  _getInputValues() {
    const inputValues = Array.from(this._form.querySelectorAll('.popup__field'));

    return inputValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      this._submitForm(evt, this._getInputValues())
    });
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
