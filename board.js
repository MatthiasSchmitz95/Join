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
        let card = JSON.stringify(cards);
        document.getElementById('toDoContent').innerHTML +=generateHTML(cards, card);
        
    }
}


function updateHTMLInProgress(){
    let inProgress = todos.filter(t => t['category'] == 'In progress');
    document.getElementById('inProgressContent').innerHTML = '';

    for (let index = 0; index < inProgress.length; index++) {
        const cards = inProgress[index];
        let card = JSON.stringify(cards);
        document.getElementById('inProgressContent').innerHTML +=generateHTML(cards, card);
        
    }
}


function updateHTMLAwaitingFeedback(){
    let awaiting = todos.filter(t => t['category'] == 'Awaiting Feedback');
    document.getElementById('awaitingFeedbackContent').innerHTML = '';

    for (let index = 0; index < awaiting.length; index++) {
        const cards = awaiting[index];
        let card = JSON.stringify(cards);
        document.getElementById('awaitingFeedbackContent').innerHTML += generateHTML(cards, card);
    }
}


function updateHTMLDone(){
    let done = todos.filter(t => t['category'] == 'Done');
    document.getElementById('doneContent').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const cards = done[index];
        let card = JSON.stringify(cards);
        document.getElementById('doneContent').innerHTML += generateHTML(cards, card); 
    }
}


function generateHTML(cards, card) {
    return `
    <div draggable="true" ondragstart="startDragging(${cards['id']})" onclick="showOverlay(${card})" class="card">
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
    cards = JSON.parse(cards);
    let overlay = document.getElementById('overlay');
    overlay.classList.remove('d-none');
    overlay.innerHTML = /*html*/`        
    <div class="overlay-department">
    ${cards['Department']}
    </div>
    <div class="overlay-title">
    Call potenzial clients
    </div>
    <div class="overlay-text">
    Make the product presentation to prospective buyers
    </div>
    <div class="overlay-date">
   <b>Due date:</b>
    </div>
    <div class="overlay-date">
    <b>Priority:</b>
    </div>
    <div class="overlay-date">
    <b>Assigned to:</b>
    </div>
    `;
}