export default class Popup {
  _popup;

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener("keydown", (evt) => {this._handleEscClose(evt)});
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", (evt) => {this._handleEscClose(evt)});
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    })
  }
}
