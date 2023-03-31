function login() {
  let email = document.getElementById("login-email-input");
  let password = document.getElementById("login-password-input");

  let user = userAccounts.find(
    (u) => u.userEmail == email.value && u.userPassword == password.value
  );

  if (user) {
    saveActiveUserLocal(user);
    window.location.href = './summary.html'
  }
}

function saveActiveUserLocal(user) {
  let activeUser = user.userId;
  localStorage.setItem("activeUser", activeUser);
  console.log(activeUser);
}
