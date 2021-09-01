export default class Card {
  constructor(initialCard, templateSelector, cardSelector, handleCardClick, openConfirmationPopup, myOwnerId, putLike) {
    this._initialCard = initialCard;
    this._name = initialCard.name;
    this._link = initialCard.link;
    this._likes = initialCard.likes;
    this._owner = initialCard.owner;
    this._cardId = initialCard._id;
    this._templateSelector = templateSelector;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._openConfirmationPopup = openConfirmationPopup;
    this._myOwnerId = myOwnerId;
    this._putLike = putLike;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(this._cardSelector)
      .cloneNode('true');

    if (this._ownerId != this._myOwnerId) {
      cardElement.querySelector('.element-template__trash').classList.add('element-template__trash_disabled');
    }
    if (this._likes.some(element => {
      return element._id === this._myOwnerId
    })) {
      cardElement.querySelector('.element-template__like').classList.add('element-template__like_active');
    };

    return cardElement;
  };

  deleteCard(element) {
    element.remove();
    element = '';
  };

  likeCard(element, likes) {
    element.querySelector('.element-template__like-count').textContent = likes;
    element.querySelector('.element-template__like').classList.toggle('element-template__like_active');
  };

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => this._openConfirmationPopup(this, this._element, this._initialCard));
    this._likeButton.addEventListener('click', () => this._putLike(this, this._element, this._initialCard));
    this._openButton.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  };

  generateCard() {
    this._likeCount = this._likes.length;
    this._ownerId = this._owner._id;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element-template__picture');
    this._cardTitle =  this._element.querySelector('.element-template__title');
    this._deleteButton = this._element.querySelector('.element-template__trash');
    this._likeButton = this._element.querySelector('.element-template__like');
    this._openButton =  this._element.querySelector('.element-template__open');
    this._likeCounter = this._element.querySelector('.element-template__like-count');

    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._likeCounter.textContent = this._likeCount;

    return this._element;
  };
}
