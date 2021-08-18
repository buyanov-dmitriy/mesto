import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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

function addCardToPage(card) {
  const newCard = createCard(card, '.element-template', '.element-template__element');
  cardList.addItem(newCard);
}

const cardList = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    addCardToPage(item)
  },
},
'.elements',
);

function createCard(item, templateSelector, cardSelector) {
  const card = new Card(item, templateSelector, cardSelector, handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

const popupViewCard = new PopupWithImage('.popup-view-card');
popupViewCard.setEventListeners();
function handleCardClick(name, link) {
  popupViewCard.open(name, link);
}

cardList.renderItems();


const formAuthor = document.querySelector('#form-edit-author')
const formEditAuthorValidator = new FormValidator(settings, formAuthor);
const formAddCard = document.querySelector('#form-add-card');
const popupFormAddCardValidator = new FormValidator(settings, formAddCard);
formEditAuthorValidator.enableValidation();
popupFormAddCardValidator.enableValidation();

const newUser = new UserInfo({ name: '.profile__name', description: '.profile__description' });
function formSubmitHandler(inputValuesObject) {
  newUser.setUserInfo(inputValuesObject);
  popupViewEditor.close();
}
const popupViewEditor = new PopupWithForm('.popup-edit-author', formSubmitHandler);
popupViewEditor.setEventListeners();
const buttonOpenViewEditor = document.querySelector('.profile__edit-button');
const nameOfAuthorField = document.querySelector('.popup-edit-author').querySelector('#name');
const descriptionOfAuthorField = document.querySelector('.popup-edit-author').querySelector('#description');
buttonOpenViewEditor.addEventListener('click', () => {
  const userInfo = newUser.getUserInfo();
  nameOfAuthorField.value = userInfo.name;
  descriptionOfAuthorField.value = userInfo.description;
  popupViewEditor.open();
  formEditAuthorValidator.resetValidation();
});

function addNewCard(inputValuesObject) {
  const newItem = {
      name: inputValuesObject.place,
      link: inputValuesObject.link,
    };

  addCardToPage(newItem);

  popupNewCard.close();
}
const popupNewCard = new PopupWithForm('.popup-add-card', addNewCard);
popupNewCard.setEventListeners();
const buttonAddNewCard = document.querySelector('.profile__add-button');
buttonAddNewCard.addEventListener('click', () => {
  popupFormAddCardValidator.resetValidation();
  popupNewCard.open();
});
