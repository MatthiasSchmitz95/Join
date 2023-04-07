/**
 * Category
 */
var categoriesArray = ['New Category', 'Sales', 'Marketing'];
var colorsArray = ['', 'red', 'blue'];
var categoryInputContainer = document.getElementById('popOut-inputContainer');

function renderCategory() {
    let categoryList = document.getElementById('popOut-categoryList');
    categoryList.innerHTML = "";
    for (let i = 0; i < categoriesArray.length; i++) {
        const category = categoriesArray[i];
        const color = colorsArray[i];

        categoryList.innerHTML += `
        <div class="popOut-categoryAndColor" onclick="chooseCategory(${i}, '${category}', '${color}')" >
            <div>${category}</div>
            <div class="popOut-color"  style="background-color:${color}"></div>
        </div>
        `;
    }
}

/*<div id="color" class="color"></div>*/
function unsetCategoryInputField() {
    categoryInputContainer.innerHTML = `
    <input id="popOut-input" type="text" placeholder="Select task Category" required>
        <div id="popOut-color" class="popOut-color"></div>
        <div id="popOut-buttonDropDown" class="popOut-buttonOpenClose" onclick="dropDown()">
        <img src="assets/img/dropdown-arrow.png">
        </div>`;
}


function dropDown() {
    closeDropDownAssignTo();
    /* document.getElementById('categoryList').classList.toggle('dropDownDisplay');*/
    var categoryDropDown = document.getElementById('popOut-categoryList');


    if (categoryDropDown.style.display == "block") {
        categoryDropDown.style.display = "none";
        categoryInputContainer.style.border = "1px solid #D1D1D1";
        categoryInputContainer.style.borderRadius = "10px";
    } else {
        categoryDropDown.style.display = "block";
        categoryInputContainer.style.borderBottom = "none";
        /* Four values */
        /* top-left top-right bottom-right bottom-left */
        categoryInputContainer.style.borderRadius = "10px 10px 0 0";
        renderCategory();
    }

}

function closeDropdownCategory() {
    var categoryDropDown = document.getElementById('popOut-categoryList');
    categoryDropDown.style.display = "none";
    categoryInputContainer.style.border = "1px solid #D1D1D1";
    categoryInputContainer.style.borderRadius = "10px";
}

function chooseCategory(index, category, color) {
    let input = document.getElementById('popOut-input');
    input.value = '';
    input.value = category;
    document.getElementById('popOut-color').style.background = color;
}

/**
 * AssignTo 
 */
/*var contactListArray = ['contact1', 'contact2', 'contact3'];*/
var assignToInputContainer = document.getElementById('popOut-contactInputContainer');
function renderAssignTo() {
    let assignedContactList = document.getElementById('popOut-assignedList');
    assignedContactList.innerHTML = "";

    for (let i = 0; i < userAccounts.length; i++) {
        /*const contact = contactArray[i];*/
        var userName = userAccounts[i]['userName'];

        assignedContactList.innerHTML += /*html*/`
        <div class="popOut-assignedContact" onclick="chooseContact(${i}, '${userName}')" > 
            <div>${userName}</div>
            <label class="popOut-filledCheckboxContainer">
                <input type="checkbox">
                <span class="checkmark"></span>
            <div class="subtaskCheck"></div>
        </label>
        </div>
        `;
    }
}

function dropDownAssignTo() {
    /* document.getElementById('categoryList').classList.toggle('dropDownDisplay');*/
    closeDropdownCategory();
    var assignToDropDown = document.getElementById('popOut-assignedList');

    if (assignToDropDown.style.display == "block") {
        assignToDropDown.style.display = "none";
        assignToInputContainer.style.border = "1px solid #D1D1D1";
        assignToInputContainer.style.borderRadius = "10px";
    } else {
        assignToDropDown.style.display = "block";
        assignToInputContainer.style.borderBottom = "none";
        /* Four values */
        /* top-left top-right bottom-right bottom-left */
        assignToInputContainer.style.borderRadius = "10px 10px 0 0";
        renderAssignTo();
    }

}

function closeDropDownAssignTo() {
    var assignToDropDown = document.getElementById('popOut-assignedList');
    assignToDropDown.style.display = "none";
    assignToInputContainer.style.border = "1px solid #D1D1D1";
    assignToInputContainer.style.borderRadius = "10px";
}



function chooseContact(index, contact) {
    let inputAssignedContact = document.getElementById('popOut-assignInput');
    inputAssignedContact.value = '';
    inputAssignedContact.value = contact;
}

/**
 * Subtask
 */
var addsubtask = document.getElementById('popOut-addSubtaskBtn');
var onInputSubTask = document.getElementById('popOut-subtaskOninput');
var subtaskInput = document.getElementById('popOut-subtasksInput');
var appendixSubtask = document.getElementById('popOut-SubtaskAppendixContainer');

function createNewSubtask() {

    if (onInputSubTask.style.display == "none") {
        addsubtask.style.display = "none";
        onInputSubTask.style.display = "flex";
        let subtaskInput = document.getElementById('popOut-subtasksInput');
        subtaskInput.value = "";
        subtaskInput.value = "Create new icons";
    } else {
        deleteSubTask();
    }
}

