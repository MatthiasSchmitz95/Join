let currentDraggedElement;
let loadOverlay = false;


function updateHTML() {
    updateHTMLToDo()
    /* updateHTMLInProgress()
     updateHTMLAwaitingFeedback()
     updateHTMLDone()*/
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


/*
async function updateHTMLInProgress() {
    await loadTasksFromBackend();
    await loadUserAccountsFromBackend();
    let user = userAccounts[activeUser]['userName'];
    let inProgress = tasks.filter(t => t['progress'] == 'In progress' && t['contact'].includes(user));
    document.getElementById('inProgressContent').innerHTML = '';

    for (let index = 0; index < inProgress.length; index++) {
        const cards = inProgress[index];
        

    }
}


async function updateHTMLAwaitingFeedback() {
    await loadTasksFromBackend();
    await loadUserAccountsFromBackend();
    let user = userAccounts[activeUser]['userName'];
    let awaiting = tasks.filter(t => t['progress'] == 'Awaiting Feedback' && t['contact'].includes(user));
    document.getElementById('awaitingFeedbackContent').innerHTML = '';

    for (let index = 0; index < awaiting.length; index++) {
        const cards = awaiting[index];
        
    }
}


async function updateHTMLDone() {
    await loadTasksFromBackend();
    await loadUserAccountsFromBackend();
    let user = userAccounts[activeUser]['userName'];
    let done = tasks.filter(t => t['progress'] == 'Done' && t['contact'].includes(user));
    document.getElementById('doneContent').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const cards = done[index];
       
    }
}*/


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
        <div>
         <div class="progress">
            <div id="progressBar${cards['id']}" class="progressBar">
            </div>
         </div>
         <div>

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
    contact.innerHTML = '';
    for (let i = 0; i < user.length; i++) {
        const users = user[i];
        const abc = user[i]['name'];
        for (let j = 0; j < userContacts.length; j++) {
            const userContact = userContacts[j];
            const ids = cards['id'].toString() + i.toString();
            if (abc.includes(userContact)) {
                contact.innerHTML += `<div id="circle${ids}" class="initiales">${users['letters']} </div>`
                setTimeout(() => {
                    changeBackgroundCircle(i, abc, userContact, users, cards, ids);
                }, 0);
            }
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
    if (card == 'urgent') {
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
        <div class="overlay-department">
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
        <b>Priority:</b> ${(todo.priority)} ${todo.priorityImg}
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
    generateAssignedTo(todo)
}


function generateAssignedTo(todo) {
    let contacts = document.getElementById('assignedTo');
    for (let i = 0; i < todo.contact.length; i++) {
        const element = todo.contact[i];
        contacts.innerHTML += `
       <div>${(element)}</div>`
    }
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

            <div id="assignDropDown" class="buttonOpenClose" onclick="dropDownAssignTo()"><img
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
    if (todo.priority == 'urgent') {
        insertUrgent()
    } else if (todo.priority == 'Medium') {
        insertMedium()
    } else {
        insertLow()
    }
}

/*
function dropDownAssignTo() 
     document.getElementById('categoryList').classList.toggle('dropDownDisplay');
    closeDropdownCategory();
    var assignToDropDown = document.getElementById('assignedList');

    if (assignToDropDown.style.display == "block") {
        assignToDropDown.style.display = "none";
        assignToInputContainer.style.border = "1px solid #D1D1D1";
        assignToInputContainer.style.borderRadius = "10px";
    } else {
        assignToDropDown.style.display = "block";
        //assignToInputContainer.style.borderBottom = "none";
        /* Four values */
/* top-left top-right bottom-right bottom-left 
//assignToInputContainer.style.borderRadius = "10px 10px 0 0";
renderAssignTo();
}

}


function renderAssignTo() {
let assignedContactList = document.getElementById('assignedList');
assignedContactList.innerHTML = "";

for (let i = 0; i < userAccounts.length; i++) {
/*const contact = contactArray[i];
var userName = userAccounts[i]['userName'];

assignedContactList.innerHTML += `
<div class="assignedContact" onclick="chooseContact(${i}, '${userName}')" > 
    <div>${userName}</div>
    <label class="filledCheckboxContainer">
        <input type="checkbox">
        <span class="checkmark"></span>
    <div class="subtaskCheck"></div>
</label>
</div>
`;
}
}

/*
function showAddTaskPopOut() {
document.getElementById('popOut-taskCard').classList.remove('d-none');
}


function closePopOutAddTask() {
    document.getElementById('popOut-taskCard').classList.add('d-none');
}*/


async function saveInputTask(cards) {
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    let newTitle = document.getElementById('inputTittle').value;
    let newDescription = document.getElementById('inputDescription').value;
    let newDueDate = document.getElementById('inputDueDate').value;
    if (newTitle == '') {
        newTitle = todo.title;
    }
    todo.title = newTitle;
    todo.description = newDescription;
    todo.dueDate = newDueDate;
    console.log(todo);
    await saveTasksToBackend()
    await saveUserAccountsToBackend();
    updateHTML()
    showOverlay(cards)
}


function renderSubtasksBoard(cards) {
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    let content = document.getElementById('subtasks');
    content.innerHTML = "";
    for (let j = 0; j < todo['subTask'].length; j++) {
        const showSubTask = todo['subTask'][j];

        content.innerHTML += /*html*/`
            <label class="container">
                <input type="checkbox" class="checkedSubTasks" onclick="chooseSubtasks()" value="${showSubTask}" />
                <span class="checkmark" id="checkmark${j}"></span>
                <div class="subtaskCheck">${showSubTask}</div>
            </label>
            `;
    }
}


function changeProgressbar(cards) {
    let progress = document.getElementById(`progressBar${cards}`);
    let user = userAccounts[activeUser]['userTasks'];
    let todo = user.find((item) => item.id === cards);
    let result;
        let maximum = todo['subTask'].length;
        let present = selectedSubtasks.length;
        if (present == 0) {
            result = 0
        }else{
        result = maximum / present
        console.log('ergebnis',result)
    }
    }