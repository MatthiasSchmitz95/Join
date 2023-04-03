function login() {
  let email = document.getElementById("login-email-input");
  let password = document.getElementById("login-password-input");

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


function checkRegistration(){

}