import Popup from "./Popup.js";

const imageViewCard = document.querySelector('.popup__image');
const captionViewcard = document.querySelector('.popup__caption');

export default class PopupWithImage extends Popup {
  constructor(popupSelector, name, link) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }

  open() {
    imageViewCard.src = this._link;
    imageViewCard.alt = this._name;
    captionViewcard.textContent = this._name;
    super.open();
  }
}
