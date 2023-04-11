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
    if (index == 0) {
        input.value = '';
        newCategoryInput();
    } else {
        document.getElementById('popOut-newCategoryInput').style.display = "none";
        document.getElementById('popOut-buttonDropDown').style.display = "flex";
    }
}

function newCategoryInput() {
    closeDropdownCategory();
    document.getElementById('popOut-input').placeholder = 'New Category Name';
    document.getElementById('popOut-newCategoryInput').style.display = "flex";
    document.getElementById('popOut-buttonDropDown').style.display = "none";
    document.getElementById('popOut-newCategoryColorsBox').style.display = "flex";
}


var newCategoryColor;
function newColor(color) {
    document.getElementById('popOut-color').style.background = color;
    newCategoryColor = color;
}


function addNewCategory() {
    var newCategory = document.getElementById('popOut-input');
    categoriesArray.push(newCategory.value);
    document.getElementById('popOut-newCategoryColorsBox').style.display = "none";
    document.getElementById('popOut-newCategoryInput').style.display = "none";
    document.getElementById('popOut-buttonDropDown').style.display = "flex";
    renderCategory();
    document.getElementById('popOut-color').style.background = newCategoryColor;
    //document.getElementById('input').placeholder = 'Select task Category';
    colorsArray.push(newCategoryColor);
    console.log('Category Array added: ', categoriesArray);
    console.log('Category Color added: ', colorsArray);
}

