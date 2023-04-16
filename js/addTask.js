
var categoriesArray = ['New Category', 'Sales', 'Marketing'];
var colorsArray = ['', 'red', 'blue'];
var newCategoryColors = ['#8AA4FF', '#FF0000', '#2AD300', '#FF8A00', '#E200BE', '#0038FF'];
var categoryInputContainer; //addTask.html line 40 - Input Container for Category
var assignToInputContainer; //get the container for AssignTo Input Field
var onInputSubTask; //global variable for onInput container -> "cross mark and check mark images"
var subtaskInput; //global variable for subtasks input container
var appendixSubtask; //global variable for subtask container below the Subtask Input
var categoryList;
var choosedContacts = []; //an Array to save the checked Contacts with checkbox

var addsubtask; //global variable for addsubTask button
var subTasks = ['Subtask 1']; //default value in subTasks Array

var userName; //for Assigned To users
var newAssingedContact;
var newLetters2;

function onloadAddTask() {
    init('addTask');
    renderSubtasks();
    updateCalender();
}

function renderCategory() {
    let categoryList = document.getElementById('categoryList'); //addTask.html line 51 - container for category Input box
    categoryList.innerHTML = "";
    for (let i = 0; i < categoriesArray.length; i++) { //increment category Array form 0 to Array length
        const category = categoriesArray[i]; //category Array Index values
        const color = colorsArray[i]; //color Array Index values
        //render Category and Color Dots
        categoryList.innerHTML += `
        <div class="categoryAndColor" onclick="chooseCategory(${i}, '${category}', '${color}')" >
            <div>${category}</div>
            <div class="color"  style="background-color:${color}"></div>
        </div>
        `;
    }
}

/*set Category InputField to default as in beginning*/
function unsetCategoryInputField() {
    categoryInputContainer.innerHTML = `
    <input id="input" type="text" placeholder="Select task Category" required>
        <div id="color" class="color"></div>
        <div id="buttonDropDown" class="buttonOpenCloseCategory" onclick="dropDown()">
        <img src="assets/img/dropdown-arrow.png">
        </div>`;
}

/* Show Category Select Menu - toggle at clicking on the dropdown Button */
function dropDown() {
    categoryList = document.getElementById('categoryList');
    categoryInputContainer = document.getElementById('inputContainer');
    if (categoryList.style.display == "block") { //the Container for Category is open ?
        categoryList.style.display = "none"; //hide Container for Category 
        categoryInputContainer.style.border = "1px solid #D1D1D1";  //Category Input Container show all border 
        categoryInputContainer.style.borderRadius = "10px"; //Category Input Container show all Border radius with 10px
    } else { //Container for Category is closed ?
        categoryList.style.display = "block"; //shows Container for Category to rendern
        categoryInputContainer.style.borderBottom = "none"; //Category Input Container has no border Bottom
        /* Four values */
        /* top-left top-right bottom-right bottom-left */
        categoryInputContainer.style.borderRadius = "10px 10px 0 0"; //Category Input Container show only top-left top-right Border radius
        renderCategory(); //render Category in the Container
    }
    closeDropDownAssignTo(); //close the "Assigned to"-Container -> if "Category Select" is active
}

/**close the Category Select Menu*/
function closeDropdownCategory() {
    var categoryList = document.getElementById('categoryList');
    categoryInputContainer = document.getElementById('inputContainer');
    categoryList.style.display = "none";
    categoryInputContainer.style.border = "1px solid #D1D1D1";
    categoryInputContainer.style.borderRadius = "10px";
}

/**choose one Category from the Category Select Menu via dropDown
 * parmeter: index = categoriesArray[index]
 * parmeter: category = categoriesArray Value via index
 * parmeter: color = background color of the colorsArray index
 * */
function chooseCategory(index, category, color) {
    let input = document.getElementById('input');
    input.value = '';
    input.value = category; //put in Category InputField the Value of the selected Category
    document.getElementById('color').style.background = color;
    if (index == 0) { //check if selected color index==0
        input.value = ''; //clear the Category InputField
        newCategoryInput(); //and call the newCategoryInput Function
    } else {
        document.getElementById('newCategoryInput').style.display = "none"; //hide newCategoryInput container -> hide "cross mark and check mark"
        document.getElementById('buttonDropDown').style.display = "flex"; //shows Category DropDown Button
    }
}

