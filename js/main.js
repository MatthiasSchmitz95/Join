let userAccounts = [];
let activeUser;




async function init(id) {
  await includeHTML();
  highlightSelectedNav(id);
  loadTasksfromBackend();
}

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/**
 * loading tasks from backend
 */
async function loadTasksfromBackend() {
  await downloadFromServer();
  userAccounts = JSON.parse(backend.getItem('userAccounts')) || [];
  console.log('Useraccounts loadet', userAccounts);
}

function highlightSelectedNav(id) {
  setTimeout(() => {
    document.getElementById(`${id}`).classList.add("selected");
  }, 10);
}
