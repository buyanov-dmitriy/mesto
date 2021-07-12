const hasInvalidInpiut = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (settings, inputList, submitButton) => {
  if (hasInvalidInpiut(inputList)) {
    submitButton.classList.add(settings.inactiveButtonClass);
    submitButton.setAttribute('disabled', true);
  }
  else {
    submitButton.classList.remove(settings.inactiveButtonClass);
    submitButton.removeAttribute('disabled'), false;
  }
};

const hideInputError = (settings, inputElement) => {
  const errorElement = inputElement.closest(settings.inputSection).querySelector(settings.inputErrorText);

  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

const showInputError = (settings, inputElement, validationMessage) => {
  const errorElement = inputElement.closest(settings.inputSection).querySelector(settings.inputErrorText);

  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = validationMessage;
  errorElement.classList.add(settings.errorClass);
};

const checkInputValidity = (settings, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(settings, inputElement, inputElement.validationMessage);
  }
  else {
    hideInputError(settings, inputElement);
  }
};

const setInputListeners = (settings, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const submitButton = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(settings, inputList, submitButton);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(settings, inputElement);
      toggleButtonState(settings, inputList, submitButton);
    });
  });
};

const enableValidation = settings => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setInputListeners(settings, formElement);
  })
};

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  inputSection: '.popup__section',
  inputErrorText: '.popup__error',
});
