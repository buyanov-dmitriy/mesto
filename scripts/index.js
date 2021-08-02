import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const settings = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  inputSection: '.popup__section',
  inputErrorText: '.popup__error',
};
const cardTable = document.querySelector('.elements');
const buttonOpenViewEditor = document.querySelector('.profile__edit-button');
const popupViewEditor = document.querySelector('#popup-edit-author');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('#popup-add-card');
const popups = document.querySelectorAll('.popup');
const nameOfAuthor = document.querySelector('.profile__name');
const descriptionOfAuthor = document.querySelector('.profile__description');
const popupNameOfAuthor = popupViewEditor.querySelector('#name');
const popupDescriptionOfAuthor = popupViewEditor.querySelector('#description');
const formEditAuthor = popupViewEditor.querySelector('.popup__container');
const formEditAuthorValidator = new FormValidator(settings, formEditAuthor);
const popupFormAddCard = popupNewCard.querySelector('.popup__container');
const popupFormAddCardValidator = new FormValidator(settings, popupFormAddCard);
const popupAddCardPlace = popupFormAddCard.querySelector('#place');
const popupAddCardLink = popupFormAddCard.querySelector('#link');
const popupViewCard = document.querySelector('#popup-view-card');
const imageViewCard = popupViewCard.querySelector('.popup__image');
const captionViewcard = popupViewCard.querySelector('.popup__caption');

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closeByEscape);
}

function openPopupEditAuthor() {
  popupNameOfAuthor.value = nameOfAuthor.textContent;
  popupDescriptionOfAuthor.value = descriptionOfAuthor.textContent;
}

function formSubmitHandler(evt) {

  nameOfAuthor.textContent = popupNameOfAuthor.value;
  descriptionOfAuthor.textContent = popupDescriptionOfAuthor.value;

  closePopup(popupViewEditor);
}

function createCard(item, cardSelector) {
  const card = new Card(item, cardSelector, handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

function addNewCard(evt) {
  const newItemToArray = {
      name: '',
      link: '',
    };
  newItemToArray.name = popupAddCardPlace.value;
  newItemToArray.link = popupAddCardLink.value;

  cardTable.prepend(createCard(newItemToArray, '.element-template'));
  popupFormAddCard.reset();
  popupFormAddCardValidator.resetValidation();

  closePopup(popupNewCard);
}

function handleCardClick(name, link) {
  imageViewCard.src = link;
  imageViewCard.alt = name;
  captionViewcard.textContent = name;
  openPopup(popupViewCard);
}



initialCards.forEach((item) => {
  cardTable.append(createCard(item, '.element-template'));
})

popups.forEach(popup => {
  popup.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
})

buttonOpenViewEditor.addEventListener('click', () => {
  openPopupEditAuthor();
  openPopup(popupViewEditor);
  formEditAuthorValidator.resetValidation();
});

buttonAddNewCard.addEventListener('click', () => {
  openPopup(popupNewCard);
  //popupFormAddCard.reset();
  //popupFormAddCardValidator.resetValidation();
});

formEditAuthor.addEventListener('submit', formSubmitHandler);

popupFormAddCard.addEventListener('submit', addNewCard);

formEditAuthorValidator.enableValidation();
popupFormAddCardValidator.enableValidation();
