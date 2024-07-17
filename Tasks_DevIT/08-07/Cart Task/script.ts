function setCookie(name: string, value: string): void {
  document.cookie = `${name}=${value}`;
}

function getCookie(name: string): string | undefined {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function addToLocalStorage(): void {
  const inputElement = document.getElementById("input") as HTMLInputElement;
  const inputValue = inputElement.value.trim();
  if (inputValue) {
    const key = `item${localStorage.length + 1}`;
    localStorage.setItem(key, inputValue);
    alert(`You have added ${inputValue} in your list`);

    const list = document.getElementById("list") as HTMLUListElement;
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
    inputElement.value = "";
  } else {
    alert("Input is empty. Nothing was saved.");
  }
}

function loadFromLocalStorage(): void {
  const list = document.getElementById("list") as HTMLUListElement;
  list.innerHTML = ""; // Очищаем предыдущий вывод
  if (localStorage.length === 0) {
    const noItems = document.createElement("li");
    noItems.id = "noItems";
    noItems.textContent = "No text found in LocalStorage.";
    list.appendChild(noItems);
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) as string;
      const value = localStorage.getItem(key);
      if (key && value) {
        const listItem = document.createElement("li");
        listItem.textContent = value;
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
}

function emptyInputValue(): void {
  const list = document.getElementById("list") as HTMLUListElement;
  if (localStorage.length === 0) {
    const noItems = document.createElement("li");
    noItems.id = "noItems";
    noItems.textContent = "No text found in LocalStorage.";
    list.appendChild(noItems);
  }
}

function displayFirstVisitInfo(): void {
  const root = document.getElementById("root") as HTMLDivElement;
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

loadFromLocalStorage();
displayFirstVisitInfo();
