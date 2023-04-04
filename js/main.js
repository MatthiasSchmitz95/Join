let activeUser;

async function init(id) {
  await includeHTML();
  highlightSelectedNav(id);
  await loadUserAccountsFromBackend();
  loadActiveUserLocal();
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
 * loading user accounts from backend
 */
async function loadUserAccountsFromBackend() {
  await downloadFromServer();
  userAccounts = JSON.parse(backend.getItem('userAccounts')) || [];
  console.log('Useraccounts loadet', userAccounts);
}

async function loadTasksFromBackend() {
  await downloadFromServer();
  tasks = JSON.parse(backend.getItem('tasks')) || [];
  console.log('Tasks loadet', tasks);
}

async function saveUserAccountsToBackend(){
  await backend.setItem('userAccounts', JSON.stringify(userAccounts));
}

async function saveTasksToBackend(){
  await backend.setItem('tasks', JSON.stringify(tasks));
}

function loadActiveUserLocal() {
  activeUser = localStorage.getItem('activeUser');
  console.log('activeUserID = ', activeUser);
}



function highlightSelectedNav(id) {
  setTimeout(() => {
    document.getElementById(`${id}`).classList.add("selected");
  }, 10);
}
