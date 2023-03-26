function highlightSelectedNav(id){
    setTimeout(() => {
        document.getElementById(`${id}`).classList.add("selected");  
    }, 10);
}