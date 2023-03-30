let loginCheckedBox;
function loginCheckbox(){
    if (loginCheckedBox) {
        document.getElementById('loginCheckbox').src = './assets/img/unchecked.png';
        loginCheckedBox=false
    }else {
        document.getElementById('loginCheckbox').src = './assets/img/checked.png';
        loginCheckedBox=true
    }
}

async function renderIndex(){
    renderLogin();
    await loadTasksfromBackend();
}

function renderLogin(){
    document.getElementById('login-container').innerHTML = `
    <div class="login-container" >
        <h1>Log in</h1>
        <div class="line-login"></div>
        <div class="input-container">
            <div class="input-field">
                <input class="input" type="email" name="email" id="email-input" placeholder="Email">
                <img src="./assets/img/email-icon.png">
            </div>
            <div class="input-field">
                <input class="input" type="password" name="password" id="password-input" placeholder="Password">
                <img src="./assets/img/password-icon.png">
            </div>
        </div>
        <div class="remember-check">
            <div  class="check" onclick="loginCheckbox()"><img id="loginCheckbox" src="./assets/img/unchecked.png"></div>
            <span>Remember me</span>
            <a onclick="renderForgotPassword()" href="#">Forgot my password</a>
        </div>
        <div class="login-buttons">
            <div class="btn-dark login-btn">Log in</div>
            <div class="btn-bright guest-login">Guest Log in</div>
        </div>
    </div>
    `
}

function renderSignUp(){
    document.getElementById('not-a-join').classList.toggle('display-none');
    document.getElementById('login-container').innerHTML =``;
    document.getElementById('login-container').innerHTML = `
    <div class="login-container" >
        
        <h1>Sign up</h1>
        <img class="arrow-left-back" src="./assets/img/arrow-left.png" onclick="backToLogin()">
            <div class="line-login"></div>
            <div class="input-container">
                <div class="input-field">
                    <input class="input" type="" name="name" id="name-input" placeholder="Name">
                    <img src="./assets/img/user-icon.png">
                </div>

                <div class="input-field">
                    <input class="input" type="email" name="email" id="email-input" placeholder="Email">
                    <img src="./assets/img/email-icon.png">
                </div>

                <div class="input-field">
                    <input class="input" type="password" name="password" id="password-input" placeholder="Password">
                    <img src="./assets/img/password-icon.png">
                </div>
            </div>

            <div class="btn-dark">Sign up</div>
    </div>    
    `
}

function backToLogin(){
    document.getElementById('not-a-join').classList.toggle('display-none');
    renderLogin();
}

function renderForgotPassword(){
    document.getElementById('not-a-join').classList.toggle('display-none');
    document.getElementById('login-container').innerHTML =``;
    document.getElementById('login-container').innerHTML = `
    <div class="login-container">


    <h1>I forgot my password</h1>
    <img class="arrow-left-back" src="./assets/img/arrow-left.png" onclick="backToLogin()">
    <div class="line-login"></div>

    <div class="input-container">
                <div class="dont-worry-textbox"><span>Don't worry! We will send you an email with the instructions to reset your password.</span>
    </div>

    <div class="input-container">

        <div class="input-field">
            <input class="input" type="email" name="email" id="email-input" placeholder="Email">
            <img src="./assets/img/email-icon.png">
        </div>

        

        <div class="btn-dark">Send me the email</div>


</div>   
`
}