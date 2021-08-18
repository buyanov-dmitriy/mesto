export default class Card {
  constructor(initialCard, templateSelector, cardSelector, handleCardClick) {
    this._name = initialCard.name;
    this._link = initialCard.link;
    this._templateSelector = templateSelector;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(this._cardSelector)
      .cloneNode('true');

    return cardElement;
  };

  _deleteCard() {
    this._element.remove();
    this._element = '';
  };

  _likeCard(evt) {
    this._likeButton.classList.toggle('element-template__like_active');
  };

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => this._deleteCard());
    this._likeButton.addEventListener('click', () => this._likeCard());
    this._openButton.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  };

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element-template__picture');
    this._cardTitle =  this._element.querySelector('.element-template__title');
    this._deleteButton = this._element.querySelector('.element-template__trash');
    this._likeButton = this._element.querySelector('.element-template__like');
    this._openButton =  this._element.querySelector('.element-template__open');

    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._element;
  };
}
