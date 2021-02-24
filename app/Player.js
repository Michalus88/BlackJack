import { Common, HIDE_ELEMENT } from "./Common.js";
import { Hand } from "./Hand.js";
import { message, BET_ERROR, WIN, DRAW, LOOSE } from "./Message.js";
import { table, GAME_PANEL } from "./Table.js";

export class Player extends Common {
  constructor(name, means) {
    super();
    this.name = name;
    this.hand = new Hand();
    this.points = 0;
    this.means = Number(means);
    this.betSize = 0;
  }

  calculatePoints() {
    let points = 0;
    this.hand.cards.forEach((card) => {
      let weight =
        card.weight === "J" ||
        card.weight === "D" ||
        card.weight === "K" ||
        card.weight === "A"
          ? card.weight === "A" && this.hand.cards.length > 2
            ? 1
            : 10
          : card.weight;

      points += Number(weight);
    });
    return points;
  }

  setBet(bet) {
    this.betSize = Number(bet);
  }

  setMeans(means) {
    this.means = means;
  }

  handlingOfBet() {
    console.log(this.betSize);
    if (this.betSize === 0) {
      message.setMessage(BET_ERROR, this.name);
      this.changeVisibilityOfElement("bet-handling-buttons", HIDE_ELEMENT);
      return;
    }
    this.betSize = this.betSize;
    this.means -= this.betSize;

    table.meansDisplay(this.means);
  }

  calculationOfWinning(gameResult) {
    switch (gameResult) {
      case WIN:
        this.means += this.betSize * 2;
        break;
      case DRAW:
        this.means += this.betSize;
        break;
      case LOOSE:
        break;
    }
  }
}
