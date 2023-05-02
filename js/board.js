let currentDraggedElement;
let loadOverlay = false;
let loadCircle = false;
let choosedContact = [];
let toDoCount= [];
let inProgressCount= [];
let awaitingCount= [];
let doneCount= [];


function onloadBoard() {
    init('board');
    updateHTML();
    loadActiveUserLocal();

}

// updates the HTML content by loading tasks and user accounts from a backend, emptying arrays, and rendering task cards according to their progress status.
async function updateHTML() {
    await loadTasksFromBackend();
    await loadUserAccountsFromBackend();
    emptyArrays();
    let user = userAccounts[activeUser]['userTasks'];
    document.getElementById('toDoContent').innerHTML = '';
    document.getElementById('inProgressContent').innerHTML = '';
    document.getElementById('awaitingFeedbackContent').innerHTML = '';
    document.getElementById('doneContent').innerHTML = '';
    for (let i = 0; i < user.length; i++) {
        const userTasks = user[i];
        cards = userTasks['progress'];
        renderHTML(cards, userTasks)
    } updateHTMLNon();
}

// updates the HTML content for each category
function renderHTML(cards, userTasks) {
    updateHTMLToDo(cards, userTasks);
    updateHTMLInProgress(cards, userTasks);
    updateHTMLAwaitingFeedback(cards, userTasks);
    updateHTMLDone(cards, userTasks);
}

//emptying arrays
function emptyArrays(){
    toDoCount = [];
    inProgressCount = [];
    awaitingCount = [];
    doneCount = [];
}

// render the HTML content for each category if non tasks in category
function updateHTMLNon(){
    if (toDoCount.length == 0) {
        document.getElementById('toDoContent').innerHTML = `<div class="no-cards"> No Task in To Do </div>`;
    }
    if (inProgressCount.length == 0) {
        document.getElementById('inProgressContent').innerHTML = `<div class="no-cards"> No Task in Progress </div>`;
    }
    if (awaitingCount.length == 0) {
        document.getElementById('awaitingFeedbackContent').innerHTML = `<div class="no-cards"> No Task in Awaiting Feedback </div>`;
    }
    if (doneCount.length == 0) {
        document.getElementById('doneContent').innerHTML = `<div class="no-cards"> No Task in Done </div>`;
    }
}

//  render the HTML content for To Do
function updateHTMLToDo(cards, userTasks) {
    if (cards == 'To Do') {
        document.getElementById('toDoContent').innerHTML += generateHTML1(userTasks) + generateHTML2(userTasks), loadForUpdateHTML(userTasks);
        toDoCount ++;
    }
}

//  render the HTML content for In progress
function updateHTMLInProgress(cards, userTasks) {
    if (cards == 'In progress') {
        document.getElementById('inProgressContent').innerHTML += generateHTML1(userTasks) + generateHTML2(userTasks), loadForUpdateHTML(userTasks);
        inProgressCount ++;
    }
}

//  render the HTML content for Awaiting Feedback
function updateHTMLAwaitingFeedback(cards, userTasks) {
    if (cards == 'Awaiting Feedback') {
        document.getElementById('awaitingFeedbackContent').innerHTML += generateHTML1(userTasks) + generateHTML2(userTasks), loadForUpdateHTML(userTasks);
        awaitingCount ++;
    }
}

//  render the HTML content for Done
function updateHTMLDone(cards, userTasks) {
    if (cards == 'Done') {
        document.getElementById('doneContent').innerHTML += generateHTML1(userTasks) + generateHTML2(userTasks), loadForUpdateHTML(userTasks);
        doneCount ++;
    }
}

// load all informatoins for tasks
async function loadForUpdateHTML(userTasks) {
    priorityImgCard(userTasks);
    changeBackgroundColor(userTasks);
    SelectForRenderUserInitiales(userTasks);
    changeProgressbar(userTasks['id']);
}

// Select all informatoins for userinitiales
async function SelectForRenderUserInitiales(cards) {
    const { id, contact } = cards;
    const contactElem = document.getElementById(`userInitiales${id}`);
    contactElem.innerHTML = '';
    const user = userAccounts[activeUser].userContacts;
    renderUserInitiales(id, contact, contactElem, user)
}

// Render contactsletter on cards (tasks)
function renderUserInitiales(id, contact, contactElem, user) {
    const userWithContacts = user.filter(({ name }) => contact.includes(name));
    const userContactsLength = userWithContacts.length;
    const userToDisplay = userContactsLength <= 3 ? userWithContacts : userWithContacts.slice(0, 2);
    userToDisplay.forEach((user, index) => {
        const idStr = id.toString() + index.toString();
        contactElem.innerHTML += renderUserInitialeHTML1(idStr, user);
        changeBackgroundCircle(`circle${idStr}`, user.color);
    });
    if (userContactsLength > 3) {
        const count = userContactsLength - 2;
        const idStr = id.toString() + '2';
        contactElem.innerHTML += renderUserInitialeHTML2(idStr, count);
    }
}

