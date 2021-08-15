import '../pages/index.css';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const settings = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  inputSection: '.popup__section',
  inputErrorText: '.popup__error',
};
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
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.element-template', handleCardClick);
    const cardElement = card.generateCard();

    cardList.addItem(cardElement, true);
  },
},
'.elements',
);

function createCard(item, cardSelector) {
  const card = new Card(item, cardSelector, handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

function handleCardClick(name, link) {
  const popupViewCard = new PopupWithImage('.popup-view-card', name, link);
  popupViewCard.setEventListeners();
  popupViewCard.open();
}

cardList.renderItems();

const formAuthor = document.querySelector('#form-close-author')
const formEditAuthorValidator = new FormValidator(settings, formAuthor);
const formAddCard = document.querySelector('#form-add-card');
const popupFormAddCardValidator = new FormValidator(settings, formAddCard);
formEditAuthorValidator.enableValidation();
popupFormAddCardValidator.enableValidation();

const newUser = new UserInfo(['.profile__name', '.profile__description']);
function formSubmitHandler(evt, inputValues) {
  newUser.setUserInfo(inputValues);
  popupViewEditor.close();
}
const popupViewEditor = new PopupWithForm('.popup-edit-author', formSubmitHandler);
popupViewEditor.setEventListeners();
const buttonOpenViewEditor = document.querySelector('.profile__edit-button');
buttonOpenViewEditor.addEventListener('click', () => {
  newUser.getUserInfo();
  popupViewEditor.open();
  formEditAuthorValidator.resetValidation();
});

function addNewCard(evt, inputValues) {
  const newItemToArray = {
      name: '',
      link: '',
    };
  newItemToArray.name = inputValues[0].value;
  newItemToArray.link = inputValues[1].value;

  const newCard = createCard(newItemToArray, '.element-template');
  cardList.addItem(newCard, false);

  popupFormAddCardValidator.resetValidation();

  popupNewCard.close();
}
const popupNewCard = new PopupWithForm('.popup-add-card', addNewCard);
popupNewCard.setEventListeners();
const buttonAddNewCard = document.querySelector('.profile__add-button');
buttonAddNewCard.addEventListener('click', () => {
  popupFormAddCardValidator.resetValidation();
  popupNewCard.open();
});
