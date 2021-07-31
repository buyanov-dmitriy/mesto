export default class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._settings = settings;
  }

  _hasInvalidInpiut(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState(inputList, submitButton) {
    if (this._hasInvalidInpiut(inputList)) {
      submitButton.classList.add(this._settings.inactiveButtonClass);
      submitButton.setAttribute('disabled', true);
    }
    else {
      submitButton.classList.remove(this._settings.inactiveButtonClass);
      submitButton.removeAttribute('disabled');
    }
  };

  _hideInputError(inputElement) {
    const errorElement = inputElement.closest(this._settings.inputSection).querySelector(this._settings.inputErrorText);

    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  };

  _showInputError(inputElement, validationMessage) {
    const errorElement = inputElement.closest(this._settings.inputSection).querySelector(this._settings.inputErrorText);

    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(this._settings.errorClass);
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
    else {
      this._hideInputError(inputElement);
    }
  };

  _setInputListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    const submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);

    this._toggleButtonState(inputList, submitButton);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, submitButton);
      })
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    })
    this._setInputListeners();
  }
}
