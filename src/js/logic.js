import { showErrorMessage, showResult, showWarningMessage } from "./display";

const textarea = document.querySelector('.input-form__textarea');
const button = document.querySelector('.input-form__button');

const URL = 'https://translate.yandex.net/api/v1.5/tr.json/';
const DETECT_INSTRUCTION = 'detect';
const TRANSLATE_INSTRUCTION = 'translate';
const KEY = '?key=trnsl.1.1.20180220T094426Z.e1f4e967cf0ac2c7.8d56c206871ffd36c05216892008a97b3a312f5a';
const TEXT_PREFIX = '&text=';
const LANG_PREFIX = '&lang=';

const activateButton = () => {
    if (textarea.value.length > 1) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', 'disable');
    }
};

async function translate() {
    let response = await fetch(`${ URL }${ DETECT_INSTRUCTION }${ KEY }${ TEXT_PREFIX }${ encodeURI(textarea.value) }`)
        .catch(showErrorMessage);
    let parsedResponse = await response.json();

    if (parsedResponse.lang === '') {
        return showWarningMessage();
    }

    response = await fetch(`${ URL }${ TRANSLATE_INSTRUCTION }${ KEY }${ TEXT_PREFIX }${ encodeURI(textarea.value) }${ LANG_PREFIX }${ parsedResponse.lang }-ru`)
        .catch(showErrorMessage);
    parsedResponse = await response.json();

    showResult(parsedResponse.text);
    textarea.value = '';
}

textarea.addEventListener('input', activateButton);
button.addEventListener('click', translate);
