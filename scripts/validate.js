const hasInvalidInpiut = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (form, inputList, submitButton) => {
  if (hasInvalidInpiut(inputList)) {
    submitButton.classList.add(form.inactiveButtonClass);
    submitButton.setAttribute('disabled', true);
  }
  else {
    submitButton.classList.remove(form.inactiveButtonClass);
    submitButton.removeAttribute('disabled'), false;
  }
};

const hideInputError = (form, inputElement) => {
  const errorElement = inputElement.closest('.popup__section').querySelector('.popup__error');

  inputElement.classList.remove(form.inputErrorClass);
  errorElement.classList.remove(form.errorClass);
  errorElement.textContent = '';
};

const showInputError = (form, inputElement, validationMessage) => {
  const errorElement = inputElement.closest('.popup__section').querySelector('.popup__error');

  inputElement.classList.add(form.inputErrorClass);
  errorElement.textContent = validationMessage;
  errorElement.classList.add(form.errorClass);
};

const checkInputValidity = (form, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(form, inputElement, inputElement.validationMessage);
  }
  else {
    hideInputError(form, inputElement);
  }
};

const setInputListeners = (form, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(form.inputSelector));
  const submitButton = formElement.querySelector(form.submitButtonSelector);

  toggleButtonState(form, inputList, submitButton);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(form, inputElement);
      toggleButtonState(form, inputList, submitButton);
    });
  });
};

const enableValidation = form => {
  const formList = Array.from(document.querySelectorAll(form.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setInputListeners(form, formElement);
  })
};

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});
