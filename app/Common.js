export const HIDDEN_CLASS = "hidden";
export const HIDE_ELEMENT = false;
export const SHOW_ELEMENT = true;

export class Common {
  bindToElement(elementId) {
    const element = document.getElementById(elementId);

    if (!element) {
      throw new Error(`Nie znaleźono elemento o id: ${elementId}`);
    }

    return element;
  }

  changeVisibilityOfElement(element, mode) {
    if (typeof element === "string") {
      const HTML_El = this.bindToElement(element);
      mode
        ? HTML_El.classList.remove(HIDDEN_CLASS)
        : HTML_El.classList.add(HIDDEN_CLASS);
    } else {
      mode
        ? element.classList.remove(HIDDEN_CLASS)
        : element.classList.add(HIDDEN_CLASS);
    }
  }
}
