import { Common, HIDE_ELEMENT, SHOW_ELEMENT } from "./Common.js";

export const buttonType = {
  BET_ERR: "Obstaw ponownie",
  TAKE_CREDITS: "Kup żetony",
};

export const WIN = "win";
export const LOOSE = "loose";
export const DRAW = "draw";
export const BET_ERROR = "bet error";
export const MODAL_ID = "modal-message";
export const MODAL_BUTTON_ID = "modal-btn";

const MODAL_MESSAGE_ID = "message";

class Message extends Common {
  constructor() {
    super();
    this.messageModalElement = this.bindToElement(MODAL_MESSAGE_ID);
  }

  setMessage(messageType, playerName) {
    this.changeVisibilityOfElement(MODAL_ID, SHOW_ELEMENT);
    switch (messageType) {
      case WIN:
        this.messageModalElement.style.color = "white";
        this.messageModalElement.innerText = `${playerName} wygrałeś !!!`;
        break;
      case DRAW:
        this.messageModalElement.style.color = "grey";
        this.messageModalElement.innerText = `${playerName} zremisowałeś`;
        break;
      case LOOSE:
        this.messageModalElement.style.color = "red";
        this.messageModalElement.innerText = `${playerName} przegrałeś ...`;
        break;
      case BET_ERROR:
        this.messageModalElement.style.color = "red";
        this.messageModalElement.innerText = `${playerName}, Podany zakład jest za mały !!!`;
        this.setButton(buttonType.BET_ERR);
        break;
      case "NO-MEANS":
        this.messageModalElement.style.color = "red";
        this.messageModalElement.innerText = `${playerName},"NO-MEANS" !!!`;
        this.setButton(buttonType.TAKE_CREDITS);
        break;
    }
  }

  setButton(buttonType) {
    const modalButton = this.bindToElement(MODAL_BUTTON_ID);
    modalButton.value = buttonType;

    this.changeVisibilityOfElement(modalButton, SHOW_ELEMENT);
  }

  hideMessage() {
    this.changeVisibilityOfElement(MODAL_ID, HIDE_ELEMENT);
  }
}

export const message = new Message();
