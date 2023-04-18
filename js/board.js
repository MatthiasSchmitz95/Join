let currentDraggedElement;
let loadOverlay = false;
let loadCircle = false;
let choosedContact = []; //an Array to save the checked Contacts with checkbox


function onloadBoard() {
    init('board');
    updateHTML();
    loadActiveUserLocal();
   
}


async function updateHTML() {
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
        renderHTML(cards, userTasks)
    }
}


function renderHTML(cards, userTasks){
    updateHTMLToDo(cards, userTasks);
    updateHTMLInProgress(cards, userTasks);
    updateHTMLAwaitingFeedback(cards, userTasks);
    updateHTMLDone(cards, userTasks);
}


function updateHTMLToDo(cards, userTasks){
    if (cards == 'To Do') {
        document.getElementById('toDoContent').innerHTML += generateHTML1(userTasks) + generateHTML2(userTasks), loadForUpdateHTML(userTasks);
    }
}


function updateHTMLInProgress(cards, userTasks){
    if (cards == 'In progress') {
        document.getElementById('inProgressContent').innerHTML += generateHTML1(userTasks) + generateHTML2(userTasks), loadForUpdateHTML(userTasks);           
    }
}


function updateHTMLAwaitingFeedback(cards, userTasks){
    if (cards == 'Awaiting Feedback') {
        document.getElementById('awaitingFeedbackContent').innerHTML += generateHTML1(userTasks) + generateHTML2(userTasks), loadForUpdateHTML(userTasks);
    }
}


function  updateHTMLDone(cards, userTasks){
    if (cards == 'Done') {
        document.getElementById('doneContent').innerHTML += generateHTML1(userTasks) + generateHTML2(userTasks), loadForUpdateHTML(userTasks);   
    }
}


async function  loadForUpdateHTML(userTasks){
    priorityImgCard(userTasks);
    changeBackgroundColor(userTasks);
    SelectForRenderUserInitiales(userTasks);
    changeProgressbar(userTasks['id']);
}


async function SelectForRenderUserInitiales(cards) {
    const { id, contact } = cards;
    const contactElem = document.getElementById(`userInitiales${id}`);
    contactElem.innerHTML = '';
    const user = userAccounts[activeUser].userContacts;
    renderUserInitiales( id, contact, contactElem, user)
}


function renderUserInitiales(id, contact, contactElem, user){
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


function changeBackgroundCircle(id, color) {
    const backgroundCircle = document.getElementById(id);
    backgroundCircle.style.backgroundColor = color;
}


function changeBackgroundColor(cards) {
    let background = document.getElementById(`backgroundColor${cards['id']}`);
    let color = cards['categoryColor'];
    background.style.backgroundColor = `${color}`;
}


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


function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


async function moveTo(category) {
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === currentDraggedElement);
    todo['progress'] = category;
    await saveTasksToBackend();
    await saveUserAccountsToBackend();
    updateHTML();
}


function showOverlay(cards) {
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    document.getElementById('overlay-background').classList.add('overlay-background');
    let overlay = document.getElementById('overlay');
    overlay.classList.remove('d-none');
    overlay.innerHTML = renderShowOverlay1(todo, cards)+renderShowOverlay2(todo)+renderShowOverlay3(cards);
    loadOverlay = true;
    generateAssignedTo(todo);
    changeBackgroundOverlay(todo)
}


function changeBackgroundOverlay(cards) {
    let background = document.getElementById(`overlayDepartment${cards['id']}`);
    let color = cards['categoryColor'];
    background.style.backgroundColor = `${color}`;
}


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
                contacts.innerHTML += generateAssignedToHTML(j, userLetter, element),changeBackgroundCircleOverlay(users, j)   
            }
        }
    }
}


function changeBackgroundCircleOverlay(users, j) {
    let background = document.getElementById(`changeCircleOverlay${j}`);
    let color = users['color'];
    background.style.background = `${color}`;
}


function showOverlayChange(cards) {
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    let overlay = document.getElementById('overlay');
    let HTML1 = showOverlayChangeHTML1(todo);
    let HTML2 = showOverlayChangeHTML2(todo);
    let HTML3 =showOverlayChangeHTML3();
    let HTML4 =showOverlayChangeHTML4(cards)
    overlay.innerHTML = HTML1 + HTML2 + HTML3 + HTML4;
    insertPriority(cards);
    renderSubtasksBoard(cards);
    chanceTextarea(cards);
    updateCalender();
}


function textAreaAdjust(element) {
    element.style.height = "1px";
    element.style.height = (25 + element.scrollHeight) + "px";
}


function closeOverlay() {
    if (loadOverlay) {
        let overlay = document.getElementById('overlay');
        overlay.classList.add('d-none');
        document.getElementById('overlay-background').classList.remove('overlay-background');
    }
}


function doNotClose(event) {
    event.stopPropagation();
}


function insertUrgent() {
    document.getElementById('prioUrgentBox').classList.toggle('bgUrgent');
    document.getElementById('prioMediumBox').classList.remove('bgMedium');
    document.getElementById('prioLowBox').classList.remove('bgLow');
    /*img-color*/
    document.getElementById('prioUrgentImg').classList.add('whitecolor');
    document.getElementById('prioMediumImg').classList.remove('whitecolor');
    document.getElementById('prioLowImg').classList.remove('whitecolor');
}


function insertMedium() {
    document.getElementById('prioMediumBox').classList.toggle('bgMedium');
    document.getElementById('prioLowBox').classList.remove('bgLow');
    document.getElementById('prioUrgentBox').classList.remove('bgUrgent');
    /*img-color*/
    document.getElementById('prioMediumImg').classList.add('whitecolor');
    document.getElementById('prioUrgentImg').classList.remove('whitecolor');
    document.getElementById('prioLowImg').classList.remove('whitecolor');
}


function insertLow() {
    document.getElementById('prioLowBox').classList.toggle('bgLow');
    document.getElementById('prioUrgentBox').classList.remove('bgUrgent');
    document.getElementById('prioMediumBox').classList.remove('bgMedium');
    /*img-color*/
    document.getElementById('prioLowImg').classList.add('whitecolor');
    document.getElementById('prioUrgentImg').classList.remove('whitecolor');
    document.getElementById('prioMediumImg').classList.remove('whitecolor');
}


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

function chanceTextarea(cards) {

    document.addEventListener("DOMContentLoaded", function () {
        var textarea = document.getElementById(`inputDescription${cards}`);
        var placeholder = textarea.getAttribute("placeholder");
        var numLines = (placeholder.match(/\n/g) || []).length + 1;
        textarea.setAttribute("rows", numLines);
    });

}


function dropDownAssignToBoard(cards) {
    let assignedList = document.getElementById('assignedList'); //get the id of AssignedList container to render contacts 
    let assignToInputContainer = document.getElementById('contactInputContainer'); //get the container for AssignTo Input Field
    if (assignedList.style.display == "block") { //the Container for Contacts is open ?
        assignedList.style.display = "none"; //hide the Container for Contacts 
        assignToInputContainer.style.border = "1px solid #D1D1D1"; //shows all border
        assignToInputContainer.style.borderRadius = "10px"; //set all border radius to 10px
    } else { //the Container for Contacts is closed ?
        assignedList.style.display = "block"; //shows the Container for Contacts  
        assignToInputContainer.style.borderBottom = "none"; //hide the AssignedTo container Border bottom
        assignToInputContainer.style.borderRadius = "10px 10px 0 0"; //shows AssignedTo container top-left top-right border radius
        renderAssignToBoard(cards); //show or render the contacts
    }
     closeDropdownCategoryBoard();
}

