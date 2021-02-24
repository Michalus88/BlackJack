import { Types, Weights, Card } from "./Card.js";

export class Deck {
  cards = [];
  constructor() {
    Types.forEach((type) =>
      Weights.forEach((weight) => this.cards.push(new Card(weight, type)))
    );
  }

  shuffle() {
    for (let i = this.cards.length - 1; i >= 0; i--) {
      let randomCardIndex = Math.floor(Math.random() * i);
      const currentIterationCard = this.cards[i];
      this.cards[i] = this.cards[randomCardIndex];
      this.cards[randomCardIndex] = currentIterationCard;
    }
    return this.cards;
  }

  pickOne() {
    return this.cards.pop();
  }
}