function rejectNewCategory() {
    document.getElementById('popOut-buttonDropDown').style.display = "flex";
    document.getElementById('popOut-newCategoryInput').style.display = "none";
    document.getElementById('popOut-input').placeholder = 'Select task Category';
    document.getElementById('popOut-newCategoryColorsBox').style.display = "none";
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
var subTasks = ['Subtask 1'];
var addsubtask = document.getElementById('popOut-addSubtaskBtn');
var onInputSubTask = document.getElementById('popOut-subtaskOninput');
var subtaskInput = document.getElementById('popOut-subtasksInput');
var appendixSubtask = document.getElementById('popOut-SubtaskAppendixContainer');

function createNewSubtask() {
    /*if (onInputSubTask.style.display == "none") {
        let subtaskInput = document.getElementById('popOut-subtasksInput');
        subtaskInput.value = "";
        subtaskInput.value = "Create new icons";
    } else {
        deleteSubTask();
    }*/
        addsubtask.style.display = "none"; //hide addBtn
        onInputSubTask.style.display = "flex"; //shows cross & right button
    
}

function deleteSubTask() {
    subtaskInput.value = "";
    addsubtask.style.display = "flex"; //display addBtn
    onInputSubTask.style.display = "none"; //hide cross & right button
    appendixSubtask.innerHTML = ""; //display container of SubTasks
    appendixSubtask.innerHTML = `
            <label class="popOut-container">
                <input type="checkbox">
                    <span class="checkmark"></span>
                    <div class="subtaskCheck">${subTasks[0]}</div>
            </label>
            `;
    //to delete all from index 1
    subTasks.splice(1);
}

function addSubTask() {
    if (subtaskInput.value != "") { //if text of Subtask inserted
        let subTask = subtaskInput.value;
        subTasks.push(subTask); //SubTask Array pushed
        console.log(subTasks);
        renderSubtasks();
    }
    subtaskInput.value = ""; 
    addsubtask.style.display = "flex"; //display addBtn
    onInputSubTask.style.display = "none"; //hide cross & right button
}

var selectedSubtasks = [];
function chooseSubtasks() { //index, contact
    selectedSubtasks.splice(0); //delete all choosed Contacts from last time

    let allChekbox = document.querySelectorAll('.checkedSubTasks');
    for (let i = 0; i < allChekbox.length; i++) {
        const checkbox = allChekbox[i];
        if (checkbox.checked) {
            selectedSubtasks.push(checkbox.value);
        }
    }
    console.log('choosedSubtasks', selectedSubtasks);
}


function renderSubtasks() {
    appendixSubtask.innerHTML = "";
    for (let i = 0; i < subTasks.length; i++) {
        const showSubTask = subTasks[i];
        appendixSubtask.innerHTML += `
            <label class="popOut-container">
                <input type="checkbox" class="checkedSubTasks" onclick="chooseSubtasks()" value="${showSubTask}" />
                <span class="checkmark" id="checkmark${i}"></span>
                <div class="subtaskCheck">${showSubTask}</div>
            </label>
            `;
    }
}

/**
 * AddTask JSON Array
 */
var tasks = [];
async function addTask() {
    await saveUserAccountsToBackend();
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
    userAccounts[activeUser].userTasks.push(tasks);
    saveTasksToBackend();
    loadTasksFromBackend();
}

function insertUrgent() {
    document.getElementById('popOut-prioUrgentBox').classList.add('bgTextWhite');
    document.getElementById('popOut-prioMediumBox').classList.remove('bgTextWhite');
    document.getElementById('popOut-prioLowBox').classList.remove('bgTextWhite');
    document.getElementById('popOut-prioUrgentImg').classList.add("Img-white");
    document.getElementById('popOut-prioMediumImg').classList.remove("Img-white");
    document.getElementById('popOut-prioLowImg').classList.remove("Img-white");
    toggleInsertUrgent();
    document.getElementById('popOut-prioUrgentBox').classList.toggle('bgUrgent');
    document.getElementById('popOut-prioMediumBox').classList.remove('bgMedium');
    document.getElementById('popOut-prioLowBox').classList.remove('bgLow');

}

function toggleInsertUrgent() {
    document.getElementById("popOut-prioUrgentBox").addEventListener("click", function handleClick(event) {
        const hasClass = event.target.classList.contains('bgUrgent');
        if (hasClass) {
            console.log('applied bg White');
            document.getElementById('popOut-prioUrgentBox').classList.add('bgTextWhite');
            document.getElementById('popOut-prioUrgentImg').classList.add("Img-white");
        }
        else {
            console.log('removed bg White');
            document.getElementById('popOut-prioUrgentBox').classList.remove('bgTextWhite');
            document.getElementById('popOut-prioUrgentImg').classList.remove("Img-white");
        }
    });
}

function insertMedium() {
    document.getElementById('popOut-prioMediumBox').classList.add('bgTextWhite');
    document.getElementById('popOut-prioUrgentBox').classList.remove('bgTextWhite');
    document.getElementById('popOut-prioLowBox').classList.remove('bgTextWhite');
    document.getElementById('popOut-prioLowImg').classList.remove("Img-white");
    document.getElementById('popOut-prioUrgentImg').classList.remove("Img-white");
    document.getElementById('popOut-prioMediumImg').classList.add("Img-white");
    toggleInsertMedium();
    document.getElementById('popOut-prioMediumBox').classList.toggle('bgMedium');
    document.getElementById('popOut-prioUrgentBox').classList.remove('bgUrgent');
    document.getElementById('popOut-prioLowBox').classList.remove('bgLow');

}

function toggleInsertMedium() {
    document.getElementById("popOut-prioMediumBox").addEventListener("click", function handleClick(event) {
        const hasClass = event.target.classList.contains('bgMedium');
        if (hasClass) {
            console.log('applied bg White');
            document.getElementById('popOut-prioMediumBox').classList.add('bgTextWhite');
            document.getElementById('popOut-prioMediumImg').classList.add("Img-white");
        }
        else {
            console.log('removed bg White');
            document.getElementById('popOut-prioMediumBox').classList.remove('bgTextWhite');
            document.getElementById('popOut-prioMediumImg').classList.remove("Img-white");
        }
    });
}



function insertLow() {
    document.getElementById('popOut-prioLowBox').classList.add('bgTextWhite');
    document.getElementById('popOut-prioUrgentBox').classList.remove('bgTextWhite');
    document.getElementById('popOut-prioMediumBox').classList.remove('bgTextWhite');
    document.getElementById('popOut-prioLowImg').classList.add("Img-white");
    document.getElementById('popOut-prioMediumImg').classList.remove("Img-white");
    document.getElementById('popOut-prioUrgentImg').classList.remove("Img-white");
    toggleInsertLow();
    document.getElementById('popOut-prioLowBox').classList.toggle('bgLow');
    document.getElementById('popOut-prioUrgentBox').classList.remove('bgUrgent');
    document.getElementById('popOut-prioMediumBox').classList.remove('bgMedium');
}

function toggleInsertLow() {
    document.getElementById("popOut-prioLowBox").addEventListener("click", function handleClick(event) {
        const hasClass = event.target.classList.contains('bgLow');
        if (hasClass) {
            console.log('applied bg White');
            document.getElementById('popOut-prioLowBox').classList.add('bgTextWhite');
            document.getElementById('popOut-prioLowImg').classList.add("Img-white");
        }
        else {
            console.log('removed bg White');
            document.getElementById('popOut-prioLowBox').classList.remove('bgTextWhite');
            document.getElementById('popOut-prioLowImg').classList.remove("Img-white");
        }
    });
}

function closePopOutAddTask(){
    document.getElementById('popOut-taskCard').classList.add('d-none');
}


function clearBtnhover() {
    document.getElementById('popOut-clearBtnImg').classList.add('popOut-clearButtonImgblue');
    console.log('closed');
}

function clearBtnCancelhover() {
    document.getElementById('popOut-clearBtnImg').classList.remove('popOut-clearButtonImgblue');
}

/*clear all field of AddTask page*/
function clearAllAddTaskFields() {
    window.location.reload();
}

// modify calendar to only select current date or date in the future
function updateCalender() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    document.getElementById("popOut-date").min = today;
}