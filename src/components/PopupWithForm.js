import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = document.querySelector(popupSelector).querySelector('.popup__container');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__field'));
  }

  _getInputValues() {
    const inputValuesObject = Object.fromEntries(this._inputs.map(input => [input.id, input.value]));

    return inputValuesObject;
  }

  setEventListeners() {
    this._form.addEventListener('submit', () => {
      const buffer = this._form.querySelector('.popup__submit').value;
      this._form.querySelector('.popup__submit').value = 'Сохранение...';
      this._submitForm(this._getInputValues())
        .then(() => {
          this._form.querySelector('.popup__submit').value = buffer;
        });
    });
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
