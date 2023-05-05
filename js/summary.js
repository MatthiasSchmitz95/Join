let toDoSummary = 0;
let inProgressSummary = 0;
let awaitingFeedbackSummary = 0;
let doneSummary = 0;
let urgents = 0;
let dateSummary = [];
loginT=true;
localStorage.setItem('login', t);


function greetingsResponsive() {
    if (window.innerWidth < 1316)  {
        document.getElementById('greeting-container').classList.add('responsive-greet');

    }
}




function setName() {

    let userName = userAccounts[activeUser].userName;
    document.getElementById('name').innerHTML = userName;
}


function setTasks() {
    let tasksSummary = toDoSummary + inProgressSummary + awaitingFeedbackSummary + doneSummary;
    document.getElementById('task-in-board-nr').innerHTML = tasksSummary;
    document.getElementById('task-in-progress-nr').innerHTML = inProgressSummary;
    document.getElementById('awaiting-feedback-nr').innerHTML = awaitingFeedbackSummary;
}


function setUrgencies() {
    document.getElementById('urgent-nr').innerHTML = urgents;
    const date = dateSummary[0];
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    if (dateSummary.length == 0) {
        document.getElementById('deadline-date').innerHTML = 'no deadlines';
    } else {
        document.getElementById('deadline-date').innerHTML = `${month} ${day}, ${year}`;
    }
}


function setDos() {
    document.getElementById('do-nr').innerHTML = toDoSummary;
    document.getElementById('done-nr').innerHTML = doneSummary;
}


function sortDates() {
    dateSummary.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
}

function getTime() {
    const date = new Date();
    let t = date.getHours();
    console.log(t);
    if (t > 4.59 && t < 12) {
        document.getElementById('greeting').innerHTML = 'Good morning,';
    }
    if (t > 11.59 && t < 18) {
        document.getElementById('greeting').innerHTML = 'Good afternoon,';
    }
    if (t > 17.59 || t === 0 || t > 0 && t < 5) {
        document.getElementById('greeting').innerHTML = 'Good evening,';
    }
}

async function initSummary() {
    await init('summary');
    await loadTasksFromBackend();
    await loadUserAccountsFromBackend();
    greetingsResponsive();
    getTime();
    setName();
    checkingConditions();
    sortDates();
    setTasks();
    setUrgencies();
    setDos();

}


function checkingConditions() {
    let user = userAccounts[activeUser]['userTasks'];
    for (let i = 0; i < user.length; i++) {
        const userTasks = user[i];
        let urgent = userTasks['priority'];
        let date = new Date(userTasks['dueDate']);
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
        if (urgent == 'Urgent' && cards !== 'Done') {
            dateSummary.push(date);
            urgents++;
        }
    }

}
