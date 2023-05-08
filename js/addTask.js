var categoriesArray = ['New Category', 'Sales', 'Marketing'];
var colorsArray = ['', 'red', 'blue'];
var newCategoryColors = ['#8AA4FF', '#FF0000', '#2AD300', '#FF8A00', '#E200BE', '#0038FF'];
var categoryInputContainer;
var assignToInputContainer;
var onInputSubTask;
var subtaskInput;
var appendixSubtask;
var categoryList;
var choseContacts = [];
var l = false;
var j = false;

var priority;
var priorityImg;
var addsubtask;
var subTasks = [];
var selectedSubtasks = [];
var userName;
var newAssingedContact;
var newLetters2;
var selectedContactLetters = [];
var newContacts = [];
var newAddedContactLetters = [];
var arrayContactColor = [];
var helpVarSumit = false;

/**global variable for addTask() function */
var title;
var description;
var contact;
var subTaskDone;
var category;
var categoryColor;
var dueDate;
var subTask;
var idTask;
var progress;

/**
 * this function is used to load AddTask-HTML page (init function)
 */
function onloadAddTask() {
    init('addTask');
    renderSubtasks();
    updateCalender();
}

/**
 * This function is use to render Category with a Color Dots
 */
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

/**This function set Category InputField to default as in beginning with a placholder and a drop down Button*/
function unsetCategoryInputField() {
    categoryInputContainer = document.getElementById('inputContainer');
    categoryInputContainer.innerHTML = `
    <input class="input" id="input" type="text" placeholder="Select task Category" required>
    <div id="color" class="color"></div>
    <div id="buttonDropDown" class="buttonOpenCloseCategory" onclick="dropDown()">
        <img src="assets/img/dropdown-arrow.png">
    </div>`;
}

/**This function shows Category Select Menu - toggle at clicking on the dropdown Button */
function dropDown() {
    categoryList = document.getElementById('categoryList');
    if (categoryList.style.display == "block") {
        closeDropdownCategory();
    } else {
        showDropdownCategory();
    } closeDropDownAssignTo();
}

/**This function closes the Category Select Menu*/
function closeDropdownCategory() {
    var categoryList = document.getElementById('categoryList');
    categoryInputContainer = document.getElementById('inputContainer');
    categoryList.style.display = "none";
    categoryInputContainer.style.border = "1px solid #D1D1D1";
    categoryInputContainer.style.borderRadius = "10px";
    if (l == true) {
        document.getElementById("input").disabled = true;
    } else {
        document.getElementById("input").disabled = false;
    }
}

/**This function shows the Category Select Menu*/
function showDropdownCategory() {
    if (j == false) {
        categoryList = document.getElementById('categoryList');
        categoryInputContainer = document.getElementById('inputContainer');
        categoryList.style.display = "block";
        categoryInputContainer.style.borderBottom = "none";
        categoryInputContainer.style.borderRadius = "10px 10px 0 0";
        renderCategory();
    }
}

/**
 * This function choose one Category with it's color dot from the Category DropDown Menu
 * @param {number} index - position of the Category in the Array
 * @param {string} category - the name of the category
 * @param {color-hex-string} color - background color hex. code
 */
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

/** This function allows to insert in the category input field for new category input */
function newCategoryInput() {
    closeDropdownCategory();
    document.getElementById('input').placeholder = 'New Category Name';
    document.getElementById('newCategoryInput').style.display = "flex";
    document.getElementById('buttonDropDown').style.display = "none";
    document.getElementById('newCategoryColorsBox').style.display = "flex";
    document.getElementById("input").disabled = false;
    l = true;
    j = true;
}

/**
 *  This function gets the background color for the new category color dot
*/
var newCategoryColor;
function newColor(color) {
    document.getElementById('color').style.background = color;
    newCategoryColor = color;
}

/**
 * The function allows to input new category name in the Category Array and input the color for the color Array
 */
function addNewCategory() {
    var newCategory = document.getElementById('input');
    categoriesArray.push(newCategory.value);
    document.getElementById('newCategoryColorsBox').style.display = "none";
    document.getElementById('newCategoryInput').style.display = "none";
    document.getElementById('buttonDropDown').style.display = "flex";
    document.getElementById('color').style.background = newCategoryColor;
    colorsArray.push(newCategoryColor);
    j = false;
}

