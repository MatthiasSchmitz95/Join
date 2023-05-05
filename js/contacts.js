let bothLetters;
let contactName;
let inputName;
let email;
let phone;
let letters = [];
let contactColor = randomUserColor();

function onloadContact() {
    init('contacts');
    sortNames();
    sortLetters();
    updateCalender('date');
}

function getFrontLettersUser() {
    let userName = userAccounts[activeUser].userContacts;
    for (let i = 0; i < userName.length; i++) {
        const contact = userName[i]['name'];
        let firstChar = contact.charAt(0);
        firstChar = firstChar.toUpperCase();
        check = letters.indexOf(firstChar);
        if (check == -1) {
            letters.push(firstChar);
        }
    }
    sortLetters();

}


async function sortNames() {
    await loadUserAccountsFromBackend();
    loadActiveUserLocal();
    getFrontLettersUser();
    let userName = userAccounts[activeUser].userContacts;
    document.getElementById('contact-container').innerHTML = '';
    letters.sort();
    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];
        templateLetter(letter, i);

        for (let j = 0; j < userName.length; j++) {

            let name = userName[j]['name'];
            let email = userName[j]['email'];
            let bothLetters = userName[j]['letters'];
            let nameLetter = name.charAt(0);
            if (nameLetter == letter) {
                templateNameCard(i, name, email, j, bothLetters);
                circleColor(j);
            }
        }
    }
}


function circleColor(j) {
    let color = userAccounts[activeUser].userContacts[j]['color'];
    document.getElementById('circle' + j).style.backgroundColor = color;
}


function showContact(j, bothLetters) {
    document.getElementById('right-container').style.justifyContent = 'flex-start';
    if (window.innerWidth < 1140) {
        document.getElementById('kanban').classList.add("display");
    }
    let color = userAccounts[activeUser].userContacts[j]['color'];
    contactName = userAccounts[activeUser]['userContacts'][j]['name'];
    email = userAccounts[activeUser]['userContacts'][j]['email'];
    phone = userAccounts[activeUser]['userContacts'][j]['phone'];
    document.getElementById('contact-circle-letters').innerHTML = `${bothLetters}`;
    document.getElementById('contact-circle').style.backgroundColor = `${color}`;
    document.getElementById('float-contact-name').innerHTML = `${contactName}`;
    document.getElementById('contact-information').innerHTML = `<h4>Contact information</h4>
    <a class="edit" onclick="editContactCard(${j});"><img src="assets/img/edit-contact.png"><p>Edit contact</p></a>`;
    document.getElementById('responsive-buttons').innerHTML = `
    <button class="delete-button-responsive" onclick="deleteContact(${j});"><img src="assets/img/delete-contact.png"> </button>
    <button class="edit-button-responsive" onclick="editContactCard(${j});"><img src="assets/img/edit-contact2.png"> </button>`;
    document.getElementById('email').innerHTML = `${email}`;
    document.getElementById('phone').innerHTML = `${phone}`;
    document.getElementById('floating-contact-container').style.display = "flex";
    document.getElementById('right-container').classList.add("display");
    displayFloatContact();
}

function displayFloatContact() {
    document.getElementById('name-container').style.display = '';
    document.getElementById('contact-details').style.display = '';
}


function editContactCard(j) {

    changeTemplate(j);
    setInputfields(j);
    changeProfileInitials(j);
    showCard();
}

function changeProfileInitials(j) {
    let initials = userAccounts[activeUser]['userContacts'][j]['letters'];
    let color = userAccounts[activeUser]['userContacts'][j]['color'];
    // document.getElementById('icon-container').innerHTML = `<div class="icon-container">`;
    document.getElementById('icon-container').innerHTML = `${initials}`;
    document.getElementById('icon-container').style.backgroundColor = `${color}`;
}


async function deleteContact(j) {
    letters = [];
    document.getElementById('floating-contact-container').style.display = 'none';
    userAccounts[activeUser]['userContacts'].splice(j, 1);
    await saveUserAccountsToBackend();
    sortNames();
    closeContactCard();
    changeTextTo('deleted');
    successfulAnimation();
}


async function editContact(j) {
    letters = [];
    getInputValues();
    let contact_obj = { 'name': contactName, 'email': email, 'phone': phone, 'letters': bothLetters, 'color': contactColor };
    userAccounts[activeUser]['userContacts'].splice(j, 1, contact_obj);
    await saveUserAccountsToBackend();
    sortNames();
    showContact(j, bothLetters);
    closeContactCard();
    changeTextTo('edited');
    successfulAnimation();
}


function changeTextTo(text) {
    document.getElementById('success').innerHTML = `Contact succesfully ${text}`;

}


function sortLetters() {
    letters.sort();
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        document.getElementById('contact-container').innerHTML += `<div id="letter-container">${letter}</div>`;

    }
}