function deleteSubTask() {
    subtaskInput.value = "";
    addsubtask.style.display = "flex";
    onInputSubTask.style.display = "none";
    appendixSubtask.innerHTML = "";
    appendixSubtask.innerHTML = /*html*/`
        <label class="popOut-container">
            <input type="checkbox">
            <span class="checkmark"></span>
            <div class="subtaskCheck">Subtask 1</div>
        </label>
    `;
}

function addSubTask() {
    subtaskInput.value = "";
    subtaskInput.value = "Create new icons";

    appendixSubtask.innerHTML = /*html*/`
        <label class="popOut-container">
            <input type="checkbox">
            <span class="checkmark"></span>
            <div class="subtaskCheck">Subtask 1</div>
        </label>
        <label class="popOut-container">
            <input type="checkbox">
            <span class="checkmark"></span>
            <div class="subtaskCheck">${subtaskInput.value}</div>
        </label>
    `;
    addsubtask.style.display = "flex";
    onInputSubTask.style.display = "none";
}

/**
 * AddTask JSON Array
 */
var tasks = [];
async function addTask() {
    await loadUserAccountsFromBackend();
    var title = document.getElementById('popOut-title');
    var description = document.getElementById('popOut-description');
    var contact = document.getElementById('popOut-assignInput');
    var category = document.getElementById('popOut-input');
    var categoryColor = document.getElementById('popOut-color').style.background;
    var dueDate = document.getElementById('popOut-date');
    var subTask = document.getElementById('popOut-subtasksInput');
    var priority = document.getElementById('popOut-prioUrgentBox').innerText;
    var priorityImg = document.getElementById('popOut-prioUrgentImg').src;

    var newTask = {
        "title": title.value,
        "description": description.value,
        "category": category.value,
        "categoryColor": categoryColor,
        "contact": contact.value,
        "dueDate": dueDate.value,
        "subTask": subTask.value,
        "priority": priority,
        "priorityImg": priorityImg
    };

    tasks.push(newTask);
    console.log(newTask);

    closeDropdownCategory();
    closeDropDownAssignTo();

    document.getElementById('popOut-messageAddedTask').style.display = "flex";
    document.getElementById('popOut-messageAddedTask').classList.add('animate');
    setTimeout(function () {
        document.getElementById('popOut-messageAddedTask').style.display = "none";
    }, 3900)
    document.getElementById('popOut-addTaskBtn').classList.add('buttonDisabled');
    setTimeout(function () {
        document.getElementById('popOut-addTaskBtn').classList.add('buttonEnabled');
    }, 4000)
    title.value = "";
    description.value = "";
    category.value = "";
    unsetCategoryInputField();
    contact.value = "";
    dueDate.value = "";
    subTask.value = "";
    document.getElementById('popOut-prioUrgentBox').classList.remove('bgUrgent');
    document.getElementById('popOut-prioMediumBox').classList.remove('bgMedium');
    document.getElementById('popOut-prioLowBox').classList.remove('bgLow');
    document.getElementById('popOut-prioUrgentImg').classList.remove('popOut-whitecolor');
    document.getElementById('popOut-prioMediumImg').classList.remove('popOut-whitecolor');
    document.getElementById('popOut-prioLowImg').classList.remove('popOut-whitecolor');
    deleteSubTask();
    /*setTimeout(function () {
        window.location = "./board.html";
    }, 3600)*/
    userAccounts[activeUser].userTasks.push(newTask);
    saveTasksToBackend();
    loadTasksFromBackend();
}





function insertUrgent() {
    document.getElementById('popOut-prioUrgentBox').classList.toggle('bgUrgent');
    document.getElementById('popOut-prioMediumBox').classList.remove('bgMedium');
    document.getElementById('popOut-prioLowBox').classList.remove('bgLow');
    /*img-color*/
    document.getElementById('popOut-prioUrgentImg').classList.add('popOut-whitecolor');
    document.getElementById('popOut-prioMediumImg').classList.remove('popOut-whitecolor');
    document.getElementById('popOut-prioLowImg').classList.remove('popOut-whitecolor');
}

function insertMedium() {
    document.getElementById('popOut-prioMediumBox').classList.toggle('bgMedium');
    document.getElementById('popOut-prioLowBox').classList.remove('bgLow');
    document.getElementById('popOut-prioUrgentBox').classList.remove('bgUrgent');
    /*img-color*/
    document.getElementById('popOut-prioUrgentImg').classList.remove('popOut-whitecolor');
    document.getElementById('popOut-prioMediumImg').classList.add('popOut-whitecolor');
    document.getElementById('popOut-prioLowImg').classList.remove('popOut-whitecolor');
}

function insertLow() {
    document.getElementById('popOut-prioLowBox').classList.toggle('bgLow');
    document.getElementById('popOut-prioUrgentBox').classList.remove('bgUrgent');
    document.getElementById('popOut-prioMediumBox').classList.remove('bgMedium');
    /*img-color*/
    document.getElementById('popOut-prioUrgentImg').classList.remove('popOut-whitecolor');
    document.getElementById('popOut-prioMediumImg').classList.remove('popOut-whitecolor');
    document.getElementById('popOut-prioLowImg').classList.add('popOut-whitecolor');
}
