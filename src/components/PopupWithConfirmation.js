import Popup from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitButtonSelector, submitFunction) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector(submitButtonSelector);
    this._submitFunction = submitFunction;
  }

  setEventListeners() {
    this._submitButton.addEventListener('click', () => {
      this._submitFunction(this._cardInstance, this._element, this._card);
    })
    super.setEventListeners();
  }

  open(cardInstance, element, card) {
    this._cardInstance = cardInstance;
    this._element = element;
    this._card = card;
    super.open();
  }
}
