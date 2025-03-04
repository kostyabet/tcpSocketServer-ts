function sendMessage() {
    const data = document.getElementById('message');
    if (data.value.length == 0) {
        setError('Введите сообщение перед отправкой!');
        return;
    }
    resetError();
    sendStringToTheNet(data.value);
    renderItems();
    data.value = '';
}