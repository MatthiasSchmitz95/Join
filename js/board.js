let currentDraggedElement;
let loadOverlay = false;

function updateHTML() {
    updateHTMLToDo()
    updateHTMLInProgress()
    updateHTMLAwaitingFeedback()
    updateHTMLDone()   
}


function updateHTMLToDo(){
    let todo = todos.filter(t => t['category'] == 'To do');
    document.getElementById('toDoContent').innerHTML = '';

    for (let index = 0; index < todo.length; index++) {
        const cards = todo[index];
        document.getElementById('toDoContent').innerHTML +=generateHTML(cards);
        
    }
}


function updateHTMLInProgress(){
    let inProgress = todos.filter(t => t['category'] == 'In progress');
    document.getElementById('inProgressContent').innerHTML = '';

    for (let index = 0; index < inProgress.length; index++) {
        const cards = inProgress[index];
        document.getElementById('inProgressContent').innerHTML +=generateHTML(cards);
        
    }
}


function updateHTMLAwaitingFeedback(){
    let awaiting = todos.filter(t => t['category'] == 'Awaiting Feedback');
    document.getElementById('awaitingFeedbackContent').innerHTML = '';

    for (let index = 0; index < awaiting.length; index++) {
        const cards = awaiting[index];       
        document.getElementById('awaitingFeedbackContent').innerHTML += generateHTML(cards);
    }
}


function updateHTMLDone(){
    let done = todos.filter(t => t['category'] == 'Done');
    document.getElementById('doneContent').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const cards = done[index];
        document.getElementById('doneContent').innerHTML += generateHTML(cards); 
    }
}


function generateHTML(cards) {
    return `
    <div draggable="true" ondragstart="startDragging(${cards['id']})" onclick="showOverlay(${cards['id']})" class="card">
    <div>
        <h4>${cards['Department']}</h4>
        <h4>${cards['title']}</h4>
        <p>
        ${cards['text']}
        </p>
    </div>
</div>`;
}


function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function moveTo(category){
    todos[currentDraggedElement]['category']= category;
    updateHTML()
}


function showOverlay(cards){
    // Finden des entsprechenden Objekts im JSON-Array todos anhand der ID
    let todo = todos.find((item) => item.id === cards);
    document.getElementById('overlay-background').classList.add('overlay-background');
    let overlay = document.getElementById('overlay');
    overlay.classList.remove('d-none');
    overlay.innerHTML = /*html*/`        
    <div class="overlay-header">
        <div class="overlay-department">
            ${(todo.Department)}
        </div>
        <div class="close-icon">
            <img onclick="closeOverlay()" src="assets/img/close-overlay.svg">
        </div>
    </div>
    <div class="overlay-title">
        ${(todo.title)}
    </div>
    <div class="overlay-text">
        ${(todo.text)}
    </div>
    <div class="overlay-date">
        <b>Due date:</b> ${(todo['due date'])}
    </div>
    <div class="overlay-date">
        <b>Priority:</b> ${(todo.priority)}
    </div>
    <div class="overlay-date">
        <b>Assigned to:</b> ${(todo['Assigned to'])}
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
    let todo = todos.find((item) => item.id === cards);
    let overlay = document.getElementById('overlay');
    overlay.innerHTML = /*html*/`
   <div class="overlay-header"> 
        <div>
            Title <br>
            <input type="text" placeholder=" ${(todo.title)}">
        </div>
        <div class="close-icon-change">
            <img  onclick="closeOverlay()" src="assets/img/close-overlay.svg">
        </div>
    </div>
    <div>
        Description <br>
        <input type="text" placeholder=" ${(todo.text)}">
    </div>
    <div>
       Due date <br>
        <input type="text" placeholder=" ${(todo['due date'])}">
    </div>
    <label for="priority" class="priority">Prio</label>
                <div class="priorityBoxesContainer">
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
            <input id="assignInput" type="text" placeholder="Select contacts to assign" required>

            <div id="assignDropDown" class="buttonOpenClose" onclick="dropDownAssignTo()"><img
                src="assets/img/dropdown-arrow.png"></div>
        </div>
            <div id="assignedList" class="assignedList"></div>
    </div>
     `
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