async function signUpUser() {
  let name = document.getElementById("sign-up-name-input").value;
  let email = document.getElementById("sign-up-email-input").value;
  let password = document.getElementById("sign-up-password-input").value;
  let userId = userAccounts.length;
  let userInitials = userNameInitial(name);
  let userColor = randomUserColor();
  let checkInvalidName = name.split(" ");
  if (checkInvalidName.length !== 2) {
    console.log("Please enter your first and last name");
  } else {
    pushNewUser(name, email, password, userId, userInitials, userColor)
    await saveUserAccountsToBackend();
    document.getElementById("registerBox").classList.remove("display-none");
    setTimeout(backToLogin, 1000);
  }
}

function pushNewUser(name, email, password, userId, userInitials, userColor){    
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


