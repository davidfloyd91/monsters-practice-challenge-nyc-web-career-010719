const monsterContainer = document.querySelector("#monster-container");
const back = document.querySelector("#back");
const forward = document.querySelector("#forward");
const lastButton = document.querySelector("#last");
let pageNo = 1;

lastButton.addEventListener("click", e => {
  monsterContainer.innerHTML = ``;
  pageNo = 21;
  doAFetch();
})

const createButton = document.querySelector("#submit-button")
  .addEventListener("click", e => {
    // debugger
    e.preventDefault();
    let monsterName = document.querySelector("#name").value
    let monsterAge = document.querySelector("#age").value
    let monsterDesc = document.querySelector("#description").value
    createMonster(monsterName, monsterAge, monsterDesc);
  })


back.addEventListener("click", e => {
  if (pageNo > 1) {
    monsterContainer.innerHTML = ``;
    pageNo--
    doAFetch();
  }
})
forward.addEventListener("click", e => {
  if (pageNo < 21) {
    monsterContainer.innerHTML = ``;
    pageNo++
    doAFetch()
  }
})

function doAFetch() {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNo}`)
    .then(response => response.json())
    .then(parsedResponse => {
      // console.log(parsedResponse);
      parsedResponse.forEach(monster => {
        monsterContainer.innerHTML += `
          <p>Name: ${monster.name}<br>
            Age: ${monster.age}<br>
            Description: ${monster.description}<br><br>
          </p>
        `
      })
    })
  // this is right though??
}

doAFetch()

function createMonster(monsterName, monsterAge, monsterDesc) {
  // Default options are marked with *
    return fetch(`http://localhost:3000/monsters/`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify({name: monsterName, age: monsterAge, description: monsterDesc}), // body data type must match "Content-Type" header
    })
    .then(response => response.json()) // parses response to JSON
}