/*** The function returns the Category Container to the default */
function rejectNewCategory() {
    document.getElementById('buttonDropDown').style.display = "flex";
    document.getElementById('newCategoryInput').style.display = "none";
    document.getElementById('input').value = "";
    document.getElementById('input').placeholder = 'Select task Category';
    document.getElementById('newCategoryColorsBox').style.display = "none";
    document.getElementById("input").disabled = true;
    document.getElementById('color').style = 'background: rgb(255,255,255)';
    j = false;
}

/**
 *  The function render the assigned user contacts
 *  and allows to invite the new contact via email
 * */
async function renderAssignTo() {
    await loadUserAccountsFromBackend();
    loadActiveUserLocal();
    let assignedContactList = document.getElementById('assignedList');
    assignedContactList.innerHTML = ""; //clear container inside html
    for (let i = 0; i < userAccounts[activeUser]['userContacts'].length; i++) {
        userName = userAccounts[activeUser]['userContacts'][i]['name'];
        assignedContactList.innerHTML += templateRenderAssignToContacts(userName);
    }
    assignedContactList.innerHTML += templateRenderAssignToNewContact();
}

/**
 * This function is a HTML-template to render the assigned contacts
 * @param {string} userName - the name of the assigned contact at certain index
 * @returns - the contact names
 */
function templateRenderAssignToContacts(userName){
    return /*html*/`
    <div class="assignedContact" >
        <div>${userName}</div>
        <label class="filledCheckboxContainer">
            <input type="checkbox" class="checkboxForContacts" value="${userName}" onclick="chooseContact('${userName} ')">
            <span class="checkmark"></span>
        </label>
    </div>
    `;
}

/** This function is a HTML-template to render the invite new contact Text and it's image*/
function templateRenderAssignToNewContact(){
    return /*html*/`
    <div class="assignedContact" onclick="assignToInput()">
        <div>invite new contacts</div>
        <img src="assets/img/new_contact.png" class="newContactImg">
    </div>
`;
}

/**
 * This function allows user to choose the contact with the checkbox - the check marked contact is showing below in a cirle
 * @param {string} name - the name of the contact which was selected from the userAccounts in the renderAssignTo() function 
 */
function chooseContact(name) {
    let inputAssignedContact = document.getElementById('assignInput');
    inputAssignedContact.value = name;
    choseContacts.splice(0);
    let allChekbox = document.querySelectorAll('.checkboxForContacts');
    for (let i = 0; i < allChekbox.length; i++) {
        const checkbox = allChekbox[i];
        if (checkbox.checked) {
            choseContacts.push(checkbox.value);
        }
        displayChosenContactsForTask();
    }
    console.log('chosenContact', choseContacts);
}

/**
 * This function render the check marked contacts
 */
async function renderAssignToCheckMarked() {
    await loadUserAccountsFromBackend();
    loadActiveUserLocal();
    let assignedContactList = document.getElementById('assignedList');
    assignedContactList.innerHTML = ""; //clear container inside html
    for (let i = 0; i < userAccounts[activeUser]['userContacts'].length; i++) {
        let userName = userAccounts[activeUser]['userContacts'][i]['name'];
        const element = choseContacts;
        const contact = element.includes(userName);
        const checkedAttribute = contact ? 'checked' : '';
        assignedContactList.innerHTML += renderAssignToCheckMarkedHTML(userName, checkedAttribute)
    }
    assignedContactList.innerHTML += renderAssignToCheckMarkedHTMLNewContact();
}

/**
 * HTML-Template for render the check marked contacts
 * @param {string} userName - contact name
 * @param {true/false} checkedAttribute - checkbox true or false
 * @returns - HTML Code of name and checked attribute of checkbox
 */
function renderAssignToCheckMarkedHTML(userName, checkedAttribute) {
    return `
    <div class="assignedContact" >
        <div>${userName}</div>
        <label class="filledCheckboxContainer">
            <input type="checkbox" class="checkboxForContacts" value="${userName}" ${checkedAttribute} onclick="chooseContact('${userName} ')">
                <span class="checkmark"></span>
        </label>
    </div>
    `;
}

