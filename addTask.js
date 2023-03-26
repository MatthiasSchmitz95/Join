// modify calendar so you can only select current date or date in the future
let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;
document.getElementById("date").min = today;

let date = document.getElementById("date");


function getValueForTasks() {
  selectElement = document.querySelector('#selectedCategory');
  selectedCategory = selectElement.options[selectElement.selectedIndex].value;

  selectElement = document.querySelector('#selectedContact');
  selectedContact = selectElement.options[selectElement.selectedIndex].value;
  //document.querySelector('.output').textContent = output;
  alert("Die ausgewählte Category ist(" + selectedCategory +
    ") und der asugewählte Contact ist(" + selectedContact + ")"
    + `Datum ist (${date.value})` );
}