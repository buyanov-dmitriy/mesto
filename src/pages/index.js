import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { Api } from '../components/Api';
import Popup from '../components/Popup';

const myOwnerId = '0acc3ecde12f245e764f8153';
const user = {
  avatar: document.querySelector('.profile__avatar'),
}
const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-27',
  headers: {
    'authorization': '49889f34-1928-497a-a94e-146b8fe6d002',
    'Content-Type': 'application/json',
  },
});

api
  .getUserInformation()
  .then(data => {
    newUser.setUserInfo({
      name: data.name,
      description: data.about,
    })
    user.avatar.src = data.avatar;
  })
  .catch(error => {
    console.log(error);
  });

let cardList = new Section({
  items: [],
  renderer: (item) => {
    addCardToPage(item, cardList)
  },
},
'.elements',
);

api
  .getCards()
  .then(data => {
    cardList = new Section({
      items: data.reverse(),
      renderer: (item) => {
        addCardToPage(item)
      },
    },
    '.elements',
    );
    cardList.renderItems();
  })

const settings = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  inputSection: '.popup__section',
  inputErrorText: '.popup__error',
};

function addCardToPage(card) {
  const newCard = createCard(card, '.element-template', '.element-template__element');
  cardList.addItem(newCard);
}

function createCard(item, templateSelector, cardSelector) {
  const card = new Card(
    item,
    templateSelector,
    cardSelector,
    handleCardClick,
    openConfirmationPopup,
    myOwnerId,
    putLike,
    );
  const cardElement = card.generateCard();

  return cardElement;
}

const popupViewCard = new PopupWithImage('.popup-view-card');
popupViewCard.setEventListeners();
function handleCardClick(name, link) {
  popupViewCard.open(name, link);
}


const formAuthor = document.querySelector('#form-edit-author');
const formEditAuthorValidator = new FormValidator(settings, formAuthor);
const formAddCard = document.querySelector('#form-add-card');
const popupFormAddCardValidator = new FormValidator(settings, formAddCard);
formEditAuthorValidator.enableValidation();
popupFormAddCardValidator.enableValidation();

const newUser = new UserInfo({ name: '.profile__name', description: '.profile__description' });
function formSubmitHandler(inputValuesObject) {
  return api
    .editProfile({
      name: inputValuesObject.name,
      about: inputValuesObject.description,
    })
      .then(data => {
        newUser.setUserInfo({
          name: data.name,
          description: data.about,
        });;
        popupViewEditor.close();
      })
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
  return api
    .addNewCardToServer(newItem)
      .then(data => {
        addCardToPage(data);
        popupNewCard.close();
      });
}
const popupNewCard = new PopupWithForm('.popup-add-card', addNewCard);
popupNewCard.setEventListeners();
const buttonAddNewCard = document.querySelector('.profile__add-button');
buttonAddNewCard.addEventListener('click', () => {
  popupFormAddCardValidator.resetValidation();
  popupNewCard.open();
});


function openConfirmationPopup(element, card) {
  popupConfirmationDelete.open();
  buttonConfirmationDelete.addEventListener('click', function() {
    api
      .deleteCardFromServer(card._id)
        .then(() => {
          toolCard.deleteCard(element);
          popupConfirmationDelete.close();
        })
  });
}
const popupConfirmationDelete = new Popup('.popup-confirmation-delete');
popupConfirmationDelete.setEventListeners();
const formConfirmationDelete = document.querySelector('#popup__confirm-delete');
const buttonConfirmationDelete = document.querySelector('.popup__confirm-delete-button');
const toolCard = new Card({}, '', '', handleCardClick, openConfirmationPopup, myOwnerId, putLike);

function putLike(element, card) {
  let isNotLiked = true;
  if (element.querySelector('.element-template__like').classList.contains('element-template__like_active')) {
    isNotLiked = false;
  }
  api
    .putLike(card, isNotLiked)
      .then(data => {
        toolCard.likeCard(element, data.likes.length)
      });
}

function addNewAvatar(inputValuesObject) {
  return api
    .updateAvatar(inputValuesObject)
    .then(data => {
      user.avatar.src = data.avatar;
      popupNewAvatar.close();
    })
}
const buttonChangeAvatar = document.querySelector('.profile__avatar-overlay')
const popupNewAvatar = new PopupWithForm('.popup-new-avatar', addNewAvatar);
const formNewAvatar = document.querySelector('#popup-new-avatar');
const formNewAvatarValidator = new FormValidator(settings, formNewAvatar);
formNewAvatarValidator.enableValidation();
popupNewAvatar.setEventListeners();
buttonChangeAvatar.addEventListener('click', () => {
  popupNewAvatar.open();
  formNewAvatarValidator.resetValidation();
})
