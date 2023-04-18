let currentDraggedElement;
let loadOverlay = false;
let loadCircle = false;
let choosedContact = []; //an Array to save the checked Contacts with checkbox


function onloadBoard() {
    init('board');
    updateHTML();
    loadActiveUserLocal();
    updateCalender('date');
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
    renderUserInitiales(userTasks);
    changeProgressbar(userTasks['id']);
}


async function renderUserInitiales(cards) {
    let contact = document.getElementById(`userInitiales${cards['id']}`);
    let user = userAccounts[activeUser]['userContacts'];
    let userContacts = cards['contact'];
    let userContactsLength = userContacts.length;
    contact.innerHTML = '';
    for (let i = 0; i < user.length; i++) {
        const users = user[i];
        const abc = user[i]['name'];
        for (let j = 0; j < userContactsLength; j++) {
            const userContact = userContacts[j];
            const ids = cards['id'].toString() + i.toString();
            if (abc.includes(userContact) && userContacts.length <= 3) {
                contact.innerHTML += `<div id="circle${ids}" class="initiales">${users['letters']} </div>`
                changeBackgroundCircle(i, abc, userContact, users, cards, ids);
            } else if (abc.includes(userContact) && userContacts.length > 3) {
                let allContacts = userContacts.length;
                let count = j + 1;
                let newLenght = userContactsLength = 2;
                let result = allContacts - newLenght;
                result = '+' + result;
                contact.innerHTML += `<div id="circle${ids}" class="initiales">${users['letters']} </div>`;
                changeBackgroundCircle(i, abc, userContact, users, cards, ids);
                if (userContactsLength == count) {
                    contact.innerHTML += `<div id="circle${ids}" class="initiales background-black">${result} </div>`;
                }
            };
        }
    }
}



function changeBackgroundColor(cards) {
    let background = document.getElementById(`backgroundColor${cards['id']}`);
    let color = cards['categoryColor'];
    background.style.backgroundColor = `${color}`;
}


async function changeBackgroundCircle(i, abc, userContact, users, cards, ids) {
    let backgroundCircle = document.getElementById(`circle${ids}`);
    let color = users['color'];
    if (abc.includes(userContact)) {
        backgroundCircle.style.backgroundColor = `${color}`;
    }
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


function closeDropdownCategoryBoard() {
    let categoryInputContainer = document.getElementById('inputContainer'); //addTask.html line 40 - Input Container for Category
    let categoryList = document.getElementById('categoryList');
    categoryList.style.display = "none";
    categoryInputContainer.style.border = "1px solid #D1D1D1";
    categoryInputContainer.style.borderRadius = "10px";
}


async function renderAssignToBoard(cards) {
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    let assignedContactList = document.getElementById('assignedList');  //container to render the list
    assignedContactList.innerHTML = ""; //clear container inside html
    let users = userAccounts[activeUser]['userContacts'];
    renderAssignToBoardContacts(users,assignedContactList, todo)
}


function renderAssignToBoardContacts(users,assignedContactList, todo){
    for (let i = 0; i < users.length; i++) {
        let userName = users[i]['name'];
        const element = todo.contact;
        const contact = element.includes(userName);
        const checkedAttribute = contact ? 'checked' : '';
        assignedContactList.innerHTML += renderAssignToBoardContactsHTML(userName, checkedAttribute)
    }
}


function chooseContactBoard(name) { 
    let inputAssignedContact = document.getElementById('assignInput'); 
    inputAssignedContact.value = ''; 
    inputAssignedContact.value = name; 
    choosedContact.splice(0); 
    let allChekbox = document.querySelectorAll('.checkboxForContacts'); 
    for (let i = 0; i < allChekbox.length; i++) {
        const checkbox = allChekbox[i];
        if (checkbox.checked) {  
            choosedContact.push(checkbox.value); 
        }
    }
}


async function saveInputTask(cards) {
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    let newDescription = document.getElementById('inputDescription').value;
    let newDueDate = document.getElementById('inputDueDate').value;
    todo.description = newDescription;
    todo.dueDate = newDueDate;
    newTitleSave(todo)
    prioritySave(todo)
    chooseSubtasksBoard(todo);
    newTitleSave(todo)
    await saveAndNewRender(cards) 
}


async function saveAndNewRender(cards){
    await saveTasksToBackend()
    await saveUserAccountsToBackend();
    updateHTML()
    showOverlay(cards)
}


function newTitleSave(todo){
    let newTitle = document.getElementById('inputTittle').value;
    if (newTitle == '') {
        newTitle = todo.title;
    }
    todo.title = newTitle;
}


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


function setPriority(todo, priority, priorityImg) {
    todo.priority = priority;
    todo.priorityImg = priorityImg;
}


function prioritySave(todo) {
    const { priority, priorityImg } = getPriority();
    setPriority(todo, priority, priorityImg);
}


async function chooseSubtasksBoard(todo) { 
    todo.subTaskDone = [];
    let allChekbox = document.querySelectorAll(`.checkedSubTasks`);
    console.log(allChekbox.length);
    for (let i = 0; i < allChekbox.length; i++) {
        const checkbox = allChekbox[i];
        if (checkbox.checked) {
            todo.subTaskDone.push(checkbox.value);
        }
    }
    await saveTasksToBackend()
    await saveUserAccountsToBackend();
}


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


function filterHtml() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    let text = userAccounts[activeUser]['userTasks'];
    for (let i = 0; i < text.length; i++) {
        let element = text[i]['title'];
        element = element.toLowerCase();
        if (element.includes(search)) {
            renderfilter(search, i)
        }
    }
}


