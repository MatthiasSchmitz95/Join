let loginChecked;

async function init(id){
    await includeHTML();
    highlightSelectedNav(id)
}


function highlightSelectedNav(id){
    setTimeout(() => {
        document.getElementById(`${id}`).classList.add("selected");  
    }, 10);
}

function loginCheckbox(){
    if (loginChecked) {
        document.getElementById('loginCheckbox').src = './assets/img/unchecked.png';
        loginChecked=false
    }else {
        document.getElementById('loginCheckbox').src = './assets/img/checked.png';
        loginChecked=true
    }
}