import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__container');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__field'));
    this._submitButton = this._form.querySelector('.popup__submit');
    this._submitButtonValue = this._submitButton.value;
  }

  _getInputValues() {
    const inputValuesObject = Object.fromEntries(this._inputs.map(input => [input.id, input.value]));

    return inputValuesObject;
  }

  setEventListeners() {
    this._form.addEventListener('submit', () => {
      this._submitButton.value = 'Сохранение...';
      this._submitForm(this._getInputValues())
        .finally(() => {
          this._form.querySelector('.popup__submit').value = this._submitButtonValue;
        });
    });
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
