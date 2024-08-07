const form = document.getElementById("form");
const input = document.getElementById("input");
const imageContainer = document.getElementById("imageContainer");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData();
  const file = input.files[0];

  if (file) {
    formData.append("image", file);

    fetch("http://localhost:3000/photos", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.url) {
          const img = document.createElement("img");
          img.src = data.url;
          img.alt = "Uploaded Image";
          imageContainer.innerHTML = "";
          imageContainer.appendChild(img);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    alert("Please select a file to upload.");
  }
});
