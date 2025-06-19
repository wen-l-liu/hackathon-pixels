document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn-deal").addEventListener("click", dealCard);
});
let dealerSum = 0;
let playerSum = 0;

let dealerAceCount = 0;
let playerAceCount = 0;

let hiddenCard;// Dealer's first card is hidden
let deck;

let canHit = true; //allows the player to draw while yourSum <= 21
let canStand = true; //allows the player to stand while yourSum <= 21

let playerCards = document.getElementById("player-cards");
let dealerCards = document.getElementById("dealer-cards");
let playerScore = document.getElementById("player-score");
let dealerScore = document.getElementById("dealer-score");

let hitBtn = document.getElementById("btn-hit");
let standBtn = document.getElementById("btn-stand");
let dealBtn = document.getElementById("btn-deal");
let resetBtn = document.getElementById("btn-reset");

hitBtn.disabled = true;
standBtn.disabled = true;
resetBtn.addEventListener("click", reset);

function dealCard() {
    reset(); // Reset the game state
    dealerCards.innerHTML = '<span id="hidden" class="card-design">&nbsp;</span>'; //placeholder for dealer's hidden card
    buildDeck();
    shuffleDeck();
    dealBtn.disabled = true; // Disable deal button after dealing cards
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ['&#9824;', '&#9827;', '&#9829;', '&#9670;']; // Spades, Clubs, Hearts, Diamonds
    // let types = ["C", "D", "H", "S"];
    deck = [];

    for (let type of types) {
        for (let value of values) {
            deck.push(value + " " + type); //A-C -> K-C, A-D -> K-D
        }
    }
    console.log(deck);
}


function shuffleDeck() {
    for (let card of deck) {
        let i = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
        let tempCard = card;
        card = deck[i];
        deck[i] = tempCard; // Swap the card with a random card
    }
    console.log(deck);

}

function startGame() {
    // Assign value to dealer's first card that is hidden
    hiddenCard = deck.pop();
    dealerSum += getValue(hiddenCard);
    dealerAceCount += checkAce(hiddenCard);
    console.log('hidden', hiddenCard);

    // Display dealer's sencond card
    let cardDealt = document.createElement("span");
    let card = deck.pop();
    cardDealt.innerHTML = card; // Display the card
    console.log('card', card);
    dealerSum += getValue(card);
    // dealerScore.innerHTML = dealerSum; // Update dealer score----------------------comment out
    dealerAceCount += checkAce(card);
    dealerCards.append(cardDealt);

    console.log('dealerSum', dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardDealt = document.createElement("span");
        let card = deck.pop();
        cardDealt.innerHTML = card;
        playerSum += getValue(card);
        playerScore.innerHTML = `You have ${playerSum}`; // Update player score
        playerAceCount += checkAce(card);
        playerCards.append(cardDealt);
    }

    // console.log('playerSum',playerSum);
    hitBtn.disabled = false;
    standBtn.disabled = false;
    hitBtn.addEventListener("click", hit);
    standBtn.addEventListener("click", stay);
    
    if (playerSum == 21) {
        canHit = false; // Disable hitting if player has blackjack
        stay(); // Automatically stand if player has blackjack
    }
}

function getValue(card) {
    let data = card.split(" "); // "4-C" -> ["4", "C"]
    console.log('data', data);
    let value = data[0];

    if (isNaN(value)) { //A J Q K
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        // if (card.value == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(yourSum, yourAceCount) {
    while (yourSum > 21 && yourAceCount > 0) {
        yourSum -= 10;
        yourAceCount -= 1;
    }
    return yourSum;
}

function hit() {
    if (!canHit) {
        return;
    }
    let cardDealt = document.createElement("span");
    let card = deck.pop();
    console.log("card", card);
    cardDealt.innerHTML = card; // Display the card
    playerSum += getValue(card);
    console.log('playerSum', playerSum);
    playerAceCount += checkAce(card);
    playerCards.append(cardDealt);
    if (reduceAce(playerSum, playerAceCount) >= 21) { //A, J, 8 -> 1 + 10 + 8
        canHit = false;
        stay();
    } else {
        playerSum = reduceAce(playerSum, playerAceCount);
    }
    playerScore.innerHTML = `You have ${playerSum}`; // Update player score
}

function stay() {
    //dealer plays if value is less than 17
    while (dealerSum < 17) {
        let cardDealt = document.createElement("span");
        let card = deck.pop();
        cardDealt.innerHTML = card; // Display the card
        console.log('card',card);
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById('dealer-cards').append(cardDealt);
    }
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);

    canHit = false;
    document.getElementById("hidden").classList.remove("card-design"); // Remove the hidden card design
    document.getElementById("hidden").innerHTML = hiddenCard;

    let message = "";
    if (playerSum > 21) {
        message = "BUST! You Lose!";
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    //both you and dealer <= 21
    else if (playerSum == dealerSum) {
        message = "Tie!";
    }
    else if (playerSum == 21) {
        message = "Blackjack! You Win!";
    }
    else if (playerSum > dealerSum) {
        message = "You Win!";
    }
    else if (playerSum < dealerSum) {
        message = "You Lose!";
    }

    dealerScore.innerHTML = `Dealer has ${dealerSum}`;
    playerScore.innerHTML = `You have ${playerSum}`;
    document.getElementById("message").innerHTML = message;
    dealBtn.disabled = false; // Re-enable deal button for a new game
    hitBtn.disabled = true; // Disable hit button after standing
    standBtn.disabled = true; // Disable stand button after standing
}

function reset() {
    playerCards.innerHTML = ""; // Clear player cards
    dealerCards.innerHTML = ""; // resets dealer cards
    document.getElementById("message").innerHTML = ""; // Clear message"";

    dealerScore.innerHTML = `&nbsp;`; // Clear dealer score
    playerScore.innerHTML = `&nbsp;`; // Clear player score
    dealerSum = 0;
    playerSum = 0;

    playerAceCount = 0;
    dealerAceCount = 0;
    canHit = true; // Reset canHit to true for a new game
    canStand = true; // Reset canStand to true for a new game
    dealBtn.disabled = false; // Re-enable deal button
}