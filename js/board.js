let currentDraggedElement;
let loadOverlay = false;

function updateHTML() {
    updateHTMLToDo()
    updateHTMLInProgress()
    updateHTMLAwaitingFeedback()
    updateHTMLDone()   
}


async function updateHTMLToDo(){
    await loadTasksFromBackend();
    await loadUserAccountsFromBackend();
    let user = userAccounts[activeUser]['userName'];
    let todo = tasks.filter(t => t['progress'] == 'To Do' && t['contact'].includes(user) );
    document.getElementById('toDoContent').innerHTML = '';

    for (let i = 0; i< todo.length; i++) {
        const cards = todo[i];
        document.getElementById('toDoContent').innerHTML +=generateHTML(cards), priorityImgCard(cards);
        
    }
}


async function updateHTMLInProgress(){
    await loadTasksFromBackend();
    await loadUserAccountsFromBackend();
    let user = userAccounts[activeUser]['userName'];
    let inProgress = tasks.filter(t => t['progress'] == 'In progress' && t['contact'].includes(user) );
    document.getElementById('inProgressContent').innerHTML = '';

    for (let index = 0; index < inProgress.length; index++) {
        const cards = inProgress[index];
        document.getElementById('inProgressContent').innerHTML +=generateHTML(cards), priorityImgCard(cards);
        
    }
}


async function updateHTMLAwaitingFeedback(){
    await loadTasksFromBackend();
    await loadUserAccountsFromBackend();
    let user = userAccounts[activeUser]['userName'];
    let awaiting = tasks.filter(t => t['progress'] == 'Awaiting Feedback' && t['contact'].includes(user) );
    document.getElementById('awaitingFeedbackContent').innerHTML = '';

    for (let index = 0; index < awaiting.length; index++) {
        const cards = awaiting[index];       
        document.getElementById('awaitingFeedbackContent').innerHTML += generateHTML(cards), priorityImgCard(cards);
    }
}


async function updateHTMLDone(){
    await loadTasksFromBackend();
    await loadUserAccountsFromBackend();
    let user = userAccounts[activeUser]['userName'];
    let done = tasks.filter(t => t['progress'] == 'Done' && t['contact'].includes(user) );
    document.getElementById('doneContent').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const cards = done[index];
        document.getElementById('doneContent').innerHTML += generateHTML(cards), priorityImgCard(cards); 
    }
}


function generateHTML(cards) {
    return /*html*/`
    <div draggable="true" ondragstart="startDragging(${cards['id']})" onclick="showOverlay(${cards['id']})" class="card">
    <div class="width100">
        <h4>${cards['category']}</h4>
        <h4>${cards['title']}</h4>
        <div >
        ${cards['description']}
</div>
        <div>
           <div>

           </div> 
           <div id="priorityImage${cards['id']}">

           </div>
        </div>
    </div>
</div>`;
}


function priorityImgCard(cards){
    let prio = document.getElementById(`priorityImage${cards['id']}`);
    let card = cards['priority'];
    if (card== 'Urgent') {
        prio.innerHTML = '<img src="assets/img/urgent.png">';
    }else if (card=='Medium') {
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


async function moveTo(category){
   tasks[currentDraggedElement]['progress']= category;
   await saveTasksToBackend();
    updateHTML();
}


function showOverlay(cards){
    // Finden des entsprechenden Objekts im JSON-Array todos anhand der ID
    let todo = tasks.find((item) => item.id === cards);
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
        <b>Assigned to:</b> ${(todo['contact'])}
    </div>
    <div class="overlay-edit-task-position">
        <div class="overlay-edit-task" onclick="showOverlayChange(${cards})">
          <img src="assets/img/edit-task.svg">
        </div>
    </div>
    `;
  loadOverlay = true;
}


function showOverlayChange(cards){
    let todo = tasks.find((item) => item.id === cards);
    let overlay = document.getElementById('overlay');
    overlay.innerHTML = /*html*/`
   <div class="overlay-header"> 
        <div class="width-chances">
            Title
           <input type=text class="input-chances-title" placeholder="${(todo.title)}">
        </div>
        <div class="close-icon-change">
            <img  onclick="closeOverlay()" src="assets/img/close-overlay.svg">
        </div>
    </div>
    <div class="width-chances">
        Description <br>
        <textarea onkeyup="textAreaAdjust(this)" style="overflow:hidden" class="input-chances-text">${(todo.description)}</textarea>
    </div>
    <div class="width-chances">
       Due date <br>
       <input class="input-chances-title" type="date" value="2023-02-03" min="023-02-01" max="023-02-28" placeholder="${(todo['dueDate'])}">
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
        <div class="overlay-chance-task">
            OK<img src="assets/img/right.svg">
        </div>
    </div>
     `;
     insertPriority(cards);
}

function textAreaAdjust(element) {
    element.style.height = "1px";
    element.style.height = (25+element.scrollHeight)+"px";
  }


function closeOverlay(){
    if(loadOverlay){
    let overlay = document.getElementById('overlay');
    overlay.classList.add('d-none');
    document.getElementById('overlay-background').classList.remove('overlay-background');
}
}


function doNotClose(event){
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


function insertPriority(cards){
    let todo = tasks.find((item) => item.id === cards);
    if (todo.priority == 'urgent') {
        insertUrgent()
    } else if (todo.priority == 'Medium') {
        insertMedium()
    } else{
        insertLow()
    }
}


function dropDownAssignTo() {
    /* document.getElementById('categoryList').classList.toggle('dropDownDisplay');*/
    //closeDropdownCategory();
    var assignToDropDown = document.getElementById('assignedList');

    if (assignToDropDown.style.display == "block") {
        assignToDropDown.style.display = "none";
        assignToInputContainer.style.border = "1px solid #D1D1D1";
        assignToInputContainer.style.borderRadius = "10px";
    } else {
        assignToDropDown.style.display = "block";
        //assignToInputContainer.style.borderBottom = "none";
        /* Four values */
        /* top-left top-right bottom-right bottom-left */
        //assignToInputContainer.style.borderRadius = "10px 10px 0 0";
        renderAssignTo();
    }

}


function renderAssignTo() {
    let assignedContactList = document.getElementById('assignedList');
    assignedContactList.innerHTML = "";

    for (let i = 0; i < userAccounts.length; i++) {
        /*const contact = contactArray[i];*/
        var userName = userAccounts[i]['userName'];

        assignedContactList.innerHTML += /*html*/`
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


function showAddTaskPopOut(){
    document.getElementById('popOut-taskCard').classList.remove('d-none');
}

function closePopOutAddTask(){
    document.getElementById('popOut-taskCard').classList.add('d-none');
}
