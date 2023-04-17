let currentDraggedElement;
let loadOverlay = false;
let loadCircle = false;
let choosedContact = []; //an Array to save the checked Contacts with checkbox


function updateHTML() {
    updateHTMLToDo()
    /* updateHTMLInProgress()
     updateHTMLAwaitingFeedback()
     updateHTMLDone()*/
}

function onloadBoard() {
    init('board');
    updateHTML();
    loadActiveUserLocal();
    updateCalender('date');
}


async function updateHTMLToDo() {
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
        if (cards == 'To Do') {
            document.getElementById('toDoContent').innerHTML += generateHTML(userTasks), priorityImgCard(userTasks), changeBackgroundColor(userTasks), renderUserInitiales(userTasks), changeProgressbar(userTasks['id']);

        }
        if (cards == 'In progress') {
            document.getElementById('inProgressContent').innerHTML += generateHTML(userTasks), priorityImgCard(userTasks), changeBackgroundColor(userTasks), renderUserInitiales(userTasks), changeProgressbar(userTasks['id']);
           
        }
        if (cards == 'Awaiting Feedback') {
            document.getElementById('awaitingFeedbackContent').innerHTML += generateHTML(userTasks), priorityImgCard(userTasks), changeBackgroundColor(userTasks), renderUserInitiales(userTasks), changeProgressbar(userTasks['id']);
            
        }
        if (cards == 'Done') {
            document.getElementById('doneContent').innerHTML += generateHTML(userTasks), priorityImgCard(userTasks), changeBackgroundColor(userTasks), renderUserInitiales(userTasks), changeProgressbar(userTasks['id']);
        }
    }
}


