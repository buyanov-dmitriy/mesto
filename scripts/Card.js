import openPopup from './index.js';

export default class Card {
  _name;
  _link;
  _cardSelector;
  _element;

  constructor(initialCard, cardSelector) {
    this._name = initialCard.name;
    this._link = initialCard.link;
    this._cardSelector = cardSelector;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode('true');

    return cardElement;
  };

  _deleteCard(evt) {
    evt.target.closest('.element-template__element').remove();
  };

  _likeCard(evt) {
    evt.target.classList.toggle('element-template__like_active');
  };

  _openCard(evt) {
    const popupViewCard = document.querySelector('#popup-view-card');
    const imageViewCard = popupViewCard.querySelector('.popup__image');
    const captionViewcard = popupViewCard.querySelector('.popup__caption');

    imageViewCard.src = evt.target.src;
    imageViewCard.alt = evt.target.alt;
    captionViewcard.textContent = evt.target.alt;
    openPopup(popupViewCard);
  }

  _setEventListeners() {
    this._element.querySelector('.element-template__trash').addEventListener('click', this._deleteCard);
    this._element.querySelector('.element-template__like').addEventListener('click', this._likeCard);
    this._element.querySelector('.element-template__open').addEventListener('click', this._openCard);
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element-template__picture').src = this._link;
    this._element.querySelector('.element-template__picture').alt = this._name;
    this._element.querySelector('.element-template__title').textContent = this._name;

    return this._element;
  };
}
