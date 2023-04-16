let toDoSummary = 0;
let inProgressSummary = 0;
let awaitingFeedbackSummary = 0;
let doneSummary = 0;
let urgents = 0;

async function setName() {
    await init('summary');
    let userName = userAccounts[activeUser].userName;
    document.getElementById('name').innerHTML = userName;
    //setTasks();
    //setUrgencies();
    //setDos();
}



function setTasks(){
  document.getElementById('task-in-board-nr').innerHTML =   toDoSummary  ;
  document.getElementById('task-in-progress-nr').innerHTML = inProgressSummary;
  document.getElementById('awaiting-feedback-nr').innerHTML = awaitingFeedbackSummary;
}

function setUrgencies(){
  document.getElementById('urgent-nr').innerHTML = urgents;
 // document.getElementById('deadline-date').innerHTML =;
}
/*
function setDos(){
  document.getElementById('do-nr').innerHTML =;
  document.getElementById('done-nr').innerHTML =;
}*/

async function countTasks() {
    await loadTasksFromBackend();
    await loadUserAccountsFromBackend();
    await setName();
    let user = userAccounts[activeUser]['userTasks'];
    for (let i = 0; i < user.length; i++) {
        const userTasks = user[i];
        let urgent = userTasks['priority'];
        cards = userTasks['progress'];
        if (cards == 'To Do') {
            toDoSummary++;
        }
        if (cards == 'In progress') {
            inProgressSummary++;
        }
        if (cards == 'Awaiting Feedback') {
            awaitingFeedbackSummary++;
        }
        if (cards == 'Done') {
            doneSummary++;
        }
        if (urgent == 'Urgent') {
            urgents++;
            
        }
    }
    setTasks();
    setUrgencies();
}
