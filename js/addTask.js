/**
 * Category
 */
var categoriesArray = ['New Category', 'Sales', 'Marketing'];
var colorsArray = ['', 'red', 'blue'];
var newCategoryColors = ['#8AA4FF', '#FF0000', '#2AD300', '#FF8A00', '#E200BE', '#0038FF'];
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
    closeDropDownAssignTo();
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
    if (index == 0) {
        input.value = '';
        newCategoryInput();
    } else {
        document.getElementById('newCategoryInput').style.display = "none";
        document.getElementById('buttonDropDown').style.display = "flex";
    }
}

function newCategoryInput() {
    closeDropdownCategory();
    document.getElementById('input').placeholder = 'New Category Name';
    document.getElementById('newCategoryInput').style.display = "flex";
    document.getElementById('buttonDropDown').style.display = "none";
    document.getElementById('newCategoryColorsBox').style.display = "flex";
}

var newCategoryColor;
function newColor(color) {
    document.getElementById('color').style.background = color;
    newCategoryColor = color;
}

function addNewCategory() {
    var newCategory = document.getElementById('input');
    categoriesArray.push(newCategory.value);
    document.getElementById('newCategoryColorsBox').style.display = "none";
    document.getElementById('newCategoryInput').style.display = "none";
    document.getElementById('buttonDropDown').style.display = "flex";
    renderCategory();
    document.getElementById('color').style.background = newCategoryColor;
    //document.getElementById('input').placeholder = 'Select task Category';
    colorsArray.push(newCategoryColor);
    console.log('Category Array added: ', categoriesArray);
    console.log('Category Color added: ', colorsArray);
}

function rejectNewCategory() {
    document.getElementById('buttonDropDown').style.display = "flex";
    document.getElementById('newCategoryInput').style.display = "none";
    document.getElementById('input').placeholder = 'Select task Category';
    document.getElementById('newCategoryColorsBox').style.display = "none";
}

/**
 * AssignTo 
 */
var assignToInputContainer = document.getElementById('contactInputContainer');
function renderAssignTo() {
    let assignedContactList = document.getElementById('assignedList');
    assignedContactList.innerHTML = "";

    for (let i = 0; i < userAccounts.length; i++) {
        var userName = userAccounts[i]['userName'];

        assignedContactList.innerHTML += /*html*/`
            <div class="assignedContact" >
                <div>${userName}</div>
                <label class="filledCheckboxContainer">
                    <input type="checkbox" class="checkboxForContacts" value="${userName}" onclick="chooseContact('${userName}')">
                        <span class="checkmark"></span>
                </label>
            </div>
            `;
    }
}

var choosedContacts = [];
function chooseContact(name) { //index, contact
    let inputAssignedContact = document.getElementById('assignInput');
    inputAssignedContact.value = '';
    inputAssignedContact.value = name;
    choosedContacts.splice(0); //delete all choosed Contacts from last time

    let allChekbox = document.querySelectorAll('.checkboxForContacts');
    for (let i = 0; i < allChekbox.length; i++) {
        const checkbox = allChekbox[i];
        if (checkbox.checked) {
            choosedContacts.push(checkbox.value);
        }
    }
    console.log('chooesedContact', choosedContacts);
}

function dropDownAssignTo() {
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
    closeDropdownCategory();
}

function closeDropDownAssignTo() {
    var assignToDropDown = document.getElementById('assignedList');
    assignToDropDown.style.display = "none";
    assignToInputContainer.style.border = "1px solid #D1D1D1";
    assignToInputContainer.style.borderRadius = "10px";
}

/**
 * Subtask
 */
var subTasks = ['Subtask 1'];
var addsubtask = document.getElementById('addSubtaskBtn');
var onInputSubTask = document.getElementById('subtaskOninput');
var subtaskInput = document.getElementById('subtasksInput');
var appendixSubtask = document.getElementById('SubtaskAppendixContainer');

function createNewSubtask() {
    addsubtask.style.display = "none";
    onInputSubTask.style.display = "flex";
}


