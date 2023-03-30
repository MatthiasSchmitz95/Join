let contactName;
let email;
let phone;
let contact_nr = 0;
let contacts = [];
let letters = [];

function sortNames(){
    document.getElementById('contact-container').innerHTML ='';
    letters.sort();
    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];
        document.getElementById('contact-container').innerHTML += `<div id="letter-container">${letter}</div>`;
        for (let j = 0; j < contacts.length; j++) {
            let name = contacts[j]['name'];
            let nameLetter = name.charAt(0);
            if (nameLetter.includes(letter)) {
                document.getElementById('letter-container').innerHTML += `${name}`;
                
            }
            
        }
        
    }
}

function sortLetters() {
    letters.sort();
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        document.getElementById('contact-container').innerHTML += `<div id="letter-container">${letter}</div>`;

    }
}

function getFirstLetter() {
    letters = [];
    for (let i = 0; i < contacts.length; i++) {
        let letter = contacts[i]['name'];
        letter = letter.charAt(0);
        letter = letter.toUpperCase();
        check = letters.indexOf(letter);
        if (check = -1) {
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
}

function updateContactNr() {
    contact_nr++;
    console.log(contact_nr);
}

function CreateNewContact() {
    getInputValues();
    let contact_obj = { 'name': contactName, 'email': email, 'phone': phone };
    contacts.push(contact_obj);
    console.log(contacts);
    updateContactNr();
    closeContactCard();
    displayContactList();

}

function displayContactList() {
    getFirstLetter();
    sortNames();
    console.log(letters,contacts)

}