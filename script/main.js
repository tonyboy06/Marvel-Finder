let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");

import md5 from '../node_modules/crypt/crypt.js';
const valuee = md5("your_string_to_hash");
console.log(valuee);
const ts = Date.now().toString();
console.log(ts);
const publicKey = 'ac8dbe9a94779d909ed8e13500fd1e6d';      // Replace with your public API key
const privateKey = '8dabef4d319039d346ed99c9adb90c99a0dc74f2';
const hashVal = "ea39ea99d62902d01302407153f5d2cb";    // Replace with your private API key

const [timestamp, apikey, hashValue] = [ts, publicKey, hashVal];


const getResult = async () => {
    if (input.value.trim().length < 1) {
        alert("Input cannot be blank!");
        return;
    }
    showContainer.innerHTML = "";
    const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${input.value}&ts=${timestamp}&apikey=${publicKey}&hash=${hashValue}`;

    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data["results"].forEach(element => {
        showContainer.innerHTML += 
            `<div class="card-container">
                <div class="container-character-image">
                    <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]}" alt="Character Image"/>
                </div>
                <div class="character-name">${element.name}</div>
                <div class="character-description">${element.description}</div>
            </div>`;
    });
};

// Attach getResult to the button click event
button.addEventListener("click", getResult);