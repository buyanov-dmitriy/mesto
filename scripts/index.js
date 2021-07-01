const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;

function deleteElement(evt) {
  evt.target.closest('.element-template__element').remove();
}

function likeElement(evt) {
  evt.target.classList.toggle('element-template__like_active');
}

function setEventListeners(elementTemplateClone) {
  elementTemplateClone.querySelector('.element-template__trash').addEventListener('click', deleteElement);
  elementTemplateClone.querySelector('.element-template__like').addEventListener('click', likeElement);
  elementTemplateClone.querySelector('.element-template__open').addEventListener('click', openPopupViewCard);
}

const popupViewCard = document.querySelector('#popup-view-card');
const imageViewCard = popupViewCard.querySelector('.popup__image');
const captionViewcard = popupViewCard.querySelector('.popup__caption');

function openPopupViewCard(evt) {
  imageViewCard.src = evt.target.src;
  imageViewCard.alt = evt.target.alt;
  captionViewcard.textContent = evt.target.alt;
  openPopup(popupViewCard);
}

function createCard(element) {
  const elementTemplateClone = elementTemplate.cloneNode('true');
  const elementTemplateCloneImg = elementTemplateClone.querySelector('.element-template__picture');
  const elementTemplateCloneTitle = elementTemplateClone.querySelector('.element-template__title');

  elementTemplateCloneImg.src = element.link;
  elementTemplateCloneImg.alt = element.name;
  elementTemplateCloneTitle.textContent = element.name;

  return elementTemplateClone;
}

function renderElement(element, flag) {
  const renderedElement = createCard(element);

  setEventListeners(renderedElement);

  if (flag == "addedElement") {
    elements.prepend(renderedElement);
  }
  else {
    elements.append(renderedElement);
  }

}

function renderElements(initialCards) {
  initialCards.forEach(renderElement);
}

renderElements(initialCards);

const buttonOpenViewEditor = document.querySelector('.profile__edit-button');
const buttonCloseViewEditor = document.querySelector('#close-author');
const popupViewEditor = document.querySelector('#popup-edit-author');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const buttonCloseAddNewCard = document.querySelector('#close-add-card');
const popupNewCard = document.querySelector('#popup-add-card');
const buttonCloseViewCard = document.querySelector('#close-card');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

const nameOfAuthor = document.querySelector('.profile__name');
const descriptionOfAuthor = document.querySelector('.profile__description');
const popupNameOfAuthor = popupViewEditor.querySelector('#name');
const popupDescriptionOfAuthor = popupViewEditor.querySelector('#description');

function openPopupEditAuthor() {
  popupNameOfAuthor.value = nameOfAuthor.textContent;
  popupDescriptionOfAuthor.value = descriptionOfAuthor.textContent;
}

buttonOpenViewEditor.addEventListener('click', () => {
  openPopupEditAuthor();
  openPopup(popupViewEditor);
});

buttonAddNewCard.addEventListener('click', () => openPopup(popupNewCard));

buttonCloseViewEditor.addEventListener('click', () => closePopup(popupViewEditor));

buttonCloseAddNewCard.addEventListener('click', () => closePopup(popupNewCard));

buttonCloseViewCard.addEventListener('click', () => closePopup(popupViewCard));

const formEditAuthor = popupViewEditor.querySelector('.popup__container');

function formSubmitHandler(evt) {
  evt.preventDefault();

  nameOfAuthor.textContent = popupNameOfAuthor.value;
  descriptionOfAuthor.textContent = popupDescriptionOfAuthor.value;

  closePopup(popupViewEditor);
}

formEditAuthor.addEventListener('submit', formSubmitHandler);

const popupFormAddCard = popupNewCard.querySelector('.popup__container');
const popupAddCardPlace = popupFormAddCard.querySelector('#place');
const popupAddCardLink = popupFormAddCard.querySelector('#link');

function addNewCard(evt) {
  const newItemToArray = {
      name: '',
      link: '',
    };
  evt.preventDefault();
  newItemToArray.name = popupAddCardPlace.value;
  newItemToArray.link = popupAddCardLink.value;


  renderElement(newItemToArray, "addedElement");
  popupFormAddCard.reset();

  closePopup(popupNewCard);
}

popupFormAddCard.addEventListener('submit', addNewCard);
