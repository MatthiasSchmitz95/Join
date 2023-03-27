function updateHTML() {
    let todo = todos.filter(t => t['category'] == 'To do');
    document.getElementById('toDoContent').innerHTML = '';

    for (let index = 0; index < todo.length; index++) {
        const element = todo[index];
        document.getElementById('toDoContent').innerHTML += `
        <div class="card">
        <div>
            <h4>${element['Department']}</h4>
            <h4>${element['title']}</h4>
            <p>
            ${element['text']}
            </p>
        </div>
    </div>`;
    }

    let inProgress = todos.filter(t => t['category'] == 'In progress');
    document.getElementById('inProgressContent').innerHTML = '';

    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        document.getElementById('inProgressContent').innerHTML += `
        <div class="card">
        <div>
            <h4>${element['Department']}</h4>
            <h4>${element['title']}</h4>
            <p>
            ${element['text']}
            </p>
        </div>
    </div>`;
    }

    let awaiting = todos.filter(t => t['category'] == 'Awaiting Feedback');
    document.getElementById('awaitingFeedbackContent').innerHTML = '';

    for (let index = 0; index < awaiting.length; index++) {
        const element = awaiting[index];
        document.getElementById('awaitingFeedbackContent').innerHTML += `
        <div class="card">
        <div>
            <h4>${element['Department']}</h4>
            <h4>${element['title']}</h4>
            <p>
            ${element['text']}
            </p>
        </div>
    </div>`;
    }

    let done = todos.filter(t => t['category'] == 'Done');
    document.getElementById('doneContent').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('doneContent').innerHTML += `
        <div class="card">
        <div>
            <h4>${element['Department']}</h4>
            <h4>${element['title']}</h4>
            <p>
            ${element['text']}
            </p>
        </div>
    </div>`;
    }
}