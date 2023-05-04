
// Close the dropdown container from category
function closeDropdownCategoryBoard() {
    let categoryInputContainer = document.getElementById('inputContainer'); 
    let categoryList = document.getElementById('categoryList');
    categoryList.style.display = "none";
    categoryInputContainer.style.border = "1px solid #D1D1D1";
    categoryInputContainer.style.borderRadius = "10px";
}

// Selected variable for renderAssignToBoardContacts()
async function renderAssignToBoard(cards) {
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    let assignedContactList = document.getElementById('assignedList'); 
    assignedContactList.innerHTML = ""; 
    let users = userAccounts[activeUser]['userContacts'];
    renderAssignToBoardContacts(users, assignedContactList, todo)
}

// Show all Contacts includes with checkboxes
function renderAssignToBoardContacts(users, assignedContactList, todo) {
    for (let i = 0; i < users.length; i++) {
        let userName = users[i]['name'];
        const element = todo.contact;
        const contact = element.includes(userName);
        const checkedAttribute = contact ? 'checked' : '';
        assignedContactList.innerHTML += renderAssignToBoardContactsHTML(userName, checkedAttribute, todo)
    }
}

// Select all chosed Contacts and push them into checkbox
function chooseContactBoard(name, cards) {
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    let inputAssignedContact = document.getElementById('assignInput');
    inputAssignedContact.value = '';
    inputAssignedContact.value = name;
    choosedContact.splice(0);
    let allChekbox = document.querySelectorAll('.checkboxForContacts');
    for (let i = 0; i < allChekbox.length; i++) {
        const checkbox = allChekbox[i];
        if (checkbox.checked) {
            choosedContact.push(checkbox.value);
            renderContactsOverlayChange(todo);
        }
    }
}

// Save all changes to backend
async function saveInputTask(cards) {
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    let newDescription = document.getElementById('inputDescription').value;
    let newDueDate = document.getElementById('date').value;
    todo.description = newDescription;
    todo.dueDate = newDueDate;
    newTitleSave(todo);
    prioritySave(todo);
    contactChoosed(todo);
    chooseSubtasksBoard(todo);
    newTitleSave(todo);
    await saveAndNewRender(cards)
}

// show Overlay and update HTML
async function saveAndNewRender(cards) {
    await saveTasksToBackend()
    await saveUserAccountsToBackend();
    updateHTML()
    showOverlay(cards)
}

// checkes if title new
function newTitleSave(todo) {
    let newTitle = document.getElementById('inputTittle').value;
    if (newTitle == '') {
        newTitle = todo.title;
    }
    todo.title = newTitle;
}

// save choosedConatact for render and save contacts to task
function contactChoosed(todo) {
    if (choosedContact.length === 0) {
        for (let i = 0; i < todo['contact'].length; i++) {
            const element = todo['contact'][i];
            choosedContact.push(element);
        }
    }
    if (!todo.contact.includes(todo.contact)) {
        todo.contact = choosedContact
    }
}

// Show the priority 
function getPriority() {
    let priority;
    let priorityImg;
    if (document.getElementById('prioUrgentBox').classList.contains('bgUrgent')) {
        priority = document.getElementById('prioUrgentBox').innerText;
        priorityImg = "assets/img/urgent.png";
    } else if (document.getElementById('prioMediumBox').classList.contains('bgMedium')) {
        priority = document.getElementById('prioMediumBox').innerText;
        priorityImg = "assets/img/medium.png";
    } else {
        priority = document.getElementById('prioLowBox').innerText;
        priorityImg = "assets/img/low.png";
    }
    return { priority, priorityImg };
}

// change the priority 
function setPriority(todo, priority, priorityImg) {
    todo.priority = priority;
    todo.priorityImg = priorityImg;
}

// Save the priority 
function prioritySave(todo) {
    const { priority, priorityImg } = getPriority();
    setPriority(todo, priority, priorityImg);
}

// Selected if Subtask is done
async function chooseSubtasksBoard(todo) {
    todo.subTaskDone = [];
    let allChekbox = document.querySelectorAll(`.checkedSubTasks`);
    for (let i = 0; i < allChekbox.length; i++) {
        const checkbox = allChekbox[i];
        if (checkbox.checked) {
            todo.subTaskDone.push(checkbox.value);
        }
    }
    await saveTasksToBackend()
    await saveUserAccountsToBackend();
}

