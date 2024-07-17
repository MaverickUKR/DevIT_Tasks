const randomNumber = Math.floor(Math.random() * 100) + 1;
const guessForm = document.getElementById("guess-form") as HTMLFormElement;
guessForm.addEventListener("submit", function (event: Event) {
  event.preventDefault();
  const guessElement = document.getElementById("guess") as HTMLInputElement;
  const guess = parseInt(guessElement.value);
  giveFeedback(guess);
});

function giveFeedback(guess: number): void {
  const feedbackElement = document.getElementById("message") as HTMLDivElement;
  if (guess < randomNumber) {
    feedbackElement.textContent = "Загаданное число больше.";
  } else if (guess > randomNumber) {
    feedbackElement.textContent = "Загаданное число меньше.";
  } else {
    feedbackElement.textContent = "Поздравляем! Вы угадали число!";
  }
}
