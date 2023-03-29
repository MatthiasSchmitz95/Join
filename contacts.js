let contactName;
let email;
let phone;
let contact_nr = 0;
let contacts = [

];

function showCard() {
    document.getElementById('contact-card').classList = 'add-contact-card';

}

function closeContactCard() {
    document.getElementById('contact-card').classList = 'hidden';

}

function getInputValues(){
    let contact_email = document.getElementById('contact-email');
    let contact_phone = document.getElementById('contact-phone');
    let contact_name = document.getElementById('contact-name');
    contactName = contact_name.value;
    email = contact_email.value;
    phone = contact_phone.value;
}

function updateContactNr(){
    contact_nr++;
    console.log(contact_nr);
}

function CreateNewContact() {
    getInputValues();
    let contact_obj = { 'name': contactName, 'email': email, 'phone': phone };
    contacts.push(contact_obj);
    console.log(contacts);
    updateContactNr();

}