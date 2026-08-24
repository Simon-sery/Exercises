"use strict";

let computerensValg;
let brugerensValg;

const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");

const rockBtn = document.querySelector(".rock");
const paperBtn = document.querySelector(".paper");
const scissorsBtn = document.querySelector(".scissors");

const draw = document.querySelector("#draw");
const win = document.querySelector("#win");
const lose = document.querySelector("#lose");

rockBtn.addEventListener("click", rockClicked);

function rockClicked() {
  console.log("Rock Clicked");

  brugerensValg = "rock";

  traefferValg();
}

paperBtn.addEventListener("click", paperClicked);

function paperClicked() {
  console.log("Paper Clicked");

  brugerensValg = "paper";

  traefferValg();
}

scissorsBtn.addEventListener("click", scissorClicked);

function scissorClicked() {
  console.log("Scissor Clicked");

  brugerensValg = "scissors";

  traefferValg();
}

function traefferValg() {
  win.classList.add("hidden");
  lose.classList.add("hidden");
  draw.classList.add("hidden");

  player1.classList.remove("rock", "paper", "scissors");
  player2.classList.remove("rock", "paper", "scissors");

  console.log("brugerensValg:", brugerensValg);

  const tilfaeldigtTal = Math.floor(Math.random() * 3);

  if (tilfaeldigtTal === 0) {
    computerensValg = "rock";
  } else if (tilfaeldigtTal === 1) {
    computerensValg = "paper";
  } else {
    computerensValg = "scissors";
  }

  nedTaelling();
}

function nedTaelling() {
  player1.classList.add("shake");
  player2.classList.add("shake");

  player1.addEventListener("animationend", visValg, { once: true });
}

function visValg() {
  player1.classList.remove("shake");
  player2.classList.remove("shake");

  player1.classList.add(brugerensValg);

  player2.classList.add(computerensValg);

  afgoerResultat();
}

function afgoerResultat() {
  console.log("brugerensValg:", brugerensValg);
  console.log("computerensValg:", computerensValg);

  if (brugerensValg === computerensValg) {
    draw.classList.remove("hidden");
  } else if (
    (brugerensValg === "rock" && computerensValg === "scissors") ||
    (brugerensValg === "paper" && computerensValg === "rock") ||
    (brugerensValg === "scissors" && computerensValg === "paper")
  ) {
    win.classList.remove("hidden");
  } else {
    lose.classList.remove("hidden");
  }
}