// Change Backgroundcolor from letters
function changeBackgroundCircle(id, color) {
    const backgroundCircle = document.getElementById(id);
    backgroundCircle.style.backgroundColor = color;
}

// Change Backgroundcolor from headline
function changeBackgroundColor(cards) {
    let background = document.getElementById(`backgroundColor${cards['id']}`);
    let color = cards['categoryColor'];
    background.style.backgroundColor = `${color}`;
}

// Show the priority for cards
function priorityImgCard(cards) {
    let prio = document.getElementById(`priorityImage${cards['id']}`);
    let card = cards['priority'];
    if (card == 'Urgent') {
        prio.innerHTML = '<img src="assets/img/urgent.png">';
    } else if (card == 'Medium') {
        prio.innerHTML = '<img src="assets/img/medium.png">';
    } else {
        prio.innerHTML = '<img src="assets/img/low.png">';
    }
}

// Start drag and drop
function startDragging(id) {
    currentDraggedElement = id;
    document.getElementById('bodyBoard').style.backgroundColor = 'rgb(0,0,0,0.1)';
    document.getElementById(`dragMe${id}`).classList.add('dragging');
}

// Allow drag and drop
function allowDrop(ev) {
    ev.preventDefault();
}

// Save the new catergorry and update HTML
async function moveTo(category) {
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === currentDraggedElement);
    todo['progress'] = category;
    await saveTasksToBackend();
    await saveUserAccountsToBackend();
    document.getElementById('bodyBoard').style.backgroundColor = 'rgb(246,247,248)';
    updateHTML();
}

// Show overlay for more informations
function showOverlay(cards) {
    calcScrollTo();
    document.getElementById('bodyBoard').classList.add('noscroll');
    document.getElementById('kanban').classList.add('display-none');
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    document.getElementById('overlay-background').classList.add('overlay-background');
    let overlay = document.getElementById('overlay');
    overlay.classList.remove('d-none');
    overlay.innerHTML = renderShowOverlay1(todo, cards) + renderShowOverlay2(todo) + renderShowOverlay3(cards);
    loadOverlay = true;
    generateAssignedTo(todo);
    changeBackgroundOverlay(todo)
}

// window height is automatically by 0
function calcScrollTo() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Change Background from headline
function changeBackgroundOverlay(cards) {
    let background = document.getElementById(`overlayDepartment${cards['id']}`);
    let color = cards['categoryColor'];
    background.style.backgroundColor = `${color}`;
}

// selectet informations for generateAssignedToHTML() and  changeBackgroundCircleOverlay()
function generateAssignedTo(todo) {
    let contacts = document.getElementById('assignedTo');
    let user = userAccounts[activeUser]['userContacts'];
    for (let i = 0; i < todo.contact.length; i++) {
        const element = todo.contact[i];
        for (let j = 0; j < user.length; j++) {
            const users = user[j];
            let userLetter = users['letters'];
            let userName = users['name']
            if (userName.includes(element)) {
                contacts.innerHTML += generateAssignedToHTML(j, userLetter, element), changeBackgroundCircleOverlay(users, j)
            }
        }
    }
}

// Change Backgroundcolor from letters
function changeBackgroundCircleOverlay(users, j) {
    let background = document.getElementById(`changeCircleOverlay${j}`);
    let color = users['color'];
    background.style.background = `${color}`;
}

// Show overlay for change informations
async function showOverlayChange(cards) {
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    let overlay = document.getElementById('overlay');
    document.getElementById('kanban').classList.add('display-none');
    overlay.innerHTML = showOverlayChangeHTML(todo, cards);
    insertPriority(cards);
    renderSubtasksBoard(cards);
    chanceTextarea(cards);
    renderContactsOverlayChange(todo);
    await updateCalender();
    document.getElementById('kanban').classList.add('display-none');
}

// render showOverlayChangeHTML
function showOverlayChangeHTML(todo, cards) {
    return showOverlayChangeHTML1(todo)+
    showOverlayChangeHTML2(todo)+
    showOverlayChangeHTML3()+
    showOverlayChangeHTML4(cards);
}

// Style textarea
function textAreaAdjust(element) {
    element.style.height = "1px";
    element.style.height = (25 + element.scrollHeight) + "px";
}

