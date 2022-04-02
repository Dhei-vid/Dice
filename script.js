'use strict';

//Calling classes / elements
const score1El = document.querySelector('#score--0');
const score2El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');
const dice1El = document.querySelector('.dice');

const rollDice = document.querySelector('.btn--roll');
const holdScore = document.querySelector('.btn--hold');
const resetBtn = document.querySelector('.btn--new');

const Current0El = document.getElementById('current--0');
const Current1El = document.getElementById('current--1');

const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

const playerProfile0El = document.getElementById('name--0');
const playerProfile1El = document.getElementById('name--1');

let scores, currentScore, activePlayer, resetScore, playing;

//Starting condition
score1El.textContent = 0;
score2El.textContent = 0;

diceEl.classList.add('hidden');

//switch player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1EL.classList.toggle('player--active');
  player0EL.classList.toggle('player--active');
};

const restartGame = function () {
  scores = [0, 0]; //This will hold the scores of both players
  currentScore = 0;
  activePlayer = 0; //To figure out which player is active at each point.
  resetScore = 0;
  playing = true;

  Current0El.textContent = '0';
  Current1El.textContent = '0';

  playerProfile0El.textContent = 'Player 1';
  playerProfile1El.textContent = 'Player 2';

  score1El.textContent = '0';
  score2El.textContent = '0';

  diceEl.classList.add('hidden');

  // Removing winner background
  player1EL.classList.remove('player--winner');
  player0EL.classList.remove('player--winner');

  // 2. Set player 1 as the starting player
  player0EL.classList.add('player--active');

  // PLaying game
  playing = true;
};

restartGame();

//Rolling dice functionality
rollDice.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random numbers
    const randomDice = Math.trunc(Math.random() * 6 + 1);

    // 2. Display dice roll
    diceEl.classList.remove('hidden');

    // changes the dice depending on the random number
    diceEl.src = `dice---${randomDice}.png`;

    // 3. Conditions (if the number is 1)
    if (randomDice !== 1) {
      // When the rolled dice is 1, the current value is changed to 0. And the accumulated is held on the dashboard
      currentScore += randomDice;

      /* other than refering to just one player when the dice is 1, we could use string 
        literals to set it to alternate bases on which player is active
        */

      // Current0El.textContent = currentScore; //This is the old way
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //New way
    } else {
      //Switching players
      switchPlayer();
    }
  }
});

holdScore.addEventListener('click', function () {
  if (playing) {
    // Why did this make the buttons not click. I do not understand this
    // 1. Add current score to total score
    scores[activePlayer] += currentScore;

    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector(`#score--${activePlayer}`).textContent =
        'WINS 🏆';
      document.querySelector(`#score--${activePlayer}`).style.textAlign =
        'center';
      diceEl.classList.add('hidden');
    } else {
      //switch player function
      switchPlayer();
    }
  }
});

resetBtn.addEventListener('click', restartGame    
  // Refreshes the current page
  // location.reload();
  
);

// WHAT I DID - days ago
//Rolling dice functionality
// rollDice.addEventListener('click', function(){
//     // 1. Generate random number
//     const randomDice = Math.trunc(Math.random()*6 + 1);

//     // 2. Display dice roll
//     diceEl.classList.remove('hidden');
//     diceEl.src = `dice-${randomDice}.png`;

//     // 3. Condition (is it 1)
//    if (randomDice !== 1){
//        // When random dice is not 1, it inputs the random dice value and holds it.
//        currentScore += randomDice;
//        Current0El.textContent = currentScore;

//    } else if (randomDice === 1){
//     score1El.textContent =  Current0El.textContent;
//     player0.classList.remove('player--active');
//     player1.classList.add('player--active');

//        rollDice.addEventListener('click', function(){
//         const randomDice2 = Math.trunc(Math.random()*6 + 1);

//         dice1El.src = `dice-${randomDice2}.png`;
//         Current0El.textContent = resetScore;

//         newScore += randomDice2;
//         Current1El.textContent = newScore;
//         console.log(newScore);
//        })
//    }
// })