/**
 * HTML-Template for render new contact
 * @returns 
 */
function renderAssignToCheckMarkedHTMLNewContact() {
    return /*html*/`
    <div class="assignedContact" onclick="assignToInput()">
            <div>invite new contacts</div>
            <img src="assets/img/new_contact.png" class="newContactImg">
        </div>
    `;
}

/**Show AssignTo Select Menu - toggle at clicking on the dropdown Button*/
function dropDownAssignTo() {
    var assignedList = document.getElementById('assignedList');
    assignToInputContainer = document.getElementById('contactInputContainer');
    document.getElementById('circleContactsContainer').style.display = "flex";
    if (assignedList.style.display == "block") {
        closeDropDownAssignTo();
    } else {
        showDropDownAssignTo();
    }
    closeDropdownCategory();
}

/*** close the dropdown AssignTo Menu*/
function closeDropDownAssignTo() {
    var assignedList = document.getElementById('assignedList');
    assignToInputContainer = document.getElementById('contactInputContainer');
    assignedList.style.display = "none";
    assignToInputContainer.style.border = "1px solid #D1D1D1";
    assignToInputContainer.style.borderRadius = "10px";
    document.getElementById('circleContactsContainer').style.display = "flex";
}

/**open the dropdown AssignTo Menu*/
function showDropDownAssignTo() {
    var assignedList = document.getElementById('assignedList');
    assignToInputContainer = document.getElementById('contactInputContainer');
    assignedList.style.display = "block";
    assignToInputContainer.style.borderBottom = "none";
    assignToInputContainer.style.borderRadius = "10px 10px 0 0";
    if (choseContacts == '') {
        renderAssignTo();
    } else {
        renderAssignToCheckMarked();
        displayChosenContactsForTask();
    }
}

/**This function is used for invite new contact via an Email to assign into the Kanban Project Managment Tool*/
function assignToInput() {
    helpVarSumit = true;
    document.getElementById('assignedList').innerHTML = `<form action="/Join/send-email.php" method="post">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email placeholder="email"">
    <button type="submit" onclick="showEmailSentStatus()">Submit</button>
    </form>`;
    document.getElementById('assignedList').style.display = "block !important";
}

/**
 * This function allows to set the AssignTo input field to default style
 */
function rejectAssignTo() {
    document.getElementById('assignInput').value = "";
    document.getElementById('assignInput').placeholder = "Select contacts to assign";
    closeDropDownAssignTo();
    document.getElementById('newAssignToInput').style.display = "none";
    document.getElementById('assignDropDown').style.display = "flex";
    document.getElementById('circleContactsContainer').style.display = "flex";
}

/**This function call the other function which shows the e-mail has been sent to the new contact*/
function addnewContact() {
    showEmailSentStatus();
}

/**This function shows the email sent status in a Box*/
function showEmailSentStatus() {
    newAssingedContact = document.getElementById('assignInput');
    assignToInputContainer.style.borderBottom = "none";
    assignToInputContainer.style.borderRadius = "10px 10px 0 0";
    newContacts.push(newAssingedContact.value);
    document.getElementById('assignedList').style.display = "block";
    document.getElementById('assignedList').value = "";
    document.getElementById('assignedList').innerHTML = `
    Email was sent successfully!
    `;
}

/** This function shows the chosen contacts under AssignTo-box in a filled cirlce of two letters for each chosen contact */
function displayChosenContactsForTask() {
    document.getElementById('circleContactsContainer').style.display = "flex";
    renderCircleName();
}

/**This function sorts the contact names into two letters*/
function showContactsByTwoLetters() {
    for (let i = 0; i < choseContacts.length; i++) {
        let chosenContact = choseContacts[i];
        const firstLetter = chosenContact.charAt(0).toUpperCase();
        const remainingLetters = chosenContact.slice(1);
        contactName = firstLetter + remainingLetters;
        contactColor = getUserColor(i);
        arrayContactColor.push(contactColor);
        if (chosenContact.indexOf(' ') >= 0) {
            let helpLetter = contactName.split(" ");
            newLetters2 = helpLetter[0].charAt(0).toUpperCase() + helpLetter[1].charAt(0).toUpperCase();
            selectedContactLetters.push(newLetters2);
        } else {
            newLetters2 = firstLetter;
            selectedContactLetters.push(newLetters2);
        }
    }
}

