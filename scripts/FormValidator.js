export default class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._settings = settings;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  _hasInvalidInpiut() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState() {
    if (this._hasInvalidInpiut()) {
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    }
    else {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
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
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    });
  };

  _resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.setAttribute('disabled', true);
  }

  enableValidation() {
    this._formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    })
    this._setInputListeners();
    this._resetValidation();
  }
}
