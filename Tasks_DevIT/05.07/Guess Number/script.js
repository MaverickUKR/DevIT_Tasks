const randomNumber = Math.floor(Math.random() * 100) + 1;
document
  .getElementById("guess-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const guess = parseInt(document.getElementById("guess").value);
    giveFeedback(guess);
  });

function giveFeedback(guess) {
  const feedbackElement = document.getElementById("message");
  if (guess < randomNumber) {
    feedbackElement.textContent = "Загаданное число больше.";
  } else if (guess > randomNumber) {
    feedbackElement.textContent = "Загаданное число меньше.";
  } else {
    feedbackElement.textContent = "Поздравляем! Вы угадали число!";
  }
}