// Close Overlay
function closeOverlay() {
    if (loadOverlay) {
        let overlay = document.getElementById('overlay');
        overlay.classList.add('d-none');
        document.getElementById('overlay-background').classList.remove('overlay-background');
        document.getElementById('bodyBoard').classList.remove('noscroll');
        document.getElementById('kanban').classList.remove('display-none');
    }
}

// Overlay should not be closed 
function doNotClose(event) {
    event.stopPropagation();
}

// Show urgent button
function insertUrgent() {
    document.getElementById('prioUrgentBox').classList.toggle('bgUrgent');
    document.getElementById('prioMediumBox').classList.remove('bgMedium');
    document.getElementById('prioLowBox').classList.remove('bgLow');
    /*img-color*/
    document.getElementById('prioUrgentImg').classList.add('whitecolor');
    document.getElementById('prioMediumImg').classList.remove('whitecolor');
    document.getElementById('prioLowImg').classList.remove('whitecolor');
}

// Show medium button
function insertMedium() {
    document.getElementById('prioMediumBox').classList.toggle('bgMedium');
    document.getElementById('prioLowBox').classList.remove('bgLow');
    document.getElementById('prioUrgentBox').classList.remove('bgUrgent');
    /*img-color*/
    document.getElementById('prioMediumImg').classList.add('whitecolor');
    document.getElementById('prioUrgentImg').classList.remove('whitecolor');
    document.getElementById('prioLowImg').classList.remove('whitecolor');
}

// Show low button
function insertLow() {
    document.getElementById('prioLowBox').classList.toggle('bgLow');
    document.getElementById('prioUrgentBox').classList.remove('bgUrgent');
    document.getElementById('prioMediumBox').classList.remove('bgMedium');
    /*img-color*/
    document.getElementById('prioLowImg').classList.add('whitecolor');
    document.getElementById('prioUrgentImg').classList.remove('whitecolor');
    document.getElementById('prioMediumImg').classList.remove('whitecolor');
}

// reads the priortiy and show the right button
function insertPriority(cards) {
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    if (todo.priority == 'Urgent') {
        insertUrgent()
    } else if (todo.priority == 'Medium') {
        insertMedium()
    } else {
        insertLow()
    }
}

// Textarea is not possible to move with the mouse
function chanceTextarea(cards) {
    document.addEventListener("DOMContentLoaded", function () {
        var textarea = document.getElementById(`inputDescription${cards}`);
        var placeholder = textarea.getAttribute("placeholder");
        var numLines = (placeholder.match(/\n/g) || []).length + 1;
        textarea.setAttribute("rows", numLines);
    });
}

// show the container for contacts to assign 
function dropDownAssignToBoard(cards) {
    let assignedList = document.getElementById('assignedList');
    let assignToInputContainer = document.getElementById('contactInputContainer'); 
    if (assignedList.style.display == "block") { 
        assignedList.style.display = "none"; 
        assignToInputContainer.style.border = "1px solid #D1D1D1"; 
        assignToInputContainer.style.borderRadius = "10px"; 
    } else { 
        assignedList.style.display = "block";   
        assignToInputContainer.style.borderBottom = "none"; 
        assignToInputContainer.style.borderRadius = "10px 10px 0 0"; 
        renderAssignToBoard(cards); 
    }
    closeDropdownCategoryBoard();
}

// Shows the contacts that are assign to the task
function renderContactsOverlayChange(cards) {
    let contant = document.getElementById('contactOverlayChange');
    contant.innerHTML = '';
    const { id, contact } = cards;
    const user = userAccounts[activeUser].userContacts;
    if (choosedContact.length == 0) {
        renderContactsWithContacts(id, contact, contant, user);
    }
    if (choosedContact.length >= 1) {
        renderContactsChoosedContacts(id, contact, contant, user);
    }
}

// render contacts and checkboxes
function renderContactsChoosedContacts(id, contact, contant, user) {
    const userWithContacts = user.filter(({ name }) => choosedContact.includes(name));
    userWithContacts.forEach((user, index) => {
        const idStr = id.toString() + index.toString();
        contant.innerHTML += renderContactsOverlayChangeHTML(idStr, user);
        changeBackgroundCircle(`round${idStr}`, user.color);
    })
}

// render contacts and checkboxes
function renderContactsWithContacts(id, contact, contant, user) {
    const userWithContacts = user.filter(({ name }) => contact.includes(name));
    userWithContacts.forEach((user, index) => {
        const idStr = id.toString() + index.toString();
        contant.innerHTML += renderContactsOverlayChangeHTML(idStr, user);
        changeBackgroundCircle(`round${idStr}`, user.color);
    })
}