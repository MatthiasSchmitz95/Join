async function onloadLegal() {
   await init('legalNotice');
   await loadTasksFromBackend();
    await loadUserAccountsFromBackend();
}