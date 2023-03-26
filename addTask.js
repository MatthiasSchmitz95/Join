let team = ["Name1", "Name2", "Name3"];

// modify calendar so you can only select current date or date in the future
let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;
document.getElementById("date").min = today;

let date = document.getElementById("date");

//category elements
let categories = ["New Category", "Sales", "Marketing"];
let dropdownContainer = document.getElementById("dropdownContainer");
let categoryInput = document.getElementById("selectedCategory");
let categoryContainerBorder = document.getElementById("selectedCategoryContainer");

let colorDots = document.getElementsByClassName("circle"); //Elemente by className
let assignedColors = [colorDots[0], colorDots[1], colorDots[2]];
//let colorContainer = document.getElementById("colorContainer");

categoryInput.addEventListener("click", function () {
  dropdownContainer.style.display = "block";
  categoryContainerBorder.style.borderColor = "black";
  categoryContainerBorder.style.borderBottom = "none";
  categoryContainerBorder.style.borderRadius = "10px 10px 0 0";
  dropdownContainer.innerHTML = "";
  for (let i = 0; i < categories.length; i++) {
    let color = assignedColors[i];
    dropdownContainer.innerHTML += /*html*/`
    <div class="dropdownChoiceCategory">
      <div class="categoryText">${categories[i]}</div>
      ${color.outerHTML}
    </div>`;
  }
});



//assignTo elemetns
let assignedToInput = document.getElementById("assignedTo");
let contactsDropdown = document.getElementById("ContactsDropdownContainer");
let assignedToContainerBorder = document.getElementById("assignToContainer");

assignedToInput.addEventListener("click", function () {
  contactsDropdown.style.display = "block";
  assignedToContainerBorder.style.borderColor = "black";
  assignedToContainerBorder.style.borderBottom = "none";
  assignedToContainerBorder.style.borderRadius = "10px 10px 0 0";

  contactsDropdown.innerHTML = "";
  for (let i = 0; i < team.length; i++) {
    let contact = team[i];
    contactsDropdown.innerHTML += /*html*/`
    <div class="dropdownChoiceContact">
        <div class="assignText">${contact}</div>
        <input type="checkbox" name="checkbox" />
    </div>
    `;
  }
});



function getValueForTasks() {
  selectElement = document.querySelector('#selectedCategory');
  selectedCategory = selectElement.options[selectElement.selectedIndex].value;

  selectElement = document.querySelector('#selectedContact');
  selectedContact = selectElement.options[selectElement.selectedIndex].value;
  //document.querySelector('.output').textContent = output;
  alert("Die ausgewählte Category ist(" + selectedCategory +
    ") und der asugewählte Contact ist(" + selectedContact + ")"
    + `Datum ist (${date.value})`);
}