function showCard() {
    document.getElementById('bg').style.display = '';
    document.getElementById('contact-card').classList = 'add-contact-card';
}


function closeContactCard() {
    document.getElementById('contact-card').classList = 'hidden';
    document.getElementById('bg').style.display = 'none';
    changeTemplateBack();
    resetInputfields();

}


function getInputValues() {
    let contact_email = document.getElementById('contact-email');
    let contact_phone = document.getElementById('contact-phone');
    let contact_name = document.getElementById('contact-name');
    inputName = contact_name.value;
    email = contact_email.value;
    phone = contact_phone.value;
    const firstLetter = inputName.charAt(0).toUpperCase();
    const remainingLetters = inputName.slice(1);
    contactName = firstLetter + remainingLetters;
    contactColor = randomUserColor();
    if (inputName.indexOf(' ') >= 0) {
        let helpLetter = contactName.split(" ");
        bothLetters = helpLetter[0].charAt(0).toUpperCase() + helpLetter[1].charAt(0).toUpperCase();
    }
    else {
        bothLetters = firstLetter;
    }
}


async function CreateNewContact() {
    await loadUserAccountsFromBackend();
    let userName = userAccounts[activeUser].userContacts;
    getInputValues();
    let contact_obj = { 'name': contactName, 'email': email, 'phone': phone, 'letters': bothLetters, 'color': contactColor };
    userName.push(contact_obj);
    await saveUserAccountsToBackend();
    closeContactCard();
    changeTextTo('created');
    successfulAnimation();
    sortNames();
    resetInputfields();
    showContact(userName.length - 1, bothLetters);
}


function resetInputfields() {
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-phone').value = '';
    document.getElementById('contact-name').value = '';
}


function setInputfields(j) {
    document.getElementById('contact-email').value = userAccounts[activeUser]['userContacts'][j]['email'];
    document.getElementById('contact-phone').value = userAccounts[activeUser]['userContacts'][j]['phone'];
    document.getElementById('contact-name').value = userAccounts[activeUser]['userContacts'][j]['name'];

}


function successfulAnimation() {

    setTimeout(() => {
        document.getElementById('success').classList.add("add-success");
    }
        , 200);

    setTimeout(() => {
        document.getElementById('success').classList.remove("add-success");
    }
        , 1000);

}


function showAddTaskPopOut() {
    document.getElementById('popOut-taskCard').classList.remove('d-none');
}


function closePopOutAddTask() {
    document.getElementById('popOut-taskCard').classList.add('d-none');
}

function backToContactList() {
    document.getElementById('right-container').classList.remove("display");
    document.getElementById('kanban').classList.remove("display");
   // document.getElementById('left-container').style.display = '';
}


function changeTemplate(j) {
    document.getElementById('card-header').innerHTML = '<h3>Edit contact</h3>';
    document.getElementById('btn-container').innerHTML = `                
    <button id="left-btn" onclick="deleteContact(${j})" class="btn-contact-white">Delete<img class="cancel-img"
    src="assets/img/contact-cancel-button.png"></button>
    <button id="right-btn" onclick="editContact(${j})" class="btn-contact-blue">Save<img class="create-contact-img"
    src="assets/img/contact-create-contact-button.png"></button>`;
    document.getElementById('right-btn').classList.add("width-btn");

}


function changeTemplateBack() {
    document.getElementById('icon-container').innerHTML = '<img src="assets/img/add-contact-profile.png">';
    document.getElementById('card-header').innerHTML = `<h3>Add contact</h3>
    <p>Tasks are better with a team!</p>`;
    document.getElementById('btn-container').innerHTML = `                
    <button id="left-btn" onclick="closeContactCard()" class="btn-contact-white">Cancel<img class="cancel-img"
    src="assets/img/contact-cancel-button.png"></button>
    <button id="right-btn" onclick="CreateNewContact()" class="btn-contact-blue">Create contact<img class="create-contact-img"
    src="assets/img/contact-create-contact-button.png"></button>`;
    document.getElementById('right-btn').classList.remove("width-btn");

}


function templateNameCard(i, name, email, j, bothLetters) {
    document.getElementById('contact-cards' + i).innerHTML += `
    <div class="name-card" id=name-card${j} onclick="showContact(${j},'${bothLetters}')">
      <div class="circle" id="circle${j}">${bothLetters}</div>
      <div class="info">
            <h4> ${name} </h4>
             <p> ${email} </p>
     </div>
    </div>`;
}


function templateLetter(letter, i) {
    document.getElementById('contact-container').innerHTML +=
        `<div class="contact-list">
        <div id="letter-container">
        ${letter}
        </div>
        <span class="vertical-line"></span>
        <div class="contact-cards" id="contact-cards${i}">
        </div>
    </div>`;
}