/** show Contact name in two letters in a Circle with a background color*/
function renderCircleName() {
    showContactsByTwoLetters();
    document.getElementById('circleContactsContainer').innerHTML = "";
    for (let i = 0; i < selectedContactLetters.length; i++) {
        const letters = selectedContactLetters[i];
        const bgContactColor = arrayContactColor[i];
        renderNamesInTwoLetters(bgContactColor, letters);
    }
    selectedContactLetters.splice(0);
    newAddedContactLetters.splice(0);
    newContacts.splice(0);
    arrayContactColor.splice(0);
}

/**HTML-templates for renderCircleName() */
function renderNamesInTwoLetters(bgContactColor, letters) {
    return document.getElementById('circleContactsContainer').innerHTML += `
    <div class="circleContact" id="circleContact" style="background-color: ${bgContactColor} !important">  ${letters}
    </div>
    `;
}

/*Subtask*/
/**By clicking the + Symbol changed to New subTask Input*/
function createNewSubtask() {
    addsubtask = document.getElementById('addSubtaskBtn');
    onInputSubTask = document.getElementById('subtaskOninput');
    addsubtask.style.display = "none";
    onInputSubTask.style.display = "flex";
}

/**onclick cross mark all Subtasks are deleted except of the subTasks[0] -> it only left the default value in subTasks Array */
function deleteSubTask() {
    addsubtask = document.getElementById('addSubtaskBtn');
    onInputSubTask = document.getElementById('subtaskOninput');
    subtaskInput = document.getElementById('subtasksInput');
    appendixSubtask = document.getElementById('SubtaskAppendixContainer');
    subtaskInput.value = "";
    addsubtask.style.display = "flex";
    onInputSubTask.style.display = "none";
    subTasks.pop();
    renderSubtasks();
}

/**
 * This function wait for the subTask input and render the SubTask one after one when the user insert subtask
 */
function addSubTask() {
    subtaskInput = document.getElementById('subtasksInput');
    addsubtask.style.display = "flex";
    onInputSubTask.style.display = "none";
    if (subtaskInput.value != "") {
        let subTask = subtaskInput.value;
        subTasks.push(subTask);
        renderSubtasks();
    }
    subtaskInput.value = "";
}


/** This function insert the checked SubTask to the Array*/
function chooseSubtasks() {
    selectedSubtasks.splice(0);
    let allChekbox = document.querySelectorAll(`.checkedSubTasks`);
    console.log(allChekbox.length);
    for (let i = 0; i < allChekbox.length; i++) {
        const checkbox = allChekbox[i];
        if (checkbox.checked) {
            selectedSubtasks.push(checkbox.value);
        }
    }
}

/**
 * This function tender all subTasks with their check boxes
 */
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
 * This function is used to create a (Project Management Task Object) which include the information of the title, description, due date, priority, the department, contact etc.
 */
async function addTask() {
    await loadUserAccountsFromBackend();
    tasks = userAccounts[activeUser].userTasks;
    title = document.getElementById('title');
    description = document.getElementById('description');
    contact = choseContacts;
    subTaskDone = [];
    category = document.getElementById('input');
    categoryColor = document.getElementById('color').style.background;
    dueDate = document.getElementById('date');
    getPriorityInformation();
    subTask = selectedSubtasks;
    idTask = generateTaskId(tasks);
    progress = "To Do";
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
    tasks.push(newTask);
    console.log(newTask);
    await saveTasksToBackend();
    await saveUserAccountsToBackend();
    annimationTaskAddedToBoard();
    setAllFieldsToDefault();
    closeDropdownCategory();
    closeDropDownAssignTo();
    choseContacts = [];
}

