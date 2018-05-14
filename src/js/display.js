const background = document.querySelector('.grey-background--hidden');
const output = document.querySelector('.output-form');
const body = document.querySelector('body');
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

export const showErrorMessage = (errorText) => {
    showModalWindow(errorText);
};

export const showWarningMessage = () => {
    showModalWindow(SERVICE_ERROR);
};

export const clearOutput = () => {
    output.value = '';
};

export const showModalWindow = (text) => {
    const modalWindow = createErrorMessage({
        tag: 'div',
        className: MODAL_WINDOW
    });
    body.appendChild(modalWindow);

    modalWindow.appendChild(createErrorMessage({
        tag: 'button',
        className: CLOSE_BUTTON,
        content: CROSS_CODE,
        handler: closeModeWindow
    }));
    modalWindow.appendChild(createErrorMessage({
        tag:'div',
        className: TEXTFIELD,
        content: text
    }));

    background.className = BACKGROUND_VISIBLE;
};

const createErrorMessage = ({tag, className, content, handler}) => {
    const element = document.createElement(tag);

    if (content) {
        element.innerHTML = content;
    }

    element.className = className;
    element.addEventListener('click', handler);

    return element;
};