function generateHTML(cards) {
    return /*html*/`
    <div draggable="true" ondragstart="startDragging(${cards['id']})" onclick="showOverlay(${cards['id']})" class="card">
        <div id="backgroundColor${cards['id']}" class="background">
            ${cards['category']}
        </div>
        <div><b>${cards['title']}</b></div>
        <div class="text-color" >
        ${cards['description']}
        </div>
        <div class="position-progress">
         <div class="progress">
            <div id="progressBar${cards['id']}" class="progressBar">
            </div>
         </div>
         <div class="count" id="countDone${cards['id']}">

         </div>
        </div>
        <div class="position-cards-bottom">
           <div class="flex" id="userInitiales${cards['id']}" >
           </div> 
           <div id="priorityImage${cards['id']}">
           </div>
        </div>  
    </div>`;

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
                console.log(result)
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
    user[currentDraggedElement]['progress'] = category;
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
    overlay.innerHTML = /*html*/`        
    <div class="overlay-header">
        <div class="overlay-department" id="overlayDepartment${cards}">
            ${(todo.category)}
        </div>
        <div class="close-icon">
            <img onclick="closeOverlay()" src="assets/img/close-overlay.svg">
        </div>
    </div>
    <div class="overlay-title">
        ${(todo.title)}
    </div>
    <div class="overlay-text">
        ${(todo.description)}
    </div>
    <div class="overlay-date">
        <b>Due date:</b> ${(todo['dueDate'])}
    </div>
    <div class="overlay-date">
        <b>Priority:</b> ${(todo.priority)} <img src="${todo.priorityImg}">
    </div>
    <div class="overlay-date">
        <b>Assigned to:</b>  <div id="assignedTo">

                            </div>
    </div>
    <div class="overlay-edit-task-position">
        <div class="overlay-edit-task" onclick="showOverlayChange(${cards})">
          <img src="assets/img/edit-task.svg">
        </div>
    </div>
    `;
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
                contacts.innerHTML += `
                <div class="position-assigend-to">
                <div id="changeCircleOverlay${j}" class="initiales-Overlay">${userLetter}</div>
                <div>${element}</div>
                </div>`;
                changeBackgroundCircleOverlay(users, j)
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
    overlay.innerHTML = /*html*/`
   <div class="overlay-header"> 
        <div class="width-chances">
            Title
           <input id="inputTittle" type=text class="input-chances-title" placeholder="${(todo.title)}">
        </div>
        <div class="close-icon-change">
            <img  onclick="closeOverlay()" src="assets/img/close-overlay.svg">
        </div>
    </div>
    <div class="width-chances">
        Description <br>
        <textarea id="inputDescription" onkeyup="textAreaAdjust(this)" style="overflow:hidden" class="input-chances-text">${(todo.description)}</textarea>
    </div>
    <div class="width-chances">
       Due date <br>
       <input id="inputDueDate" class="input-chances-title" type="date" value="2023-02-03" min="023-02-01" max="023-02-28" placeholder="${(todo['dueDate'])}">
    </div>
    <div id="subtasks">
    <div class="addSubtaskContainer">
                    <input class="subtasksInput" id="subtasksInput" placeholder="Add new Subtask" />
                    <div class="addSubtaskBtn" id="addSubtaskBtn" onclick="createNewSubtask()"><img
                            src="assets/img/plus.png"></div>
                    <div id="subtaskOninput">
                        <img src="assets/img/icon_clear.png" id="clearSubtaskInput" onclick="deleteSubTask()">
                        <div class="line"></div>
                        <img src="assets/img/checkmark.png" id="selectedSubtask" onclick="addSubTask()">
                    </div>
                </div>
    </div>
    <label for="priority" class="priority">Prio</label>
                <div  class="priorityBoxesContainer">
                    <div class="prioUrgentBox" id="prioUrgentBox" onclick="insertUrgent()">Urgent <img
                            id="prioUrgentImg" src="assets/img/urgent.png"></div>
                    <div class="prioMediumBox" id="prioMediumBox" onclick="insertMedium()">Medium <img
                            id="prioMediumImg" src="assets/img/medium.png"></div>
                    <div class="prioLowBox" id="prioLowBox" onclick="insertLow()">Low <img id="prioLowImg"
                            src="assets/img/low.png"></div>
                </div>
    <div class="assignContainer">
        <label for="assignedTo" class="assignedTo">Assigned to</label>
        <div class="contactInputContainer" id="contactInputContainer">
            <input class="assign-input" id="assignInput" type="text" placeholder="Select contacts to assign" required>

            <div id="assignDropDown" class="buttonOpenClose" onclick="dropDownAssignToBoard(${cards})"><img
                src="assets/img/dropdown-arrow.png"></div>
        </div>
            <div id="assignedList" class="assignedList"></div>
    </div>
    <div>

    </div>
    <div class="overlay-edit-task-position">
        <div class="overlay-chance-task" onclick="saveInputTask(${cards})">
            OK<img src="assets/img/right.svg">
        </div>
    </div>
     `;
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
        /* Four values */
        /* top-left top-right bottom-right bottom-left */
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


async function renderAssignToBoard(cards) { //function to render AssignTo
    await loadUserAccountsFromBackend(); //get Data of Users from Backend
    loadActiveUserLocal(); //get Data of Users from Backend
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    let assignedContactList = document.getElementById('assignedList');  //container to render the list
    assignedContactList.innerHTML = ""; //clear container inside html

    let users = userAccounts[activeUser]['userContacts'];


    for (let i = 0; i < users.length; i++) {
        let userName = users[i]['name'];

        const element = todo.contact;


        const contact = element.includes(userName);
        const checkedAttribute = contact ? 'checked' : '';
        assignedContactList.innerHTML += /*html*/`

            <div class="assignedContact" >
                <div>${userName}</div>
                <label class="filledCheckboxContainer">
                    <input type="checkbox" class="checkboxForContacts" value="${userName}" ${checkedAttribute} onclick="chooseContactBoard('${userName}')">
                        <span class="checkmark"></span>
                </label>
            </div>
            `;
    }
}


function chooseContactBoard(name) { //index, contact
    let inputAssignedContact = document.getElementById('assignInput'); //get assign To Inputfield
    inputAssignedContact.value = ''; //clear assign to Input Field
    inputAssignedContact.value = name; //Assigned To field fill with the Contact names
    choosedContact.splice(0); //delete all choosed Contacts from last time

    let allChekbox = document.querySelectorAll('.checkboxForContacts'); //check all checkboxes with the class '.checkboxForContacts'
    for (let i = 0; i < allChekbox.length; i++) {
        const checkbox = allChekbox[i];
        if (checkbox.checked) {  //if checkbox checked
            choosedContact.push(checkbox.value); //push the checked Contacts in the Array
        }
    }
    console.log('chooesedContact', choosedContacts);
}


async function saveInputTask(cards) {
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    let newTitle = document.getElementById('inputTittle').value;
    let newDescription = document.getElementById('inputDescription').value;
    let newDueDate = document.getElementById('inputDueDate').value;
    let priority;
    let priorityImg;
    if (document.getElementById('prioUrgentBox').classList.contains('bgUrgent')) {
        priority = document.getElementById('prioUrgentBox').innerText;
        priorityImg = document.createElement("prioUrgentImg");
        priorityImg = "assets/img/urgent.png";
    } else if (document.getElementById('prioMediumBox').classList.contains('bgMedium')) {
        priority = document.getElementById('prioMediumBox').innerText;
        priorityImg = document.createElement("prioMediumImg");
        priorityImg = "assets/img/medium.png";
    } else {
        priority = document.getElementById('prioLowBox').innerText;
        priorityImg = document.createElement("prioLowImg");
        priorityImg = "assets/img/low.png";
    }
    chooseSubtasksBoard(todo);
    if (newTitle == '') {
        newTitle = todo.title;
    }
    if (!todo.contact.includes(todo.contact)) {
        todo.contact = choosedContact
    }
    todo.title = newTitle;
    todo.description = newDescription;
    todo.dueDate = newDueDate;
    todo.priority = priority;
    todo.priorityImg = priorityImg;
    todo.contact = choosedContact
    console.log(todo);
    await saveTasksToBackend()
    await saveUserAccountsToBackend();
    updateHTML()
    showOverlay(cards)
}


async function chooseSubtasksBoard(todo) { //index, contact
    todo.subTaskDone = [];
    // selectedSubtasks.splice(0); //delete all choosed Contacts from last time

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
        content.innerHTML += /*html*/`
    <label class="container">
        <input type="checkbox" class="checkedSubTasks" onclick="chooseSubtasks()" value="${showSubTask}" ${checkedAttribute} />
        <span class="checkmark" id="checkmark${j}"></span>
        <div class="subtaskCheck">${showSubTask}</div>
    </label>
`;

    }
}


