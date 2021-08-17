import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = document.querySelector(popupSelector).querySelector('.popup__container');
  }

  _getInputValues() {
    const inputValues = Array.from(this._form.querySelectorAll('.popup__field'));
    const inputValuesObject = Object.fromEntries(inputValues.map(input => [input.id, input.value]));

    return inputValuesObject;
  }

  setEventListeners() {
    this._form.addEventListener('submit', () => {
      this._submitForm(this._getInputValues())
    });
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
