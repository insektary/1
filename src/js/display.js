const background = document.querySelector('.grey-background--hidden');
const output = document.querySelector('.output-form');
const body = document.querySelector('body');
const NETWORK_ERROR = 'Сервис недоступен';
const SERVICE_ERROR = 'Невозможно выполнить перевод';
const MODAL_WINDOW = 'modal-window';
const CLOSE_BUTTON = 'modal-window__close';
const TEXTFIELD = 'modal-window__textfield';
const CROSS_CODE = '&#10060';
const BACKGROUND_VISIBLE = 'grey-background grey-background--visible';
const BACKGROUND_HIDDEN = 'grey-background grey-background--hidden';

const closeModeWindow = () => {
    document.querySelector('.modal-window').remove();
    background.className = BACKGROUND_HIDDEN;

    clearOutput();
};

export const showErrorMessage = () => {
    showModalWindow(NETWORK_ERROR);
};

export const showWarningMessage = () => {
    showModalWindow(SERVICE_ERROR);
};

export const showResult = (text) => {
    output.value = text;
};

export const clearOutput = () => {
    output.value = '';
};

export const showModalWindow = (text) => {
    let modalWindow = document.createElement('div');
    modalWindow.className = MODAL_WINDOW;
    body.appendChild(modalWindow);

    let closeButton = document.createElement('button');
    closeButton.className = CLOSE_BUTTON;
    closeButton.innerHTML = CROSS_CODE;
    closeButton.addEventListener('click', closeModeWindow);
    modalWindow.appendChild(closeButton);

    let textField = document.createElement('div');
    textField.className = TEXTFIELD;
    textField.innerHTML = text;
    modalWindow.appendChild(textField);

    background.className = BACKGROUND_VISIBLE;
};