/** This function decides with the priority background color which Priority has been activated and get all the inputs of the one priority box*/
function getPriorityInformation() {
    if (document.getElementById('prioUrgentBox').classList.contains('bgUrgent')) {
        priority = document.getElementById('prioUrgentBox').innerText;
        priorityImg = document.createElement("prioUrgentImg");
        priorityImg = "assets/img/urgent.png";
    } else if (document.getElementById('prioMediumBox').classList.contains('bgMedium')) {
        priority = document.getElementById('prioMediumBox').innerText;
        priorityImg = document.createElement("prioMediumImg");
        priorityImg = "assets/img/medium.png";
    } else {
        priority = document.getElementById('prioLowBox').innerText;
        priorityImg = document.createElement("prioLowImg");
        priorityImg = "assets/img/low.png";
    }
}

/**Set other Inputfields to default values and the prio Buttons to the original text and color*/
function setAllFieldsToDefault() {
    title = document.getElementById('title');
    title.value = "";
    description = document.getElementById('description');
    description.value = "";
    category = document.getElementById('input');
    category.value = "";
    unsetCategoryInputField();
    document.getElementById('assignInput').value = "";
    let inputAssignedContact = document.getElementById('assignInput');
    inputAssignedContact = "";
    dueDate = document.getElementById('date');
    dueDate.value = "";
    setPrioBoxesTodefault();
    deleteSubTask();
}

/**This function return the priority boxes to default style*/
function setPrioBoxesTodefault(){
    document.getElementById('prioUrgentBox').classList.remove('bgUrgent');
    document.getElementById('prioMediumBox').classList.remove('bgMedium');
    document.getElementById('prioLowBox').classList.remove('bgLow');
    document.getElementById('prioUrgentBox').classList.remove('bgTextWhite');
    document.getElementById('prioMediumBox').classList.remove('bgTextWhite');
    document.getElementById('prioLowBox').classList.remove('bgTextWhite');
    document.getElementById('prioUrgentImg').classList.remove('Img-white');
    document.getElementById('prioMediumImg').classList.remove('Img-white');
    document.getElementById('prioLowImg').classList.remove('Img-white');
}

/**
 * show the animation when the Task is created and direct to the board page
 * while a task is being added to the board the addTask Button is disabled
 * */
function annimationTaskAddedToBoard() {
    document.getElementById('messageAddedTask').style.display = "flex";
    document.getElementById('messageAddedTask').classList.add('animate');
    setTimeout(function () {
        document.getElementById('messageAddedTask').style.display = "none";
    }, 3900)
    document.getElementById('addTaskBtn').classList.add('buttonDisabled');
    setTimeout(function () {
        document.getElementById('addTaskBtn').classList.add('buttonEnabled');
    }, 4000)
    setTimeout(function () {
        window.location = "./board.html";
    }, 3600)
}

/**
 * Function to generate new Id if one Id contains in the Task
 * @param {number} tasks - it shows the Id-Number of (Project Management Task Object) 
 * @returns {number} id - return a new Id-Number (the next larger number)
 */
function generateTaskId(tasks) {
    var id = tasks.length;
    var idExists = true;
    while (idExists) {
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) {
                idExists = true;
                break;
            } else {
                idExists = false;
            }
        } if (idExists) {
            id++;
        }
    } return id;
}

/**This function changes the Text and Image color to white of the Priority Urgent button, the other buttons (Prio Medium and Prio Low) change to their original color */
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

/**This function toggles the white Text and Image of Priority Urgent to original color*/
function toggleInsertUrgent() {
    document.getElementById("prioUrgentBox").addEventListener("click", function handleClick(event) {
        const hasClass = event.target.classList.contains('bgUrgent');
        if (hasClass) {
            document.getElementById('prioUrgentBox').classList.add('bgTextWhite');
            document.getElementById('prioUrgentImg').classList.add("Img-white");
        } else {
            document.getElementById('prioUrgentBox').classList.remove('bgTextWhite');
            document.getElementById('prioUrgentImg').classList.remove("Img-white");
        }
    });
}

/**This function changes the Text- and Image-color to white of the Priority Medium button, other buttons (Prio Urgent and Prio Low) change to their original color */
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

