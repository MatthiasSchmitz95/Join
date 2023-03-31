let bothLetters;
let contactName;
let email;
let phone;
let contact_nr = 0;
let contacts = [];
let letters = [];

function sortNames() {
    document.getElementById('contact-container').innerHTML = '';
    letters.sort();
    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];
        templateLetter(letter, i);

        for (let j = 0; j < contacts.length; j++) {
            let name = contacts[j]['name'];
            let email = contacts[j]['email']
            let bothLetters =contacts[j]['letters'] 
            let nameLetter = name.charAt(0);
            if (nameLetter == letter) {
            templateNameCard(i, nameLetter, name, email, j,bothLetters);
            }
        }
    }
}

function showContact(j,nameLetter) {
    contactName = contacts[j]['name'];
    email = contacts[j]['email'];
    phone = contacts[j]['phone'];
    document.getElementById('contact-circle').innerHTML = `${bothLetters}`
    document.getElementById('float-contact-name').innerHTML = `${contactName}`;
    document.getElementById('email').innerHTML = `${email}`;
    document.getElementById('phone').innerHTML = `${phone}`;
}

function templateNameCard(i, nameLetter, name, email, j) {
    document.getElementById('contact-cards' + i).innerHTML += `
    <div class="name-card" id=name-card${j} onclick="showContact(${j},'${nameLetter}')">
      <div class="circle">${nameLetter}</div>
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

function sortLetters() {
    letters.sort();
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        document.getElementById('contact-container').innerHTML += `<div id="letter-container">${letter}</div>`;

    }
}

function getFirstLetter() {
    for (let i = 0; i < contacts.length; i++) {
        let letter = contacts[i]['name'];
        letter = letter.charAt(0);
        letter = letter.toUpperCase();
        check = letters.indexOf(letter);
        if (check == -1) {
            letters.push(letter);
        }
    }
    console.log(letters)
}

function showCard() {
    document.getElementById('contact-card').classList = 'add-contact-card';

}

function closeContactCard() {
    document.getElementById('contact-card').classList = 'hidden';

}

function getInputValues() {
    let contact_email = document.getElementById('contact-email');
    let contact_phone = document.getElementById('contact-phone');
    let contact_name = document.getElementById('contact-name');
    contactName = contact_name.value;
    email = contact_email.value;
    phone = contact_phone.value;
    let helpLetter = contactName.split(" ");
    bothLetters = helpLetter[0].charAt(0) + helpLetter[1].charAt(0);
}

function updateContactNr() {
    contact_nr++;
    console.log(contact_nr);
}

function CreateNewContact() {
    getInputValues();
    let contact_obj = { 'name': contactName, 'email': email, 'phone': phone, 'letters': bothLetters};
    contacts.push(contact_obj);
    console.log(contacts);
    updateContactNr();
    closeContactCard();
    displayContactList();

}

function displayContactList() {
    getFirstLetter();
    sortNames();
    console.log(letters, contacts)

}