async function renderfilter(search, j) {
    await loadTasksFromBackend();
    await loadUserAccountsFromBackend();
    let user = userAccounts[activeUser]['userTasks'];
    let text = userAccounts[activeUser]['userTasks'][j]['title'];
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


function renderFilterHtml(userTasks, search, cards){
    renderFilterHtmlToDo(userTasks, search, cards);
    renderFilterHtmlInProgress(userTasks, search, cards);
    renderFilterHtmlAwaitingFeedback(userTasks, search, cards);
    renderFilterHtmlDone(userTasks, search, cards);
}


function renderFilterHtmlToDo(userTasks, search, cards){
    if (cards == 'To Do' && userTasks['title'].toLowerCase().includes(search)) {
        document.getElementById('toDoContent').innerHTML += generateHTML1(userTasks) + generateHTML2(userTasks), loadForUpdateHTML(userTasks);
    }
}


function renderFilterHtmlInProgress(userTasks, search, cards){
    if (cards == 'In progress' && userTasks['title'].toLowerCase().includes(search)) {
        document.getElementById('inProgressContent').innerHTML += generateHTML1(userTasks) + generateHTML2(userTasks), loadForUpdateHTML(userTasks);
    }
} 


function renderFilterHtmlAwaitingFeedback(userTasks, search, cards){
    if (cards == 'Awaiting Feedback' && userTasks['title'].toLowerCase().includes(search)) {
        document.getElementById('awaitingFeedbackContent').innerHTML += generateHTML1(userTasks) + generateHTML2(userTasks), loadForUpdateHTML(userTasks);
    }
}


function renderFilterHtmlDone(userTasks, search, cards){
    if (cards == 'Done' && userTasks['title'].toLowerCase().includes(search)) {
        document.getElementById('doneContent').innerHTML += generateHTML1(userTasks) + generateHTML2(userTasks), loadForUpdateHTML(userTasks);
    }
}


async function deleteTaskActiveUser(number){
    let user = userAccounts[activeUser]['userTasks'];//[number];
    user.splice(number,1);
    console.log(userAccounts);
    await saveTasksToBackend()
    await saveUserAccountsToBackend();
    
}