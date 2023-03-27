function loginCheckbox(){
    if (loginChecked) {
        document.getElementById('loginCheckbox').src = './assets/img/unchecked.png';
        loginChecked=false
    }else {
        document.getElementById('loginCheckbox').src = './assets/img/checked.png';
        loginChecked=true
    }
}