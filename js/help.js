async function onloadHelp() {
    await init('help');
    await loadTasksFromBackend();
     await loadUserAccountsFromBackend();
 }