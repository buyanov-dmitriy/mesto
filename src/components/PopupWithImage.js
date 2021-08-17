import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageViewCard = this._popup.querySelector('.popup__image');
    this._captionViewCard = this._popup.querySelector('.popup__caption');
  }

  open(name, link) {
    this._imageViewCard.src = link;
    this._imageViewCard.alt = name;
    this._captionViewCard.textContent = name;
    super.open();
  }
}
