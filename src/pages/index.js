import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { Api } from '../components/Api';
import { settings } from '../utils/constants';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';

function catchError(error) {
  console.log(error);
}

let userId;

const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-27',
  headers: {
    'authorization': '49889f34-1928-497a-a94e-146b8fe6d002',
    'Content-Type': 'application/json',
  },
});

const newUser = new UserInfo({ nameSelector: '.profile__name', descriptionSelector: '.profile__description', avatarSelector: '.profile__avatar' });

const cardList = new Section({
  renderer: (item) => {
    addCardToPage(item, cardList)
  },
},
'.elements',
);

Promise.all([api.getUserInformation(), api.getCards()])
  .then(([userInformation, cards]) => {
    newUser.setUserInfo({
      name: userInformation.name,
      description: userInformation.about,
      avatar: userInformation.avatar,
      userId: userInformation._id,
    });
    userId = newUser.getUserInfo().userId;
    cardList.renderItems(cards.reverse());
  })
  .catch(error => catchError(error));

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
    userId,
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
          avatar: data.avatar,
          userId: data._id,
        });;
        popupViewEditor.close();
      })
      .catch(error => catchError(error));
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
      })
      .catch(error => catchError(error));
}
const popupNewCard = new PopupWithForm('.popup-add-card', addNewCard);
popupNewCard.setEventListeners();
const buttonAddNewCard = document.querySelector('.profile__add-button');
buttonAddNewCard.addEventListener('click', () => {
  popupFormAddCardValidator.resetValidation();
  popupNewCard.open();
});

function openConfirmationPopup(cardInstance, element, card) {
  popupConfirmationDelete.open(cardInstance, element, card);
}

function deleteCard(cardInstance, element, card) {
  api
    .deleteCardFromServer(card._id)
      .then(() => {
        cardInstance.deleteCard(element);
        popupConfirmationDelete.close();
      })
      .catch(error => catchError(error));
}

const popupConfirmationDelete = new PopupWithConfirmation('.popup-confirmation-delete', '.popup__confirm-delete-button', deleteCard);
popupConfirmationDelete.setEventListeners();

function putLike(cardInstance, element, card) {
  let isNotLiked = true;
  if (element.querySelector('.element-template__like').classList.contains('element-template__like_active')) {
    isNotLiked = false;
  }
  api
    .putLike(card, isNotLiked)
      .then(data => {
        cardInstance.likeCard(element, data.likes.length)
      })
      .catch(error => catchError(error));
}

function addNewAvatar(inputValuesObject) {
  return api
    .updateAvatar(inputValuesObject)
    .then(data => {
      newUser.setUserInfo({
        name: data.name,
        description: data.about,
        avatar: data.avatar,
        userId: data._id,
      });
      popupNewAvatar.close();
    })
    .catch(error => catchError(error));
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
