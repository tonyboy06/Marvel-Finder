let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");

let date = new Date();
console.log(date.getTime());



const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

function displayWords(value) {
  input.value = value;
  removeElements();
}

function removeElements() {
  listContainer.innerHTML = "";
}

input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.length < 2) {
    return false;
  }

  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

  try {
    const response = await fetch(url);
    const jsonData = await response.json();

    if (jsonData.data && jsonData.data.results) {
      jsonData.data.results.forEach((result) => {
        let name = result.name;
        let div = document.createElement("div");
        div.style.cursor = "pointer";
        div.classList.add("autocomplete-items");
        div.setAttribute("onclick", "displayWords('" + name + "')");
        let word = "<b>" + name.substr(0, input.value.length) + "</b>";
        word += name.substr(input.value.length);
        div.innerHTML = `<p class="item">${word}</p>`;
        listContainer.appendChild(div);
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

button.addEventListener("click", async () => {
  if (input.value.trim().length < 1) {
    alert("Input cannot be blank");
    return;
  }

  showContainer.innerHTML = "";
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

  try {
    const response = await fetch(url);
    const jsonData = await response.json();

    if (jsonData.data && jsonData.data.results) {
      let cardsHTML = ''; // Use this to accumulate HTML
      jsonData.data.results.forEach((element) => {
        cardsHTML += `
          <div class="card-container">
            <div class="container-character-image">
              <img src="${element.thumbnail.path}.${element.thumbnail.extension}" />
            </div>
            <div class="character-name">${element.name}</div>
            <div class="character-description">${element.description || 'No description available'}</div>
          </div>`;
      });
      showContainer.innerHTML = cardsHTML; // Set the accumulated HTML
    } else {
      showContainer.innerHTML = '<p>No results found.</p>';
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    showContainer.innerHTML = '<p>Error fetching data. Please try again later.</p>';
  }
});

// Call getResult on window load if needed
window.onload = () => {
  button.click();
};