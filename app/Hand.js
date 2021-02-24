export class Hand {
  constructor() {
    this.cards = [];
  }

  addCards(card) {
    this.cards.push(card);
  }

  resetPoints() {
    this.cards = [];
  }
}