function deleteSubTask() {
    subtaskInput.value = "";
    addsubtask.style.display = "flex";
    onInputSubTask.style.display = "none";
    appendixSubtask.innerHTML = "";
    appendixSubtask.innerHTML = `
            <label class="container">
                <input type="checkbox">
                    <span class="checkmark"></span>
                    <div class="subtaskCheck">${subTasks[0]}</div>
            </label>
            `;
    //to delete all from index 1
    subTasks.splice(1);
}


function addSubTask() {
    addsubtask.style.display = "flex";
    onInputSubTask.style.display = "none";
    if (subtaskInput.value != "") {
        let subTask = subtaskInput.value;
        subTasks.push(subTask);
        //console.log(subTasks);
        renderSubtasks();
    }
    subtaskInput.value = "";
    addsubtask.style.display = "flex";
    onInputSubTask.style.display = "none";
}

var selectedSubtasks = [];
function chooseSubtasks(id) { //index, contact
    selectedSubtasks.splice(0); //delete all choosed Contacts from last time

    let allChekbox = document.querySelectorAll(`.checkedSubTasks`);
    console.log(allChekbox.length);
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
        appendixSubtask.innerHTML += /*html*/`
            <label class="container">
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
var priority;
var priorityImg;
async function addTask() {
    await saveUserAccountsToBackend();
    await loadUserAccountsFromBackend();

    var title = document.getElementById('title');
    var description = document.getElementById('description');
    /*var contact = document.getElementById('assignInput');*/
    let contact = choosedContacts;
    var category = document.getElementById('input');
    var categoryColor = document.getElementById('color').style.background;
    var dueDate = document.getElementById('date');
    //var subTask = document.getElementById('subtasksInput');
    var subTask = selectedSubtasks;
    if (document.getElementById('prioUrgentBox').classList.contains('bgUrgent')) {
        priority = document.getElementById('prioUrgentBox').innerText;
        priorityImg = document.getElementById('prioUrgentImg').src;
    } else if (document.getElementById('prioMediumBox').classList.contains('bgMedium')) {
        priority = document.getElementById('prioMediumBox').innerText;
        priorityImg = document.getElementById('prioMediumImg').src;
    } else {
        priority = document.getElementById('prioLowBox').innerText;
        priorityImg = document.getElementById('prioLowImg').src;
    }

    var idTask = tasks.length;
    var progress = "To Do";

    var newTask = {
        "title": title.value,
        "description": description.value,
        "category": category.value,
        "categoryColor": categoryColor,
        "contact": contact,
        "dueDate": dueDate.value,
        "subTask": subTask,
        "priority": priority,
        "priorityImg": priorityImg,
        "id": idTask,
        "progress": progress
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
    //contact.value = "";
    document.getElementById('assignInput').value = "";
    inputAssignedContact = "";
    dueDate.value = "";
    //subTask.value = "";
    document.getElementById('prioUrgentBox').classList.remove('bgUrgent');
    document.getElementById('prioMediumBox').classList.remove('bgMedium');
    document.getElementById('prioLowBox').classList.remove('bgLow');
    document.getElementById('prioUrgentBox').classList.remove('bgTextWhite');
    document.getElementById('prioMediumBox').classList.remove('bgTextWhite');
    document.getElementById('prioLowBox').classList.remove('bgTextWhite');
    document.getElementById('prioUrgentImg').classList.remove('Img-white');
    document.getElementById('prioMediumImg').classList.remove('Img-white');
    document.getElementById('prioLowImg').classList.remove('Img-white');
    deleteSubTask();
    /*setTimeout(function () {
                window.location = "./board.html";
    }, 3600)*/
    await saveTasksToBackend();

    //userAccounts[activeUser].userTasks.push(tasks); //hier zeigt ein Error
    //noch zusammen zu schauen

    //chooseContact();
    console.log(choosedContacts);
    choosedContacts = [];


}


function insertUrgent() {
    document.getElementById('prioUrgentBox').classList.add('bgTextWhite');
    document.getElementById('prioMediumBox').classList.remove('bgTextWhite');
    document.getElementById('prioLowBox').classList.remove('bgTextWhite');
    document.getElementById('prioUrgentImg').classList.add("Img-white");
    document.getElementById('prioMediumImg').classList.remove("Img-white");
    document.getElementById('prioLowImg').classList.remove("Img-white");
    toggleInsertUrgent();
    document.getElementById('prioUrgentBox').classList.toggle('bgUrgent');
    document.getElementById('prioMediumBox').classList.remove('bgMedium');
    document.getElementById('prioLowBox').classList.remove('bgLow');

}

function toggleInsertUrgent() {
    document.getElementById("prioUrgentBox").addEventListener("click", function handleClick(event) {
        const hasClass = event.target.classList.contains('bgUrgent');
        if (hasClass) {
            console.log('applied bg White');
            document.getElementById('prioUrgentBox').classList.add('bgTextWhite');
            document.getElementById('prioUrgentImg').classList.add("Img-white");
        }
        else {
            console.log('removed bg White');
            document.getElementById('prioUrgentBox').classList.remove('bgTextWhite');
            document.getElementById('prioUrgentImg').classList.remove("Img-white");
        }
    });
}

function insertMedium() {
    document.getElementById('prioMediumBox').classList.add('bgTextWhite');
    document.getElementById('prioUrgentBox').classList.remove('bgTextWhite');
    document.getElementById('prioLowBox').classList.remove('bgTextWhite');
    document.getElementById('prioLowImg').classList.remove("Img-white");
    document.getElementById('prioUrgentImg').classList.remove("Img-white");
    document.getElementById('prioMediumImg').classList.add("Img-white");
    toggleInsertMedium();
    document.getElementById('prioMediumBox').classList.toggle('bgMedium');
    document.getElementById('prioUrgentBox').classList.remove('bgUrgent');
    document.getElementById('prioLowBox').classList.remove('bgLow');

}

function toggleInsertMedium() {
    document.getElementById("prioMediumBox").addEventListener("click", function handleClick(event) {
        const hasClass = event.target.classList.contains('bgMedium');
        if (hasClass) {
            console.log('applied bg White');
            document.getElementById('prioMediumBox').classList.add('bgTextWhite');
            document.getElementById('prioMediumImg').classList.add("Img-white");
        }
        else {
            console.log('removed bg White');
            document.getElementById('prioMediumBox').classList.remove('bgTextWhite');
            document.getElementById('prioMediumImg').classList.remove("Img-white");
        }
    });
}



function insertLow() {
    document.getElementById('prioLowBox').classList.add('bgTextWhite');
    document.getElementById('prioUrgentBox').classList.remove('bgTextWhite');
    document.getElementById('prioMediumBox').classList.remove('bgTextWhite');
    document.getElementById('prioLowImg').classList.add("Img-white");
    document.getElementById('prioMediumImg').classList.remove("Img-white");
    document.getElementById('prioUrgentImg').classList.remove("Img-white");
    toggleInsertLow();
    document.getElementById('prioLowBox').classList.toggle('bgLow');
    document.getElementById('prioUrgentBox').classList.remove('bgUrgent');
    document.getElementById('prioMediumBox').classList.remove('bgMedium');
}

function toggleInsertLow() {
    document.getElementById("prioLowBox").addEventListener("click", function handleClick(event) {
        const hasClass = event.target.classList.contains('bgLow');
        if (hasClass) {
            console.log('applied bg White');
            document.getElementById('prioLowBox').classList.add('bgTextWhite');
            document.getElementById('prioLowImg').classList.add("Img-white");
        }
        else {
            console.log('removed bg White');
            document.getElementById('prioLowBox').classList.remove('bgTextWhite');
            document.getElementById('prioLowImg').classList.remove("Img-white");
        }
    });
}


function clearBtnhover() {
    document.getElementById('clearBtnImg').classList.add('clearButtonImgblue');
}

function clearBtnCancelhover() {
    document.getElementById('clearBtnImg').classList.remove('clearButtonImgblue');
}

// modify calendar to only select current date or date in the future
function updateCalender() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    document.getElementById("date").min = today;
}

/*clear all field of AddTask page*/
function clearAllAddTaskFields() {
    window.location.reload();
}
