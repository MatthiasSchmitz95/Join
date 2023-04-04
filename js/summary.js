async function setName(){
    await init('summary');
    let userName = userAccounts[activeUser].userName;
    document.getElementById('name').innerHTML = userName;
    //setTasks();
    //setUrgencies();
    //setDos();
  }


  /*
function setTasks(){
    document.getElementById('task-in-board-nr').innerHTML =     ;
    document.getElementById('task-in-progress-nr').innerHTML = ;
    document.getElementById('awaiting-feedback-nr').innerHTML = ;
}

function setUrgencies(){
    document.getElementById('urgent-nr').innerHTML =;
    document.getElementById('deadline-date').innerHTML =;
}

function setDos(){
    document.getElementById('do-nr').innerHTML =;
    document.getElementById('done-nr').innerHTML =;
}*/