let bothLetters;
let contactName;
let email;
let phone;
let letters = [];
let contactColor = randomUserColor();


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
    let userName = userAccounts[activeUser]['userContacts'];
    getFrontLettersUser();
    document.getElementById('contact-container').innerHTML = '';
    letters.sort();
    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];
        templateLetter(letter, i);

        for (let j = 0; j < userName.length; j++) {

            let name = userAccounts[activeUser]['userContacts'][j]['name'];
            let email = userAccounts[activeUser]['userContacts'][j]['email'];
            let bothLetters = userAccounts[activeUser]['userContacts'][j]['letters'];
            let nameLetter = name.charAt(0);
            if (nameLetter == letter) {
                templateNameCard(i, name, email, j, bothLetters);
                circleColor(j);
            }
        }
    }
}

function circleColor(j) {
    let color = userAccounts[activeUser]['userContacts'][j]['color'];
    document.getElementById('circle' + j).style.backgroundColor = color;
}

function showContact(j, bothLetters) {
    contactName = userAccounts[activeUser]['userContacts'][j]['name'];
    email = userAccounts[activeUser]['userContacts'][j]['email'];
    phone = userAccounts[activeUser]['userContacts'][j]['phone'];
    document.getElementById('contact-circle').innerHTML = `${bothLetters}`
    document.getElementById('float-contact-name').innerHTML = `${contactName}`;
    document.getElementById('email').innerHTML = `${email}`;
    document.getElementById('phone').innerHTML = `${phone}`;
    document.getElementById('floating-contact-container').style.display = "";
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

}

function getInputValues() {
    let contact_email = document.getElementById('contact-email');
    let contact_phone = document.getElementById('contact-phone');
    let contact_name = document.getElementById('contact-name');
    let inputName = contact_name.value;
    const firstLetter = inputName.charAt(0).toUpperCase();
    const remainingLetters = inputName.slice(1);
    contactName = firstLetter + remainingLetters;
    console.log(contactName);
    email = contact_email.value;
    phone = contact_phone.value;
    let helpLetter = contactName.split(" ");
    bothLetters = helpLetter[0].charAt(0).toUpperCase() + helpLetter[1].charAt(0).toUpperCase();
}



async function CreateNewContact() {
    await loadUserAccountsFromBackend();
    let userName = userAccounts[activeUser].userContacts;
    getInputValues();
    let contact_obj = { 'name': contactName, 'email': email, 'phone': phone, 'letters': bothLetters, 'color': contactColor };
    userName.push(contact_obj);
    //console.log(userName);
    saveUserAccountsToBackend();
    //console.log(userName, letters);
    closeContactCard();
    sortNames();
    console.log(userAccounts[activeUser]);
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