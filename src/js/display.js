const title = document.querySelector('.title');
const output = document.querySelector('.output-form');

export const showErrorMessage = () => {
    title.innerHTML = 'Сервис недоступен';
};

export const showWarningMessage = () => {
    title.innerHTML = 'Невозможно выполнить перевод';
};

export const showResult = (text) => {
    output.value = text;
};
