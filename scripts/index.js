let NameOfAuthor = document.querySelector('.profile__name');
let DescriptionOfAuthor = document.querySelector('.profile__description');
const PopupOpenButton = document.querySelector('.profile__edit-button');

let Popup = document.querySelector('.popup');
let formElement = Popup.querySelector('.popup__container');
let PopupNameOfAuthor = Popup.querySelector('.popup__name-of-author');
let PopupDescriptionOfAuthor = Popup.querySelector('.popup__description-of-author');
const PopupCloseButton = Popup.querySelector('.popup__close');


const OpenPopup = function() {
  Popup.classList.add('popup_active');
}

const ClosePopup = function() {
  Popup.classList.remove('popup_active');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  NameOfAuthor.textContent = PopupNameOfAuthor.value;
  DescriptionOfAuthor.textContent = PopupDescriptionOfAuthor.value;

  ClosePopup();
}

PopupOpenButton.addEventListener('click', OpenPopup);
PopupCloseButton.addEventListener('click', ClosePopup);

PopupNameOfAuthor.value = NameOfAuthor.textContent;
PopupDescriptionOfAuthor.value = DescriptionOfAuthor.textContent;

formElement.addEventListener('submit', formSubmitHandler);
