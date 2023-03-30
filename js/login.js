let loginCheckedBox;
function loginCheckbox() {
  if (loginCheckedBox) {
    document.getElementById("loginCheckbox").src = "./assets/img/unchecked.png";
    loginCheckedBox = false;
  } else {
    document.getElementById("loginCheckbox").src = "./assets/img/checked.png";
    loginCheckedBox = true;
  }
}

async function renderIndex() {
  renderLogin();
  await loadUserAccountsFromBackend();
}

function renderLogin() {
  document.getElementById("login-container").innerHTML = `
    <form class="login-container" >
        <h1>Log in</h1>
        <div class="line-login"></div>
        <div class="input-container">
            <div class="input-field">
                <input required class="input" type="email" name="email" id="email-input" placeholder="Email">
                <img src="./assets/img/email-icon.png">
            </div>
            <div class="input-field">
                <input required class="input" type="password" name="password" id="password-input" placeholder="Password">
                <img src="./assets/img/password-icon.png">
            </div>
        </div>
        <div class="remember-check">
            <div  class="check" onclick="loginCheckbox()"><img id="loginCheckbox" src="./assets/img/unchecked.png"></div>
            <span>Remember me</span>
            <a onclick="renderForgotPassword()" href="#">Forgot my password</a>
        </div>
        <div class="login-buttons">
            <button class="btn-dark login-btn">Log in</button>
            <div class="btn-bright guest-login">Guest Log in</div>
        </div>
    </form>
    `;
}

function renderSignUp() {
  document.getElementById("not-a-join").classList.toggle("display-none");
  document.getElementById("login-container").innerHTML = ``;
  document.getElementById("login-container").innerHTML = `
    <form onsubmit="signUpUser(); return false" class="login-container" >
        <h1>Sign up</h1>
        <img class="arrow-left-back" src="./assets/img/arrow-left.png" onclick="backToLogin()">
            <div class="line-login"></div>
            <div class="input-container">
                <div class="input-field">
                    <input required class="input" type="" name="name" id="sign-up-name-input" placeholder="Name">
                    <img src="./assets/img/user-icon.png">
                </div>

                <div class="input-field">
                    <input required class="input" type="email" name="email" id="sign-up-email-input" placeholder="Email">
                    <img src="./assets/img/email-icon.png">
                </div>

                <div class="input-field">
                    <input required minlength="5" class="input" type="password" name="password" id="sign-up-password-input" placeholder="Password">
                    <img src="./assets/img/password-icon.png">
                </div>
            </div>
            <button class="btn-dark">Sign up</button>
    </form>    
    `;
}

function backToLogin() {
  document.getElementById("not-a-join").classList.toggle("display-none");
  renderLogin();
}

function renderForgotPassword() {
  document.getElementById("not-a-join").classList.toggle("display-none");
  document.getElementById("login-container").innerHTML = ``;
  document.getElementById("login-container").innerHTML = `
    <form class="login-container">
    <h1>I forgot my password</h1>
    <img class="arrow-left-back" src="./assets/img/arrow-left.png" onclick="backToLogin()">
    <div class="line-login"></div>
    <div class="input-container">
        <div class="dont-worry-textbox"><span>Don't worry! We will send you an email with the instructions to reset your password.</span>
    </div>
    <div class="input-container">
        <div class="input-field">
            <input required class="input" type="email" name="email" id="email-input" placeholder="Email">
            <img src="./assets/img/email-icon.png">
        </div>
        <div class="btn-dark">Send me the email</div>
</div>   
`;
}

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

  console.log(newUser);
  userAccounts.push(newUser);
  await saveUserAccountsToBackend();
  backToLogin();
}

function userNameInitial(name) {
  let initials = "";
  let nameSplit = name.split(" ");
  console.log(nameSplit);

  for (let i = 0; i < nameSplit.length; i++) {
    let initial = nameSplit[i].charAt(0);
    initials += initial;
  }
  return initials;
}

function randomUserColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let rgbColor = `rgb(${r},${g},${b},)`;
  return rgbColor;
}
