function updateHTML() {
    let todo = todos.filter(t => t['category'] == 'To do');
    document.getElementById('toDoContent').innerHTML = '';

    for (let index = 0; index < todo.length; index++) {
        const elements = todo[index];
        document.getElementById('toDoContent').innerHTML +=generateHTML(elements)
    }

    let inProgress = todos.filter(t => t['category'] == 'In progress');
    document.getElementById('inProgressContent').innerHTML = '';

    for (let index = 0; index < inProgress.length; index++) {
        const elements = inProgress[index];
        document.getElementById('inProgressContent').innerHTML +=generateHTML(elements)
    }

    let awaiting = todos.filter(t => t['category'] == 'Awaiting Feedback');
    document.getElementById('awaitingFeedbackContent').innerHTML = '';

    for (let index = 0; index < awaiting.length; index++) {
        const elements = awaiting[index];
        document.getElementById('awaitingFeedbackContent').innerHTML += generateHTML(elements)
    }

    let done = todos.filter(t => t['category'] == 'Done');
    document.getElementById('doneContent').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const elements = done[index];
        document.getElementById('doneContent').innerHTML += generateHTML(elements) 
    }
}

function generateHTML(elements) {
    return `
    <div onclick="showOverlay(${elements})" class="card">
    <div>
        <h4>${elements['Department']}</h4>
        <h4>${elements['title']}</h4>
        <p>
        ${elements['text']}
        </p>
    </div>
</div>`;
}


function showOverlay(elements){
    let overlay = document.getElementById('overlay');
    overlay.classList.remove('d-none');
    overlay.innerHTML = `        
    <div class="overlay-department">
    ${elements['Department']}
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
    </div>`;

}