/**
 * function for selected category Input is New Category 
 */
function newCategoryInput() {
    closeDropdownCategory(); //dropDown Category Menu closed
    document.getElementById('input').placeholder = 'New Category Name'; //shows New Category Name in Category Input Field
    document.getElementById('newCategoryInput').style.display = "flex"; //shows newCategoryInput container -> shows "cross mark and check mark"
    document.getElementById('buttonDropDown').style.display = "none"; //hide Category DropDown Button
    document.getElementById('newCategoryColorsBox').style.display = "flex"; //shows new category Color Container direct under the Category Input Field
}

/**function for input new Category Color
 * parameter: color = string of colorhex value*/
var newCategoryColor;
function newColor(color) {
    document.getElementById('color').style.background = color; //change the background after parameter color
    newCategoryColor = color; //save the color as a globale value
}

/**
 * by clicking check mark on Category Input the function addNewCategory() was called 
 */
function addNewCategory() {
    var newCategory = document.getElementById('input');
    categoriesArray.push(newCategory.value); //new Input value pushed in the Category Array
    document.getElementById('newCategoryColorsBox').style.display = "none"; //hide new category Color Container under the Category Input Field
    document.getElementById('newCategoryInput').style.display = "none"; //hide newCategoryInput container -> hide "cross mark and check mark"
    document.getElementById('buttonDropDown').style.display = "flex"; //shows Category DropDown Button
    document.getElementById('color').style.background = newCategoryColor; //new Category Color showing in the Category Container
    colorsArray.push(newCategoryColor); //new Color value pushed in the Color Array
    /*console.log('Category Array added: ', categoriesArray);
    console.log('Category Color added: ', colorsArray);*/
}

/**
 * by clicking cross mark on Category Input the function addNewCategory() was called
 */
function rejectNewCategory() {
    document.getElementById('buttonDropDown').style.display = "flex"; //shows Category DropDown Button
    document.getElementById('newCategoryInput').style.display = "none"; //hide newCategoryInput container -> hide "cross mark and check mark"
    document.getElementById('input').placeholder = 'Select task Category'; //refresh the placeholder to the beginning
    document.getElementById('newCategoryColorsBox').style.display = "none"; //hide new category Color Container under the Category Input Field
}

/**
 * AssignTo 
 */
