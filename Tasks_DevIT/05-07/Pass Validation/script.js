document
  .getElementById("password-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const password = document.getElementById("password").value;
    validatePassword(password);
  });

function validatePassword(password) {
  const messageElement = document.getElementById("message");
  const lengthRegex = /.{8,}/;
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*()\-_=+]/;

  if (!lengthRegex.test(password)) {
    messageElement.textContent = "Пароль должен быть не менее 8 символов.";
  } else if (!uppercaseRegex.test(password)) {
    messageElement.textContent =
      "Пароль должен содержать хотя бы одну заглавную букву.";
  } else if (!numberRegex.test(password)) {
    messageElement.textContent = "Пароль должен содержать хотя бы одну цифру.";
  } else if (!specialCharRegex.test(password)) {
    messageElement.textContent =
      "Пароль должен содержать хотя бы один специальный символ.";
  } else {
    messageElement.textContent = "Пароль валидный!";
  }
}
