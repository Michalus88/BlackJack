export const Weights = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "D",
  "K",
  "A",
];
export const Types = ["hearts", "spades", "diamonds", "clubs"];

export class Card {
  mapTextToSign = {
    hearts: "&hearts;",
    spades: "&spades;",
    diamonds: "&diams;",
    clubs: "&clubs;",
  };

  constructor(weight, type) {
    this.weight = weight;
    this.type = type;
  }

  render() {
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    card.innerHTML = ` 
    <div class = "card__type-left-top ${this.type}"> ${
      this.mapTextToSign[this.type]
    }</div> 
    <div class = "card__type-right-top ${this.type}"> ${
      this.mapTextToSign[this.type]
    }</div> 
    <div class = "card__type-left-bottom ${this.type}"> ${
      this.mapTextToSign[this.type]
    }</div> 
    <div class = "card__type-right-bottom ${this.type}"> ${
      this.mapTextToSign[this.type]
    }</div> 
    <div class = "card__weight ${this.type}">${this.weight}</div>`;
    return card;
  }
}
