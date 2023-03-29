let userAccounts = [];
let activeUser;
setURL('https://gruppenarbeit-504-join.developerakademie.net/smallest_backend_ever');



async function init(id) {
  
  await includeHTML();
  highlightSelectedNav(id);
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

function highlightSelectedNav(id) {
  setTimeout(() => {
    document.getElementById(`${id}`).classList.add("selected");
  }, 10);
}
