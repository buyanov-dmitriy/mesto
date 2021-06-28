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

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;

let flag = false;

function elementDelete(evt) {
  evt.target.closest('.element-template__element').remove();
}

function elementLike(evt) {
  evt.target.classList.toggle('element-template__like_active');
}

function setEventListeners(elementTemplateClone) {
  elementTemplateClone.querySelector('.element-template__trash').addEventListener('click', elementDelete);
  elementTemplateClone.querySelector('.element-template__like').addEventListener('click', elementLike);
}

function renderElement(element) {
  const elementTemplateClone = elementTemplate.cloneNode('true');
  const elementTemplateCloneImg = elementTemplateClone.querySelector('.element-template__picture');
  const elementTemplateCloneTitle = elementTemplateClone.querySelector('.element-template__title');

  elementTemplateCloneImg.src = element['link'];
  elementTemplateCloneImg.alt = element['name'];
  elementTemplateCloneTitle.textContent = element['name'];

  setEventListeners(elementTemplateClone);
  if (!flag) {
    elements.append(elementTemplateClone);
  }
  else {
    elements.prepend(elementTemplateClone);
  }
}

function renderElements(initialCards) {
  initialCards.forEach(renderElement);
}

renderElements(initialCards);

const popupClose = document.querySelectorAll('.popup__close');
let popupOpen = document.querySelectorAll('.popup-open');
const popupAddCard = document.querySelector('#popup-add-card');
const popupViewCard = document.querySelector('#popup-view-card');

const closePopup = (evt) => {
  if (evt.target.id === 'close-author' || evt.target.id === 'form-close-author') {
    popupEditAuthor.classList.remove('popup_opened');
  }
  else if (evt.target.id === 'close-add-card' || evt.target.id === 'form-add-card'){
    popupAddCard.classList.remove('popup_opened');
  }
  else if (evt.target.id === 'close-card') {
    popupViewCard.classList.remove('popup_opened');
  }
}

const openPopup = (evt) => {
  if (evt.target.classList.contains('profile__edit-button')) {
    openPopupEditAuthor();
    popupEditAuthor.classList.add('popup_opened');
  }
  else if (evt.target.classList.contains('profile__add-button')) {
    popupAddCard.classList.add('popup_opened');
  }
  else if (evt.target.classList.contains('element-template__picture')) {
    openPopupViewCard(evt);
    popupViewCard.classList.add('popup_opened');
  }
}

const imageViewCard = popupViewCard.querySelector('.popup__image');
const captionViewcard = popupViewCard.querySelector('.popup__caption');

const openPopupViewCard = (evt) => {
  imageViewCard.src = evt.target.src;
  imageViewCard.alt = evt.target.alt;
  captionViewcard.textContent = evt.target.alt;
}

popupClose.forEach(function(button) {
  button.addEventListener("click", closePopup);
});

popupOpen.forEach(function(button) {
  button.addEventListener('click', openPopup);
});

const popupFormAddCard = popupAddCard.querySelector('.popup__container');
const popupAddCardPlace = popupFormAddCard.querySelector('#place');
const popupAddCardLink = popupFormAddCard.querySelector('#link');

const addNewCard = (evt) => {
  let newItemToArray = {
      name: '',
      link: '',
    };
  evt.preventDefault();
  newItemToArray['name'] = popupAddCardPlace.value;
  newItemToArray['link'] = popupAddCardLink.value;
  flag = true;


  renderElement(newItemToArray);

  initialCards.unshift(newItemToArray);
  popupOpen = document.querySelectorAll('.popup-open');
  popupOpen.forEach(function(button) {
    button.addEventListener('click', openPopup);
  });

  closePopup(evt);
}

popupFormAddCard.addEventListener('submit', addNewCard);

const nameOfAuthor = document.querySelector('.profile__name');
const descriptionOfAuthor = document.querySelector('.profile__description');
const popupEditAuthor = document.querySelector('#popup-edit-author');
const formEditAuthor = popupEditAuthor.querySelector('.popup__container');
const popupNameOfAuthor = popupEditAuthor.querySelector('#name');
const popupDescriptionOfAuthor = popupEditAuthor.querySelector('#description');



const openPopupEditAuthor = function() {
  popupNameOfAuthor.value = nameOfAuthor.textContent;
  popupDescriptionOfAuthor.value = descriptionOfAuthor.textContent;
}


function formSubmitHandler(evt) {
  evt.preventDefault();

  nameOfAuthor.textContent = popupNameOfAuthor.value;
  descriptionOfAuthor.textContent = popupDescriptionOfAuthor.value;

  closePopup(evt);
}


formEditAuthor.addEventListener('submit', formSubmitHandler);
