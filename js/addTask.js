// modify calendar so you can only select current date or date in the future
/*let date = document.getElementById("date");

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;
document.getElementById("date").min = today;*/

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
var assignToInputContainer = document.getElementById('contactInputContainer');
var contactListArray = ['contact1', 'contact2', 'contact3'];

function renderAssignTo() {
    let assignedContactList = document.getElementById('assignedList');
    assignedContactList.innerHTML = "";
    for (let i = 0; i < contactListArray.length; i++) {
        const contact = contactListArray[i];

        assignedContactList.innerHTML += `
        <div class="assignedContact" onclick="chooseContact(${i}, '${contact}')" > 
        <div>${contact}</div>
        <input type="checkbox" name="checkbox" class="checkbox${i}"/>
        </div>
        `;
    }
}

function dropDownAssignTo() {
    /* document.getElementById('categoryList').classList.toggle('dropDownDisplay');*/
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
    appendixSubtask.innerHTML = `
    <div class="checkboxContainer">
        <input type="checkbox" name="checkbox" />
        <div class="subtaskCheck">Subtask 1</div>
    </div>
    `;
}

function addSubTask() {
    subtaskInput.value = "";
    subtaskInput.value = "Create new icons";

    appendixSubtask.innerHTML = /*html*/`
        <div class="checkboxContainer">
            <input type="checkbox" name="checkbox" />
            <div class="subtaskCheck">Subtask 1</div>
        </div>

        <div class="checkboxContainer">
            <input type="checkbox" name="checkbox" checked/>
            <div class="subtaskCheck">${subtaskInput.value}</div>
        </div>
    `;
    addsubtask.style.display = "flex";
    onInputSubTask.style.display = "none";
}