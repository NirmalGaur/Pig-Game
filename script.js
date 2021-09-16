'use strict';
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // another way and little bit faster
const diceEl = document.querySelector('.dice');
const currScore0El = document.getElementById('current--0');
const currScore1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// set the starting values of scores equals 0 and hide the dice
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let currentScore = 0;
let activePlayer = 0;
let playing = true;
const scores = [0, 0];
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = (activePlayer + 1) % 2;
  // to change the styles of both sides, the active side would have light while other have darker background
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//when we click Roll Dice button
btnRoll.addEventListener('click', function () {
  if (playing) {
    diceEl.classList.remove('hidden');
    const diceroll = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${diceroll}.png`; //adds the image of dice

    //check for dice equals 1
    if (diceroll !== 1) {
      // add diceroll result to current score
      currentScore += diceroll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to other player
      switchPlayer();
    }
  }
});
//when we click the Hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
  }

  if (scores[activePlayer] < 100) switchPlayer();
  else {
    //end the game here
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    diceEl.classList.add('hidden');
  }
});
//when we hit New Game button
btnNew.addEventListener('click', function () {
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
  activePlayer = 0;
  currScore0El.textContent = 0;
  currScore1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  playing = true;
});
