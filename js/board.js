let currentDraggedElement;


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
    document.getElementById('desktop').style.opacity = '0.5';
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
        <div class="overlay-edit-task">
          <img src="assets/img/edit-task.svg">
        </div>
    </div>
    `;
}


function closeOverlay(){
    let overlay = document.getElementById('overlay');
    overlay.classList.add('d-none');
    document.getElementById('desktop').style.opacity = '1';
}