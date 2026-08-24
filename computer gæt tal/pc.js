let min = 0;
let max = 100;
let guess;

const guessText = document.querySelector("#guess");

const startButton = document.querySelector("#startButton");
const tooLowButton = document.querySelector("#tooLowButton");
const tooHighButton = document.querySelector("#tooHighButton");
const correctButton = document.querySelector("#correctButton");

const message = document.querySelector("#message");

startButton.addEventListener("click", function () {
  min = 0;
  max = 100;

  guess = Math.floor((min + max) / 2);

  guessText.textContent = guess;

  message.textContent = "";
});

tooLowButton.addEventListener("click", function () {
  min = guess + 1;

  guess = Math.floor((min + max) / 2);

  guessText.textContent = guess;
});

tooHighButton.addEventListener("click", function () {
  max = guess - 1;

  guess = Math.floor((min + max) / 2);

  guessText.textContent = guess;
});

correctButton.addEventListener("click", function () {
  message.textContent = "🎉 Jeg gættede dit tal!";
});