/**This function toggles the white Text and Image of Priority Medium to original color*/
function toggleInsertMedium() {
    document.getElementById("prioMediumBox").addEventListener("click", function handleClick(event) {
        const hasClass = event.target.classList.contains('bgMedium');
        if (hasClass) {
            document.getElementById('prioMediumBox').classList.add('bgTextWhite');
            document.getElementById('prioMediumImg').classList.add("Img-white");
        } else {
            document.getElementById('prioMediumBox').classList.remove('bgTextWhite');
            document.getElementById('prioMediumImg').classList.remove("Img-white");
        }
    });
}

/**This function changes the Text- and Image-color to white of the Priority low button, other buttons (Prio Urgent and Prio Medium) change to their original color */
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

/**This function toggles the white Text and Image of Priority Low to original color*/
function toggleInsertLow() {
    document.getElementById("prioLowBox").addEventListener("click", function handleClick(event) {
        const hasClass = event.target.classList.contains('bgLow');
        if (hasClass) {
            document.getElementById('prioLowBox').classList.add('bgTextWhite');
            document.getElementById('prioLowImg').classList.add("Img-white");
        } else {
            document.getElementById('prioLowBox').classList.remove('bgTextWhite');
            document.getElementById('prioLowImg').classList.remove("Img-white");
        }
    });
}

/**This function changes clear button Image to blue by hover */
function clearBtnhover() {
    document.getElementById('clearBtnImg').classList.remove('clearButtonImgGray');
    document.getElementById('clearBtnImg').classList.add('clearButtonImgblue');
}

/**This function changes clear button Image to the original color*/
function clearBtnCancelhover() {
    document.getElementById('clearBtnImg').classList.remove('clearButtonImgblue');
    document.getElementById('clearBtnImg').classList.remove('clearButtonImgGray');
}

/** This function change the color of the Clear Button to gray when it is onactive*/
function setClearBtnOnActive() {
    document.getElementById('clearBtnImg').classList.remove('clearButtonImgblue');
    document.getElementById('clearBtnImg').classList.add('clearButtonImgGray');
}

/**This function modify calendar to only select current date or date in the future */
async function updateCalender() {
    await includeHTML();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    document.getElementById('date').min = today;
}

/**clear all field of AddTask page*/
function clearAllAddTaskFields() {
    setAllFieldsToDefault();
}

/**show AddTaskPopOut.html*/
function showAddTaskPopOut() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    document.getElementById('popOut-taskCard').classList = "popOut-taskCard";
    document.getElementById('contentContainer').classList.add('scrollY');
    document.getElementById('kanban').classList.add('kanban');
    document.getElementById('profile-container').classList.add('profile-container-d-none');
    document.getElementById('bodyBoard').classList.add('noScrollSite');
    document.getElementById('bg').style.display = '';
}

/**hide AddTaskPopOut.html*/
function closePopOutAddTask() {
    document.getElementById('popOut-taskCard').classList = "popOut-hidden";
    document.getElementById('bg').style.display = 'none';
    document.getElementById('bodyBoard').classList.remove('noScrollSite');
    document.getElementById('kanban').classList.remove('kanban');
    document.getElementById('profile-container').classList.remove('profile-container-d-none');
}

/**
 * This funktion gets the usercolor from the assigned contacts
 * @param {number} userIndex - This is the Id-Number of one user
 * @returns - hex-code of the color user
 */
function getUserColor(userIndex) {
    const colorUser = userAccounts[activeUser]['userContacts'][userIndex]['color'];
    console.log(colorUser);
    return colorUser;
}

/**
 * This function is used to filter contact by entering the letters
 */
function filterContact() {
    let search = document.getElementById('assignInput').value;
    search = search.toLowerCase();
    let content = document.getElementById('assignedList');
    content.innerHTML = '';
    assignToInputContainer = document.getElementById('contactInputContainer');
    content.style.display = "block";
    assignToInputContainer.style.borderBottom = "none";
    assignToInputContainer.style.borderRadius = "10px 10px 0 0";
    for (let i = 0; i < userAccounts[activeUser]['userContacts'].length; i++) {
        userName = userAccounts[activeUser]['userContacts'][i]['name'];
        userNameLowerLetter = userName.toLowerCase();
        if (userNameLowerLetter.includes(search)) {
            content.innerHTML += templateRenderAssignToContacts(userName); 
        }
    }
}