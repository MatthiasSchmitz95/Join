let toDoSummary = 0;
let inProgressSummary = 0;
let awaitingFeedbackSummary = 0;
let doneSummary = 0;
let urgents = 0;
let dateSummary = [];



 function setName() {
    
    let userName = userAccounts[activeUser].userName;
    document.getElementById('name').innerHTML = userName;
    //setTasks();
    //setUrgencies();
    //setDos();
}


function setTasks() {
    let tasksSummary = toDoSummary+inProgressSummary+awaitingFeedbackSummary;
    document.getElementById('task-in-board-nr').innerHTML = tasksSummary;
    document.getElementById('task-in-progress-nr').innerHTML = inProgressSummary;
    document.getElementById('awaiting-feedback-nr').innerHTML = awaitingFeedbackSummary;
}


function setUrgencies() {
    document.getElementById('urgent-nr').innerHTML = urgents;
    document.getElementById('deadline-date').innerHTML = dateSummary[0];
}


function setDos() {
    document.getElementById('do-nr').innerHTML = toDoSummary;
    document.getElementById('done-nr').innerHTML = doneSummary;
}


function sortDates() {
    dateSummary.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
}


async function countTasks() {
    await init('summary');
    await loadTasksFromBackend();
    await loadUserAccountsFromBackend();
    setName();
    checkingConditions()
    setTasks();
    setUrgencies();
    setDos();
    sortDates();
}


function checkingConditions() {
    let user = userAccounts[activeUser]['userTasks'];
    for (let i = 0; i < user.length; i++) {
        const userTasks = user[i];
        let urgent = userTasks['priority'];
        let date = userTasks['dueDate'];
        cards = userTasks['progress'];
        if (cards == 'To Do') {
            toDoSummary++;
        }
        if (cards == 'done') {
            doneSummary++
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
            dateSummary.push(date);
            urgents++;
        }
    }

}
