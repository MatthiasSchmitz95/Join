async function init(id){
    await includeHTML();
    highlightSelectedNav(id)
}


function highlightSelectedNav(id){
    setTimeout(() => {
        document.getElementById(`${id}`).classList.add("selected");  
    }, 10);
}