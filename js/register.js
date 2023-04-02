async function signUpUser() {
  let name = document.getElementById("sign-up-name-input").value;
  let email = document.getElementById("sign-up-email-input").value;
  let password = document.getElementById("sign-up-password-input").value;
  let userId = userAccounts.length;
  let userInitials = userNameInitial(name);
  let userColor = randomUserColor();

  let newUser = {
    Username: name,
    userEmail: email,
    userPassword: password,
    userId: userId,
    userInitials: userInitials,
    userColor: userColor,
    userContacts: [],
    userTasks: [],
  };

  userAccounts.push(newUser);
  await saveUserAccountsToBackend();
  document.getElementById("registerBox").classList.remove("display-none");
  setTimeout(backToLogin, 2000);
}

async function setName(){
  await init('summary');
  let userName = userAccounts[0]['userName'];
  document.getElementById('name').innerHTML = userName;
}

function userNameInitial(name) {
  let initials = "";
  let nameSplit = name.split(" ");

  for (let i = 0; i < nameSplit.length; i++) {
    let initial = nameSplit[i].charAt(0);
    initials += initial;
  }
  return initials;
}


