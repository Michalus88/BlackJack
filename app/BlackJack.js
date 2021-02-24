import { Deck } from "./Deck.js";
import { Player } from "./Player.js";
import { table, BET_BUTTON_ID, PLAYER_BET_ON_TABLE } from "./Table.js";
import {
  message,
  WIN,
  DRAW,
  LOOSE,
  MODAL_ID,
  MODAL_BUTTON_ID,
  buttonType,
} from "./Message.js";
import { Common, HIDE_ELEMENT, SHOW_ELEMENT } from "./Common.js";

const BUTTONS_CONTAINER_ID = "buttons-container";
const HIT_BUTTON_ID = "hit-btn";
const STAND_BUTTON_ID = "stand-btn";

const MAX_NUMBER_OF_POINTS = 21;
const NUMBER_TO_WHICH_DEALER_MUST_TAKE_CARD = 17;

class BlackJack extends Common {
  constructor({ player }) {
    super();
    this.message = message;
    this.player = player;
    this.dealer = new Player("Dealer");
    this.table = table;
    this.deck = new Deck();
    this.deck.shuffle();
  }

  initializeGame() {
    this.bindEventListeners();
    this.dealCards();

    this.table.meansDisplay(player.means);
    this.table.betDisplay(player.means);
  }

  bindEventListeners() {
    const hitButton = this.bindToElement(HIT_BUTTON_ID);
    const standButton = this.bindToElement(STAND_BUTTON_ID);
    const betButton = this.bindToElement(BET_BUTTON_ID);
    const modalBtn = this.bindToElement(MODAL_BUTTON_ID);

    hitButton.addEventListener("click", () => this.handleHitCardBtn());
    standButton.addEventListener("click", () => this.handleStandBtn());
    betButton.addEventListener("click", () =>
      this.handleBetBtn(Number(betButton.dataset.playerBet))
    );
    modalBtn.addEventListener("click", (e) => this.handleModalBtn(e));

    // betButton.dataset.playerBet = 0;
  }

  dealCards() {
    if (this.player.means === 0) {
      this.message.setMessage("NO-MEANS", this.player.name);
      this.changeVisibilityOfElement("bet-handling-buttons", HIDE_ELEMENT);

      return;
    }
    for (let i = 0; i < 2; i++) {
      const playerCard = this.deck.pickOne();

      this.player.hand.addCards(playerCard);
      this.table.cardsDisplay({ playerCard });
    }
    const dealerCard = this.deck.pickOne();

    this.dealer.hand.addCards(dealerCard);
    this.table.cardsDisplay({ dealerCard });

    const playerPoints = this.player.calculatePoints();
    const dealerPoints = this.dealer.calculatePoints();

    this.table.pointsDisplay({ playerPoints, dealerPoints });
  }

  handleHitCardBtn() {
    const playerCard = this.deck.pickOne();

    player.hand.addCards(playerCard);

    const playerPoints = this.player.calculatePoints();
    const dealerPoints = this.dealer.calculatePoints();

    this.table.cardsDisplay({ playerCard });
    this.table.pointsDisplay({ playerPoints, dealerPoints });

    playerPoints > MAX_NUMBER_OF_POINTS ? this.endGame() : null;
  }

  handleStandBtn() {
    const dealerPoints = this.dealer.calculatePoints();
    if (dealerPoints >= NUMBER_TO_WHICH_DEALER_MUST_TAKE_CARD) {
      this.endGame();
      return;
    }
    let dealerCard = this.deck.pickOne();

    this.dealer.hand.addCards(dealerCard);
    this.table.cardsDisplay({ dealerCard });

    this.table.pointsDisplay({
      playerPoints: this.player.calculatePoints(),
      dealerPoints: this.dealer.calculatePoints(),
    });
    this.handleStandBtn();
    this.changeVisibilityOfElement(
      this.table.HTMLELPlayerBetOnTable,
      HIDE_ELEMENT
    );
    this.table.HTMLElbettingSlider.value = 0;
    this.player.setBet(0);
  }

  handleBetBtn(playerBet) {
    this.bindToElement(BET_BUTTON_ID).dataset.playerBet = 0;

    this.player.setBet(playerBet);
    if (playerBet === 0) {
      this.player.handlingOfBet();
    } else {
      this.player.handlingOfBet();
      this.changeVisibilityOfElement("bet-handling-buttons", HIDE_ELEMENT);
      this.changeVisibilityOfElement("card-handling-buttons", SHOW_ELEMENT);
      this.changeVisibilityOfElement(PLAYER_BET_ON_TABLE, SHOW_ELEMENT);
    }
  }

  handleModalBtn(e) {
    if (e.target.value === buttonType.TAKE_CREDITS) {
      this.player.setMeans(500);
      this.table.meansDisplay(player.means);
      this.table.betDisplay(player.means);
      this.dealCards();
    }
    this.changeVisibilityOfElement(MODAL_ID, HIDE_ELEMENT);
    this.changeVisibilityOfElement("bet-handling-buttons", SHOW_ELEMENT);
    this.changeVisibilityOfElement(MODAL_BUTTON_ID, HIDE_ELEMENT);
  }

  endGame() {
    this.changeVisibilityOfElement("card-handling-buttons", HIDE_ELEMENT);
    this.message.setMessage(this.gameResult(), this.player.name);
    this.player.calculationOfWinning(this.gameResult());
    this.updateGame();
  }

  gameResult() {
    let gameResult = null;
    const playerPoints = this.player.calculatePoints();
    const dealerPoints = this.dealer.calculatePoints();
    if (
      playerPoints > MAX_NUMBER_OF_POINTS ||
      (playerPoints < dealerPoints && dealerPoints <= MAX_NUMBER_OF_POINTS)
    ) {
      gameResult = LOOSE;
    } else if (
      dealerPoints > MAX_NUMBER_OF_POINTS ||
      playerPoints > dealerPoints
    ) {
      gameResult = WIN;
    } else gameResult = DRAW;

    return gameResult;
  }

  updateGame() {
    setTimeout(() => {
      this.changeVisibilityOfElement(BUTTONS_CONTAINER_ID, SHOW_ELEMENT);
      this.changeVisibilityOfElement("bet-handling-buttons", SHOW_ELEMENT);
      this.changeVisibilityOfElement(BET_BUTTON_ID, SHOW_ELEMENT);

      this.deck = new Deck();
      this.deck.shuffle();
      this.table.cardsDisplayReset();
      this.message.hideMessage();
      this.player.hand.resetPoints();
      this.dealer.hand.resetPoints();
      this.dealCards();
      this.table.meansDisplay(player.means);
      this.table.betDisplay(player.means);
    }, 2000);
  }
}

const player = new Player("Michał", 1000);

window.onload = function () {
  const blackJack = new BlackJack({ player });
  blackJack.initializeGame();
};