// render Subtasks
function renderSubtasksBoard(cards) {
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    let content = document.getElementById('subtasks');
    let subTaskDone = todo.subTaskDone
    content.innerHTML = "";
    for (let j = 0; j < todo['subTask'].length; j++) {
        const showSubTask = todo['subTask'][j];
        const subTaskIsDone = subTaskDone.includes(showSubTask);
        const checkedAttribute = subTaskIsDone ? 'checked' : '';
        content.innerHTML += renderSubtasksBoardHTML(showSubTask, checkedAttribute, j);
    }
}

// Render the progressbar (cards)
async function changeProgressbar(cards) {
    const progress = document.getElementById(`progressBar${cards}`);
    const contant = document.getElementById(`countDone${cards}`);
    const todo = userAccounts[activeUser]['userTasks'].find((item) => item.id === cards);
    const present = todo.subTaskDone.length;
    const result = present ? `${(present * 100) / todo.subTask.length}%` : 0;
    progress.style.width = result;
    contant.innerHTML = `${present}/${todo.subTask.length} Done`;
    if (todo.subTask.length == 0) {
        contant.classList.add('d-none');
    }
}

// Select witch searchinput and checked if its includes
function filterHtml() {
    if (window.innerWidth <= 640) {
        var search = document.getElementById('searchSmall').value;
    } else {
        var search = document.getElementById('search').value;
    }
    search = search.toLowerCase();
    let text = userAccounts[activeUser]['userTasks'];
    for (let i = 0; i < text.length; i++) {
        let element = text[i]['title'];
        element = element.toLowerCase();
        if (element.includes(search)) {
            renderfilter(search, i)
        } }
}

// Render all cards where Search includes title
async function renderfilter(search, j) {
    await loadTasksFromBackend();
    await loadUserAccountsFromBackend();
    let user = userAccounts[activeUser]['userTasks'];
    document.getElementById('toDoContent').innerHTML = '';
    document.getElementById('inProgressContent').innerHTML = '';
    document.getElementById('awaitingFeedbackContent').innerHTML = '';
    document.getElementById('doneContent').innerHTML = '';
    for (let i = 0; i < user.length; i++) {
        const userTasks = user[i];
        cards = userTasks['progress'];
        renderFilterHtml(userTasks, search, cards);
    }
}

// Render search HTML
function renderFilterHtml(userTasks, search, cards) {
    renderFilterHtmlToDo(userTasks, search, cards);
    renderFilterHtmlInProgress(userTasks, search, cards);
    renderFilterHtmlAwaitingFeedback(userTasks, search, cards);
    renderFilterHtmlDone(userTasks, search, cards);
}

// Render search HTML To Do
function renderFilterHtmlToDo(userTasks, search, cards) {
    if (cards == 'To Do' && userTasks['title'].toLowerCase().includes(search)) {
        document.getElementById('toDoContent').innerHTML += generateHTML1(userTasks) + generateHTML2(userTasks), loadForUpdateHTML(userTasks);
    }
}

// Render search HTML in progress
function renderFilterHtmlInProgress(userTasks, search, cards) {
    if (cards == 'In progress' && userTasks['title'].toLowerCase().includes(search)) {
        document.getElementById('inProgressContent').innerHTML += generateHTML1(userTasks) + generateHTML2(userTasks), loadForUpdateHTML(userTasks);
    }
}

// Render search HTML Awaiting Feedback
function renderFilterHtmlAwaitingFeedback(userTasks, search, cards) {
    if (cards == 'Awaiting Feedback' && userTasks['title'].toLowerCase().includes(search)) {
        document.getElementById('awaitingFeedbackContent').innerHTML += generateHTML1(userTasks) + generateHTML2(userTasks), loadForUpdateHTML(userTasks);
    }
}

// Render search HTML Done
function renderFilterHtmlDone(userTasks, search, cards) {
    if (cards == 'Done' && userTasks['title'].toLowerCase().includes(search)) {
        document.getElementById('doneContent').innerHTML += generateHTML1(userTasks) + generateHTML2(userTasks), loadForUpdateHTML(userTasks);
    }
}

// delete a task from backend and update HTML
async function deleteTaskActiveUser(number) {
    let user = userAccounts[activeUser]['userTasks'];
    for (let i = 0; i < user.length; i++) {
        if (user[i].id === number) {
            user.splice(i, 1);
            break;
        }
    }
    await saveTasksToBackend()
    await saveUserAccountsToBackend();
    closeOverlay();
    updateHTML();
}