async function renderAssignTo() { //function to render AssignTo
    await loadUserAccountsFromBackend(); //get Data of Users from Backend
    loadActiveUserLocal(); //get Data of Users from Backend
    let assignedContactList = document.getElementById('assignedList');  //container to render the list
    assignedContactList.innerHTML = ""; //clear container inside html

    //for (let i = 0; i < userAccounts.length; i++) {
    //    var userName = userAccounts[i]['userName'];

    /**render the user contacts */
    for (let i = 0; i < userAccounts[activeUser]['userContacts'].length; i++) {
        userName = userAccounts[activeUser]['userContacts'][i]['name'];

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
    assignedContactList.innerHTML += /*html*/`
            <div class="assignedContact" onclick="assignToInput()">
                <div>invite new contacts</div>
                <img src="assets/img/new_contact.png" class="newContactImg">
            </div>
        `;
}


function chooseContact(name) { //index, contact
    let inputAssignedContact = document.getElementById('assignInput'); //get assign To Inputfield
    inputAssignedContact.value = ''; //clear assign to Input Field
    inputAssignedContact.value = name; //Assigned To field fill with the Contact names
    choosedContacts.splice(0); //delete all choosed Contacts from last time

    let allChekbox = document.querySelectorAll('.checkboxForContacts'); //check all checkboxes with the class '.checkboxForContacts'
    for (let i = 0; i < allChekbox.length; i++) {
        const checkbox = allChekbox[i];
        if (checkbox.checked) {  //if checkbox checked
            choosedContacts.push(checkbox.value); //push the checked Contacts in the Array
        }
    }
    console.log('chooesedContact', choosedContacts);
}

/**
 * Show AssignTo Select Menu - toggle at clicking on the dropdown Button
 */
function dropDownAssignTo() {
    var assignedList = document.getElementById('assignedList'); //get the id of AssignedList container to render contacts
    assignToInputContainer = document.getElementById('contactInputContainer');
    document.getElementById('circleContactsContainer').style.display = "none";
    if (assignedList.style.display == "block") { //the Container for Contacts is open ?
        assignedList.style.display = "none"; //hide the Container for Contacts 
        assignToInputContainer.style.border = "1px solid #D1D1D1"; //shows all border
        assignToInputContainer.style.borderRadius = "10px"; //set all border radius to 10px
    } else { //the Container for Contacts is closed ?
        assignedList.style.display = "block"; //shows the Container for Contacts  
        assignToInputContainer.style.borderBottom = "none"; //hide the AssignedTo container Border bottom
        /* Four values */
        /* top-left top-right bottom-right bottom-left */
        assignToInputContainer.style.borderRadius = "10px 10px 0 0"; //shows AssignedTo container top-left top-right border radius
        renderAssignTo(); //show or render the contacts
    }
    closeDropdownCategory();
}

/**
 * close the dropdown Select Menu
 */
function closeDropDownAssignTo() {
    var assignedList = document.getElementById('assignedList'); //get the id of AssignedList container to render contact
    assignToInputContainer = document.getElementById('contactInputContainer');
    assignedList.style.display = "none"; //hide the Container for Contacts 
    assignToInputContainer.style.border = "1px solid #D1D1D1"; //shows all border
    assignToInputContainer.style.borderRadius = "10px"; //set all border radius to 10px
}


function assignToInput() {
    closeDropdownCategory(); //dropDown Category Menu closed
    document.getElementById('assignInput').placeholder = 'contact Email'; //shows New Category Name in Category Input Field
    document.getElementById('newAssignToInput').style.display = "flex"; //shows newCategoryInput container -> shows "cross mark and check mark"
    document.getElementById('assignDropDown').style.display = "none"; //hide Category DropDown Button
    closeDropDownAssignTo();
}

function rejectAssignTo() {
    document.getElementById('assignInput').value = "";
    document.getElementById('assignInput').placeholder = "Select contacts to assign";
    closeDropDownAssignTo();
    document.getElementById('newAssignToInput').style.display = "none"; //hide newCategoryInput container -> shows "cross mark and check mark"
    document.getElementById('assignDropDown').style.display = "flex"; //shows Category DropDown Button
    document.getElementById('circleContactsContainer').style.display = "none";
}

var newContacts = [];
function addnewContact() {
    newAssingedContact = document.getElementById('assignInput');
    newContacts.push(newAssingedContact.value);
    console.log(newContacts);
    renderCircleName();
    document.getElementById('circleContactsContainer').style.display = "flex";
    document.getElementById('newAssignToInput').style.display = "none"; //hide newCategoryInput container -> shows "cross mark and check mark"
    document.getElementById('assignDropDown').style.display = "flex"; //shows Category DropDown Button
}

//userName = userAccounts[activeUser]['userContacts'][i]['name'];
function showContactsByTwoLetters(userName, newUserName) {
    if (!!userName) {
        for (let i = 0; i < userAccounts[activeUser]['userContacts'].length; i++) {
            console.log(userName);
            inputName = userName[i]['name'];
            const firstLetter = inputName.charAt(0).toUpperCase();
            const remainingLetters = inputName.slice(1);
            contactName = firstLetter + remainingLetters;
            contactColor = randomUserColor();
            if (inputName.indexOf(' ') >= 0) {
                let helpLetter = contactName.split(" ");
                newLetters2 = helpLetter[0].charAt(0).toUpperCase() + helpLetter[1].charAt(0).toUpperCase();
            }
            else {
                newLetters2 = firstLetter;
            }
            console.log(newLetters2);
        }
    }
}/*else{
        
            console.log(userName);
            inputName = newUserName;
            const firstLetter = inputName.charAt(0).toUpperCase();
            const remainingLetters = inputName.slice(1);
            contactName = firstLetter + remainingLetters;
            contactColor = randomUserColor();
            if (inputName.indexOf(' ') >= 0) {
                let helpLetter = contactName.split(" ");
                newLetters2 = helpLetter[0].charAt(0).toUpperCase() + helpLetter[1].charAt(0).toUpperCase();
            }
            else {
                newLetters2 = firstLetter;
            }
            console.log(newLetters2);
    }
}*/

/*function showContactsByTwoLetters() {
    let user = userAccounts[activeUser]['userContacts'];
    for (let j = 0; j < user.length; j++) {
        const users = user[j];
        let userLetter = users['letters'];
        if (userName.includes(element)) {
            contacts.innerHTML += `
                <div class="initiales-Overlay">${userLetter}</div>
            `;
        }
    }
}*/

function renderCircleName() {
    showContactsByTwoLetters(userAccounts[activeUser]['userContacts']);
    let user = document.getElementById('circleContactsContainer').innerHTML = "";
    for (let i = 0; i < userAccounts[activeUser]['userContacts'].length; i++) {
        document.getElementById('circleContactsContainer').innerHTML += `
        <div class="circleContact" id="circleContact">  ${newLetters2}
        </div>
        `;
    }
    /*let user = document.getElementById('circleContactsContainer').innerHTML = "";
    for (let j = 0; j < user.length; j++) {
        const users = user[j];
        let userLetter = users['letters'];
        if (userName.includes(element)) {
            document.getElementById('circleContactsContainer').innerHTML += `
                <div class="initiales-Overlay">${userLetter}</div>
            `;
        }
    }
    /* showContactsByTwoLetters(newContacts);
     document.getElementById('circleContactsContainer').innerHTML += `<div class="circleContact" id="circleContact">  
     ${newLetters2} </div>`;*/
}


/**
 * Subtask
 */
/**By clicking the + Symbol changed to New subTask Input*/
function createNewSubtask() {
    addsubtask = document.getElementById('addSubtaskBtn');
    onInputSubTask = document.getElementById('subtaskOninput');
    addsubtask.style.display = "none"; //hide addsubTask button (+)
    onInputSubTask.style.display = "flex"; //shows subtasks input container -> shows "cross mark and check mark images"
}

/**onclick cross mark all Subtasks are deleted except of the subTasks[0] -> it only left the default value in subTasks Array */
function deleteSubTask() {
    addsubtask = document.getElementById('addSubtaskBtn');
    onInputSubTask = document.getElementById('subtaskOninput');
    subtaskInput = document.getElementById('subtasksInput');
    appendixSubtask = document.getElementById('SubtaskAppendixContainer');
    subtaskInput.value = "";
    addsubtask.style.display = "flex"; //show addsubTask button (+)
    onInputSubTask.style.display = "none"; //hide subtasks input container -> hide "cross mark and check mark images"
    appendixSubtask.innerHTML = "";
    appendixSubtask.innerHTML = `
            <label class="container">
                <input type="checkbox">
                    <span class="checkmark"></span>
                    <div class="subtaskCheck">${subTasks[0]}</div>
            </label>
            `;
    subTasks.splice(1); //to delete all from index 1
}


function addSubTask() {
    subtaskInput = document.getElementById('subtasksInput');
    addsubtask.style.display = "flex"; //show addsubTask button (+)
    onInputSubTask.style.display = "none"; //hide subtasks input container -> hide "cross mark and check mark"
    if (subtaskInput.value != "") {
        let subTask = subtaskInput.value;
        subTasks.push(subTask); //push the subTask Value to subTasks array
        renderSubtasks(); //render the subtasks below SubTask input field
    }
    subtaskInput.value = ""; //clear the SubTask Input Field
}


var selectedSubtasks = []; //An Array to save the checkmarked subtasks 
function chooseSubtasks(id) { //index, contact
    selectedSubtasks.splice(0); //delete all choosed Contacts from last time

    let allChekbox = document.querySelectorAll(`.checkedSubTasks`); //check all checkboxes with the class `.checkedSubTasks`
    console.log(allChekbox.length);
    for (let i = 0; i < allChekbox.length; i++) {
        const checkbox = allChekbox[i];
        if (checkbox.checked) { //if one of the Subtasks checkbox checked
            selectedSubtasks.push(checkbox.value); //push in SelectedSubtasks[Array] value
        }
    }
    console.log('choosedSubtasks', selectedSubtasks);
}

/**render SubTask at the bottom of the subTask Input filed */
function renderSubtasks() {
    appendixSubtask = document.getElementById('SubtaskAppendixContainer');
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
var priority;
var priorityImg;
async function addTask() {

    await loadUserAccountsFromBackend();

    tasks = userAccounts[activeUser].userTasks;
    /**read every Input Fields and Buttons to get value*/
    var title = document.getElementById('title');
    var description = document.getElementById('description');
    /*var contact = document.getElementById('assignInput');*/
    let contact = choosedContacts;
    let subTaskDone = [];
    var category = document.getElementById('input');
    var categoryColor = document.getElementById('color').style.background;
    var dueDate = document.getElementById('date');
    //var subTask = document.getElementById('subtasksInput');
    var subTask = selectedSubtasks;
    if (document.getElementById('prioUrgentBox').classList.contains('bgUrgent')) {
        priority = document.getElementById('prioUrgentBox').innerText;
        var priorityImg = document.createElement("prioUrgentImg");
        priorityImg.src = "assets/img/urgent.png";
    } else if (document.getElementById('prioMediumBox').classList.contains('bgMedium')) {
        priority = document.getElementById('prioMediumBox').innerText;
        var priorityImg = document.createElement("prioMediumImg");
        priorityImg.src = "assets/img/medium.png";
    } else {
        priority = document.getElementById('prioLowBox').innerText;
        var priorityImg = document.createElement("prioLowImg");
        priorityImg.src = "assets/img/low.png";
    }
    var idTask = tasks.length;
    var progress = "To Do";

    /**put every value to the newTask as a JSON Array */
    var newTask = {
        "title": title.value,
        "description": description.value,
        "category": category.value,
        "categoryColor": categoryColor,
        "contact": contact,
        "dueDate": dueDate.value,
        "subTask": subTask,
        "subTaskDone": subTaskDone,
        "priority": priority,
        "priorityImg": priorityImg,
        "id": idTask,
        "progress": progress
    };

    tasks.push(newTask); //new Task was pushed into tasks Array
    console.log(newTask);

    /**dorpdowns were closed by creating or adding Task */
    closeDropdownCategory();
    closeDropDownAssignTo();
    /**shows Task added to board Window with annimation*/
    document.getElementById('messageAddedTask').style.display = "flex";
    document.getElementById('messageAddedTask').classList.add('animate');
    setTimeout(function () {
        document.getElementById('messageAddedTask').style.display = "none";
    }, 3900)
    document.getElementById('addTaskBtn').classList.add('buttonDisabled');
    setTimeout(function () {
        document.getElementById('addTaskBtn').classList.add('buttonEnabled'); //during one Task added blocked the addTaskBtn
    }, 4000)
    /**Set other Inputfields to default values and the prio Buttons to the original text and color*/
    title.value = "";
    description.value = "";
    category.value = "";
    unsetCategoryInputField();
    document.getElementById('assignInput').value = "";
    inputAssignedContact = "";
    dueDate.value = "";
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
    setTimeout(function () {
        window.location = "./board.html";
    }, 3600)

    /**save Tasks and User acc. to backend as JSON Array*/
    await saveTasksToBackend();
    await saveUserAccountsToBackend();
    console.log(choosedContacts);
    choosedContacts = [];
}

/**By clicking the Priority Urgent button the Text and Image color change to white --> Prio Medium and Prio Low change to their original color */
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

/**toggle the white Text and Image of Priority Urgent to original color*/
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

/**By clicking the Priority Medium button the Text and Image color change to white --> Prio Urgent and Prio Low change to their original color */
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

/**toggle the white Text and Image of Priority Medium to original color*/
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


/**By clicking the Priority low button the Text and Image color change to white --> Prio Urgent and Prio Medium change to their original color */
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

/**toggle the white Text and Image of Priority Low to original color*/
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

/**change clear button Image to blue by hover */
function clearBtnhover() {
    document.getElementById('clearBtnImg').classList.add('clearButtonImgblue');
}

/**change clear button Image to the original color*/
function clearBtnCancelhover() {
    document.getElementById('clearBtnImg').classList.remove('clearButtonImgblue');
}

// modify calendar to only select current date or date in the future
async function updateCalender() {
    await includeHTML();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    document.getElementById('date').min = today;
}

/*clear all field of AddTask page*/
function clearAllAddTaskFields() {
    window.location.reload();
}

/**show AddTaskPopOut.html*/
function showAddTaskPopOut() {
    document.getElementById('popOut-taskCard').classList.remove('d-none');
}

/**hide AddTaskPopOut.html*/
function closePopOutAddTask() {
    document.getElementById('popOut-taskCard').classList.add('d-none');
}

