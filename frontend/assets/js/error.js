let isError = false;
let errorString = 'Hello world';

const error = document.getElementById('error');
const send = document.getElementById('send')
resetStatus();

function setError(info) {
    errorString = info;
    isError = true;
    resetStatus();
}

function resetError() {
    errorString = '';
    isError = false;
    resetStatus();
}

function resetStatus() {
    error.style.display = isError ? '' : 'none';
    error.textContent = isError ? errorString : '';
    send.style.marginTop = isError ? '45px' : '0px';
}