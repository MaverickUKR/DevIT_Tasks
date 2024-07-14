const passForm = document.getElementById("password-form") as HTMLFormElement;
passForm.addEventListener("submit", function (event: Event) {
  event.preventDefault();
  const passwordElement = document.getElementById(
    "password"
  ) as HTMLInputElement;
  const password = passwordElement.value;
  validatePassword(password);
});

function validatePassword(password: string): void {
  const messageElement = document.getElementById("message") as HTMLDivElement;
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
