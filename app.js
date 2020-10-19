/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// variables for the Game
var scores, roundScore, dice, gamePlaying, winScore;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //set winning score

    var scoreInput = document.querySelector(".win-score").value;
    scoreInput <= 0 ? (winScore = scoreInput = 20) : (winScore = scoreInput);
    //1.Generate Random number
    dice = Math.floor(Math.random() * 6) + 1;

    //Display the result
    var diceDom = document.querySelector(".dice");
    diceDom.style.display = "block";
    diceDom.src = "./img/dice-" + dice + ".png";

    //UPDATE THE ROUND SCORE IF THE ROLLED NUMBER IS NOT A 1
    if (dice !== 1) {
      //add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //next player
      //setround score back to zero
      switchPlayer();
    }
  }
});

//adding round score to score

document.querySelector(".btn-hold").addEventListener("click", function () {
  //add roundscore to score
  scores[activePlayer] += roundScore;

  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= winScore) {
    win();
  } else {
    //switch player
    //setround score back to zero
    switchPlayer();
  }
});

document.querySelector(".btn-new").addEventListener("click", () => {
  init();
});

function switchPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  //setround score back to zero
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  winScore = 20;

  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
}

function win() {
  document.getElementById("name-" + activePlayer).textContent = "WINNER !";
  document.getElementById("name-" + activePlayer).style.color = "red";
  roundScore = 0;
  gamePlaying = false;
}

//selecting the active player and displaying dynamic content in the current score

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelecto('#current-' + activePlayer).innerHTML = "<em>" + dice + "</em>"

// var X = document.querySelector('#score-0').textContent;
