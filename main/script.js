"use strict";
// Get the elements
// ID

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1"); // 2nd and eff way to select Id
const diceEl = document.querySelector(".dice");
//Buttons
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
// CurrentScores element
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

//  Array of scores
const scores = [0, 0];
let isPlaying = true;

// Player 1 and 2 classes
const player1El = document.querySelector(".player--1");
const player0El = document.querySelector(".player--0");

// Intitailising current score to 0
let currentScore = 0;
// Setup a currentPlayer or activePlayer
let activePlayer = 0; // 0th player
// // Setup initial requirements
// score0El.textContent = 0;
// score1El.textContent = 0;
// Disappear the dice via adding the hidden class
diceEl.classList.add("hidden");

// switchPlayer function
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // of the prev player
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // changing the active class
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling the dice logic
btnRoll.addEventListener("click", function () {
  if (isPlaying) {
    //1. Generate the random number 2. Display Dice 3. Switch Player
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. display dice
    diceEl.classList.remove("hidden");
    // Changing the image via src
    diceEl.src = `dice-${dice}.png`; // src will get the dice number
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore; // will be changed later
    } else switchPlayer();
  }
});

btnHold.addEventListener("click", function () {
  if (isPlaying) {
    //1. Add the scores
    scores[activePlayer] += currentScore;
    //scores[1] =scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if score>=100/20
    if (scores[activePlayer] >= 100) {
      isPlaying = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active"); // remove earlier class
    }
    //3. switch the player, the active Player
    else switchPlayer();
  }
});
btnNew.addEventListener("click", function () {
  isPlaying = true;
  if (scores[activePlayer] >= 100)
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--winner");
  document.getElementById(`current--0`).textContent = 0; // of the prev player
  document.getElementById(`current--1`).textContent = 0;
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  document.getElementById(`score--0`).textContent = scores[0];
  document.getElementById(`score--1`).textContent = scores[1];
  // changing the active class
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
});
