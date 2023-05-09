async function signUpUser() {
  let name = document.getElementById("sign-up-name-input").value;
  let email = document.getElementById("sign-up-email-input").value;
  let password = document.getElementById("sign-up-password-input").value;
  let userId = userAccounts.length;
  let userInitials;
  let userColor = randomUserColor();
  let splitName = name.split(" ");
  if (splitName.length !== 2) {
    //console.log("Please enter your first and last name");
    document.getElementById('sign-up-name-input').value = "";
    document.getElementById('sign-up-name-input').placeholder = "enter your first and last name";
  } else {
    for (let i = 0; i < splitName.length; i++) {
      let namePart = splitName[i];
      splitName[i] = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    }
    name = splitName.join(" ");

    userInitials = userNameInitial(name);
    pushNewUser(name, email, password, userId, userInitials, userColor)
    await saveUserAccountsToBackend();
    document.getElementById("registerBox").classList.remove("display-none");
    setTimeout(backToLogin, 1000);
  }
}

function pushNewUser(name, email, password, userId, userInitials, userColor) {
  let newUser = {
    userName: name,
    userEmail: email,
    userPassword: password,
    userId: userId,
    userInitials: userInitials,
    userColor: userColor,
    userContacts: [],
    userTasks: []
  };
  userAccounts.push(newUser);
}


