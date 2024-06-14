let score = JSON.parse(localStorage.getItem("score")) || {
  Wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();
/*
  if(!score){
    score = {
  Wins : 0,
  losses : 0,
  ties : 0

  };
  }
  */

let isAutoPlaying = false;
let intervalId;
function autoplay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 2000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}
document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("Rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("Paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("Scissors");
});

document.querySelector(".js-auto-play-button").addEventListener("click", () => {
  autoplay();
});
document.querySelector(".js-reset-button").addEventListener("click", () => {
  score.Wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
});
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("Rock");
  } else if (event.key === "p") {
    playGame("Paper");
  } else if (event.key === "s") {
    playGame("Scissors");
  }
});
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "tie";
    } else if (computerMove === "Paper") {
      result = "you lose";
    } else if (computerMove === "Scissors") {
      result = "you win";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "you win";
    } else if (computerMove === "Paper") {
      result = "tie";
    } else if (computerMove === "Scissors") {
      result = "you lose";
    }
  } else if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "you lose";
    } else if (computerMove === "Paper") {
      result = "you win";
    } else if (computerMove === "Scissors") {
      result = "tie";
    }
  }
  if (result === "you win") {
    score.Wins++;
  } else if (result === "you lose") {
    score.losses++;
  } else {
    score.ties++;
  }
  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = ` You
<img src="image/${playerMove}-emoji.png" class="move-icon">
<img src="image/${computerMove}-emoji.png" class="move-icon"> Computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins ${score.Wins} , losses ${score.losses} , ties ${score.ties}`;
}

function pickComputerMove() {
  let computerMove = "";
  let randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
  }
  return computerMove;
}
