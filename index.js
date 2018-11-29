document.addEventListener('DOMContentLoaded', function () {
  getAllMonsters();
  getFormTag().addEventListener('submit', addMonster)
  getBackButton().addEventListener('click', backFifty)
  getForwardButton().addEventListener('click', forwardFifty)
});

// event listener functions

function getFormTag () {
  return document.querySelector('form');
}

function getBackButton () {
  return document.getElementById('back');
}

function getForwardButton () {
  return document.getElementById('forward');
}

// first fifty monsters upon the loading of the page //
function getAllMonsters () {
  fetch('http://localhost:3000/monsters?_page=1&_limit=50')
    .then(response => response.json()) // callback function that takes a response as a parameter, and runs .json() returning a  promise.
    .then(data => {
      data.forEach (monster => {renderMonster(monster)})
    })
}

// monster navigation//

let pageCompass = 1; //serves as the start point for the monsters loaded "_page=1"

function forwardFifty (event) {
  pageCompass += 1;
  console.log(pageCompass)
  clearMonsterContainer();
  fetch(`http://localhost:3000/monsters?_page=${pageCompass}&_limit=50`)
    .then(response => response.json()) // callback function that takes a response as a parameter, and runs .json() returning a  promise.
    .then(data => {
      data.forEach (monster => {renderMonster(monster)})
    })
}

function backFifty () {
  pageCompass -= 1;
  if (pageCompass < 1) {
    pageCompass = 1;
  }
  console.log(pageCompass)
  clearMonsterContainer();
  fetch(`http://localhost:3000/monsters?_page=${pageCompass}&_limit=50`)
    .then(response => response.json()) // callback function that takes a response as a parameter, and runs .json() returning a  promise.
    .then(data => {
      data.forEach (monster => {renderMonster(monster)})
    })
}

function clearMonsterContainer() {
    document.getElementById('monster-container').innerHTML = "";
}

// add new monster functions //
function addMonster (event) {
  event.preventDefault();
  let name = document.querySelector("#name-input").value;
  let age = document.querySelector("#age-input").value;
  let description = document.querySelector("#description-input").value;
  postFetch(name, age, description);
  getFormTag().reset();
}

function postFetch (name, age, description) { // posts the monster to the database
  let data = {
    name: name,
    age: age,
    description: description
  }
  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => { // do something with that data
    renderMonster(data); // adds the monster to the monster container
  })
}

//creates a div and appends it to monster-container
function renderMonster (monster) {
  let newMonster = document.createElement('div');
  newMonster.innerHTML =
  `<h2>${monster.name} </h2>
  <h4>Age: ${monster.age}</h4>
  <p>Bio: ${monster.description}</p>`;
  document.getElementById('monster-container').append(newMonster);
}