async function changeProgressbar(cards) {
    let progress = document.getElementById(`progressBar${cards}`);
    let contant = document.getElementById(`countDone${cards}`);
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    let result;
    let maximum = todo['subTask'].length;
    let present = todo.subTaskDone.length;
    if (present == 0) {
        result = 0
    } else {
        result = present * 100 / maximum;
        result = result + '%'
        console.log('ergebnis', result);
    }
    progress.style.width = result;
    contant.innerHTML = present + '/' + maximum + "" + 'Done';
    if (maximum == 0) {
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
        if (cards == 'To Do' && userTasks['title'].toLowerCase().includes(search)) {
            document.getElementById('toDoContent').innerHTML += generateHTML(userTasks), priorityImgCard(userTasks), changeBackgroundColor(userTasks), renderUserInitiales(userTasks), changeProgressbar(userTasks['id']);
        }
        if (cards == 'In progress' && userTasks['title'].toLowerCase().includes(search)) {
            document.getElementById('inProgressContent').innerHTML += generateHTML(userTasks), priorityImgCard(userTasks), changeBackgroundColor(userTasks), renderUserInitiales(userTasks), changeProgressbar(userTasks['id']);
        }
        if (cards == 'Awaiting Feedback' && userTasks['title'].toLowerCase().includes(search)) {
            document.getElementById('awaitingFeedbackContent').innerHTML += generateHTML(userTasks), priorityImgCard(userTasks), changeBackgroundColor(userTasks), renderUserInitiales(userTasks), changeProgressbar(userTasks['id']);
        }
        if (cards == 'Done' && userTasks['title'].toLowerCase().includes(search)) {
            document.getElementById('doneContent').innerHTML += generateHTML(userTasks), priorityImgCard(userTasks), changeBackgroundColor(userTasks), renderUserInitiales(userTasks), changeProgressbar(userTasks['id']);
        }
    }
}