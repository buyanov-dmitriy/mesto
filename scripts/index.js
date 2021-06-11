let nameOfAuthor = document.querySelector('.profile__name');
let descriptionOfAuthor = document.querySelector('.profile__description');
const popupOpenButton = document.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');
let popupNameOfAuthor = popup.querySelector('#name');
let popupDescriptionOfAuthor = popup.querySelector('#description');
const popupCloseButton = popup.querySelector('.popup__close');


const openPopup = function() {
  popupNameOfAuthor.value = nameOfAuthor.textContent;
  popupDescriptionOfAuthor.value = descriptionOfAuthor.textContent;

  popup.classList.add('popup_opened');
}

const closePopup = function() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  nameOfAuthor.textContent = popupNameOfAuthor.value;
  descriptionOfAuthor.textContent = popupDescriptionOfAuthor.value;

  closePopup();
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
