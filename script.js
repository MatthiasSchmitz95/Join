function highlightSelectedNav(id){
    setTimeout(() => {
        document.getElementById(`${id}`).classList.add("selected");  
    }, 10);
    console.log(typeof id);
    // document.getElementById(`summary`).classList.remove("selected");
    // document.getElementById(`board`).classList.remove("selected");
    // document.getElementById(`addTask`).classList.remove("selected");
    // document.getElementById(`contacts`).classList.remove("selected");
    // document.getElementById(`${id}`).classList.add("selected");
}