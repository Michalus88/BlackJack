import { Common } from "./Common.js";

export const BETTING_SLIDER_ID = "betting-slider";
export const BET_BUTTON_ID = "bet-btn";
export const GAME_PANEL = "game-panel";

const PLAYER_CARDS_PLACE_ID = "player-cards";
const DEALER_CARDS_PLACE_ID = "dealer-cards";
const PLAYER_POINTS_ID = "player-points";
const DEALER_POINTS_ID = "dealer-points";
const PLAYER_MEANS_ID = "means";
const PLAYER_BET_ID = "player-bet";
export const PLAYER_BET_ON_TABLE = "player-bet-on-table";

class Table extends Common {
  constructor() {
    super();
    this.HTMLElPlayerCardsPlace = this.bindToElement(PLAYER_CARDS_PLACE_ID);
    this.HTMLEldealerCardsPlace = this.bindToElement(DEALER_CARDS_PLACE_ID);
    this.HTMLElplayerPoints = this.bindToElement(PLAYER_POINTS_ID);
    this.HTMLEldealerPoints = this.bindToElement(DEALER_POINTS_ID);
    this.HTMLElbettingSlider = this.bindToElement(BETTING_SLIDER_ID);
    this.HTMLElbetButton = this.bindToElement(BET_BUTTON_ID);
    this.HTMLElplayerMeans = this.bindToElement(PLAYER_MEANS_ID);
    this.HTMLElPlayerBet = this.bindToElement(PLAYER_BET_ID);
    this.HTMLELPlayerBetOnTable = this.bindToElement(PLAYER_BET_ON_TABLE);
  }

  betDisplay(playerMeans) {
    this.HTMLElPlayerBet.innerText = 0;
    this.HTMLElbettingSlider.setAttribute("max", playerMeans);
    this.HTMLElbettingSlider.oninput = () => {
      let playerBet = Number(this.HTMLElbettingSlider.value);

      this.HTMLElPlayerBet.innerText = playerBet;
      this.HTMLELPlayerBetOnTable.innerText = `Twój zakład : ${playerBet}$`;
      this.HTMLElbetButton.dataset.playerBet = playerBet;
    };
  }

  meansDisplay(means) {
    this.HTMLElplayerMeans.innerText = `${means} $`;
  }

  cardsDisplay({ playerCard = null, dealerCard = null }) {
    if (playerCard !== null && dealerCard !== null) {
      this.HTMLElPlayerCardsPlace.appendChild(playerCard.render());
      this.HTMLEldealerCardsPlace.appendChild(dealerCard.render());
    } else if (playerCard !== null) {
      this.HTMLElPlayerCardsPlace.appendChild(playerCard.render());
    } else this.HTMLEldealerCardsPlace.appendChild(dealerCard.render());
  }

  pointsDisplay({ playerPoints, dealerPoints }) {
    this.HTMLEldealerPoints.innerText = `Wynik : ${dealerPoints}`;
    this.HTMLElplayerPoints.innerText = `Wynik : ${playerPoints}`;
  }

  cardsDisplayReset() {
    this.HTMLElPlayerCardsPlace.innerText = "";
    this.HTMLEldealerCardsPlace.innerText = "";
  }
}

export const table = new Table();
