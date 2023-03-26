function highlightSelectedNav(id){
    setTimeout(() => {
        document.getElementById(`${id}`).classList.add("selected");  
    }, 10);
}

async function init(id){
    await includeHTML();
    highlightSelectedNav(id)
}