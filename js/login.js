function login() {
  let email = document.getElementById("login-email-input");
  let password = document.getElementById("login-password-input");

  checkCorrectLogin(email, password)
}

function checkCorrectLogin(email, password){
  let user = userAccounts.find((u) => u.userEmail == email.value);
  if (user) {
    if(user.userPassword == password.value){
      saveActiveUserLocal(user);
      window.location.href = './summary.html'
    }else{
      console.log('the password is incorrect, please try again')
    }
  } else {
    console.log('the email is wrong, please try again')
  }
}

function saveActiveUserLocal(user) {
  let activeUser = user.userId;
  localStorage.setItem("activeUser", activeUser);
  console.log(activeUser);
}

function guestLogin(){
  let activeUser = userAccounts[0].userId;
  localStorage.setItem("activeUser", activeUser);
  window.location.href = './summary.html'
}