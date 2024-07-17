function setCookie(name, value) {
  document.cookie = `${name}=${value}`;
}

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function addToLocalStorage() {
  const inputValue = document.getElementById("input").value.trim();
  if (inputValue) {
    const key = `item${localStorage.length + 1}`;
    localStorage.setItem(key, inputValue);
    alert(`You have added ${inputValue} in your list`);

    const list = document.getElementById("list");
    const listItem = document.createElement("li");
    listItem.textContent = `${inputValue}`;
    listItem.style.marginBottom = "8px";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = () => {
      localStorage.removeItem(key);
      listItem.remove();
      emptyInputValue();
    };
    deleteBtn.style.marginLeft = "8px";
    listItem.append(deleteBtn);

    list.appendChild(listItem);

    const noItems = document.getElementById("noItems");
    if (noItems) {
      noItems.remove();
    }
    document.getElementById("input").value = "";
  } else {
    alert("Input is empty. Nothing was saved.");
  }
}

function loadFromLocalStorage() {
  const list = document.getElementById("list");
  list.innerHTML = ""; // Очищаем предыдущий вывод
  if (localStorage.length === 0) {
    const noItems = document.createElement("li");
    noItems.id = "noItems";
    noItems.textContent = "No text found in LocalStorage.";
    list.appendChild(noItems);
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      const listItem = document.createElement("li");
      listItem.textContent = `${value}`;
      listItem.style.marginBottom = "8px";

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.onclick = () => {
        localStorage.removeItem(key);
        listItem.remove();
        emptyInputValue();
      };
      deleteBtn.style.marginLeft = "8px";
      listItem.append(deleteBtn);

      list.appendChild(listItem);
    }
  }
}

function emptyInputValue() {
  const list = document.getElementById("list");
  if (localStorage.length === 0) {
    const noItems = document.createElement("li");
    noItems.id = "noItems";
    noItems.textContent = "No text found in LocalStorage.";
    list.appendChild(noItems);
  }
}

function displayFirstVisitInfo() {
  const root = document.getElementById("root");
  const firstVisit = getCookie("firstVisit");
  const firstVisitParagraph = document.createElement("p");
  root.append(firstVisitParagraph);
  if (firstVisit) {
    firstVisitParagraph.textContent = `First visit: ${firstVisit}`;
  } else {
    const now = new Date().toLocaleString();
    setCookie("firstVisit", now);
    firstVisitParagraph.textContent = `First visit: ${now}`;
  }
}
window.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  displayFirstVisitInfo();
});
