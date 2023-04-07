/**
 * Category
 */
var categoriesArray = ['New Category', 'Sales', 'Marketing'];
var colorsArray = ['', 'red', 'blue'];
var categoryInputContainer = document.getElementById('inputContainer');

function renderCategory() {
    let categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = "";
    for (let i = 0; i < categoriesArray.length; i++) {
        const category = categoriesArray[i];
        const color = colorsArray[i];

        categoryList.innerHTML += `
        <div class="categoryAndColor" onclick="chooseCategory(${i}, '${category}', '${color}')" >
            <div>${category}</div>
            <div class="color"  style="background-color:${color}"></div>
        </div>
        `;
    }
}

/*<div id="color" class="color"></div>*/
function unsetCategoryInputField() {
    categoryInputContainer.innerHTML = `
    <input id="input" type="text" placeholder="Select task Category" required>
        <div id="color" class="color"></div>
        <div id="buttonDropDown" class="buttonOpenClose" onclick="dropDown()">
        <img src="assets/img/dropdown-arrow.png">
        </div>`;
}


function dropDown() {
    closeDropDownAssignTo();
    /* document.getElementById('categoryList').classList.toggle('dropDownDisplay');*/
    var categoryDropDown = document.getElementById('categoryList');


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
    var categoryDropDown = document.getElementById('categoryList');
    categoryDropDown.style.display = "none";
    categoryInputContainer.style.border = "1px solid #D1D1D1";
    categoryInputContainer.style.borderRadius = "10px";
}

function chooseCategory(index, category, color) {
    let input = document.getElementById('input');
    input.value = '';
    input.value = category;
    document.getElementById('color').style.background = color;
}

/**
 * AssignTo 
 */
/*var contactListArray = ['contact1', 'contact2', 'contact3'];*/
var assignToInputContainer = document.getElementById('contactInputContainer');
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

function dropDownAssignTo() {
    /* document.getElementById('categoryList').classList.toggle('dropDownDisplay');*/
    closeDropdownCategory();
    var assignToDropDown = document.getElementById('assignedList');

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
    var assignToDropDown = document.getElementById('assignedList');
    assignToDropDown.style.display = "none";
    assignToInputContainer.style.border = "1px solid #D1D1D1";
    assignToInputContainer.style.borderRadius = "10px";
}



function chooseContact(index, contact) {
    let inputAssignedContact = document.getElementById('assignInput');
    inputAssignedContact.value = '';
    inputAssignedContact.value = contact;
}

/**
 * Subtask
 */
var addsubtask = document.getElementById('addSubtaskBtn');
var onInputSubTask = document.getElementById('subtaskOninput');
var subtaskInput = document.getElementById('subtasksInput');
var appendixSubtask = document.getElementById('SubtaskAppendixContainer');

function createNewSubtask() {

    if (onInputSubTask.style.display == "none") {
        addsubtask.style.display = "none";
        onInputSubTask.style.display = "flex";
        let subtaskInput = document.getElementById('subtasksInput');
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
        <label class="container">
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
        <label class="container">
            <input type="checkbox">
            <span class="checkmark"></span>
            <div class="subtaskCheck">Subtask 1</div>
        </label>
        <label class="container">
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
    var title = document.getElementById('title');
    var description = document.getElementById('description');
    var contact = document.getElementById('assignInput');
    var category = document.getElementById('input');
    var categoryColor = document.getElementById('color').style.background;
    var dueDate = document.getElementById('date');
    var subTask = document.getElementById('subtasksInput');
    var priority = document.getElementById('prioUrgentBox').innerText;
    var priorityImg = document.getElementById('prioUrgentImg').src;

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

    document.getElementById('messageAddedTask').style.display = "flex";
    document.getElementById('messageAddedTask').classList.add('animate');
    setTimeout(function () {
        document.getElementById('messageAddedTask').style.display = "none";
    }, 3900)
    document.getElementById('addTaskBtn').classList.add('buttonDisabled');
    setTimeout(function () {
        document.getElementById('addTaskBtn').classList.add('buttonEnabled');
    }, 4000)
    title.value = "";
    description.value = "";
    category.value = "";
    unsetCategoryInputField();
    contact.value = "";
    dueDate.value = "";
    subTask.value = "";
    document.getElementById('prioUrgentBox').classList.remove('bgUrgent');
    document.getElementById('prioMediumBox').classList.remove('bgMedium');
    document.getElementById('prioLowBox').classList.remove('bgLow');
    document.getElementById('prioUrgentImg').classList.remove('whitecolor');
    document.getElementById('prioMediumImg').classList.remove('whitecolor');
    document.getElementById('prioLowImg').classList.remove('whitecolor');
    deleteSubTask();
    /*setTimeout(function () {
        window.location = "./board.html";
    }, 3600)*/

    userAccounts[activeUser].userTasks.push(newTask);
    saveTasksToBackend();
    loadTasksFromBackend();
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


function clearBtnhover() {
    document.getElementById('clearBtnImg').classList.add('clearButtonImgblue');
}

function clearBtnCancelhover() {
    document.getElementById('clearBtnImg').classList.remove('clearButtonImgblue');
}