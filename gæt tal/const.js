const secretNumber = Math.floor(Math.random() * 101);

console.log(secretNumber);

const guessInput = document.querySelector("#guessInput");
const guessButton = document.querySelector("#guessButton");
const feedback = document.querySelector("#feedback");

guessButton.addEventListener("click", function () {
  if (guessInput.value === "") {
    feedback.textContent = "Fejl: Skriv et tal mellem 0 og 100.";
    return;
  }
  const guess = Number(guessInput.value);

  if (guess < secretNumber) {
    feedback.textContent = "Dit gæt er for lavt.";
  } else if (guess > secretNumber) {
    feedback.textContent = "Dit gæt er for højt.";
  } else {
    feedback.textContent = "Du gættede rigtigt! 🎉";

    showConfetti();
  }
});
function showConfetti() {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("span");

    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "vw";

    confetti.style.animationDelay = Math.random() * 2 + "s";

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
}
