import { showErrorMessage, showResult, showWarningMessage, showModalWindow } from "./display";

const textarea = document.querySelector('.input-form__textarea');
const button = document.querySelector('.input-form__button');
const languagesList = document.querySelector('.input-form__language');

const URL = 'https://translate.yandex.net/api/v1.5/tr.json/';
const DETECT_INSTRUCTION = 'detect';
const TRANSLATE_INSTRUCTION = 'translate';
const GETLANGS_INSTRUCTION = 'getLangs';
const KEY = '?key=trnsl.1.1.20180220T094426Z.e1f4e967cf0ac2c7.8d56c206871ffd36c05216892008a97b3a312f5a';
const TEXT_PREFIX = '&text=';
const LANG_PREFIX = '&lang=';
const NETWORK_ERROR = 'Failed to fetch';
const NETWORK_ERROR_MESSAGE = 'Нет соединения';
const UNKNOWN_MESSAGE = 'Неизвестная ошибка';

let targetLanguage;

const refreshButton = () => {
    if (textarea.value.length > 1) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', 'disable');
    }
};

const buildLanguagesList = ({ langs }) => {
    Object.entries(langs).forEach((language) => {
        const option = document.createElement('option');

        [option.value, option.innerHTML] = language;
        languagesList.appendChild(option);
    });

    changeLanguage();
};

const changeLanguage = () => {
    targetLanguage = `-${ languagesList.value }`;
};

async function getLanguages() {
    const response = await fetch(`${ URL }${ GETLANGS_INSTRUCTION }${ KEY }&ui=ru`)
        .catch(showErrorMessage);
    let parsedResponse = await response.json();

    buildLanguagesList(parsedResponse);
}

async function translate() {
    try {
        let response = await fetch(`${ URL }${ DETECT_INSTRUCTION }${ KEY }
            ${ TEXT_PREFIX }${ encodeURI(textarea.value) }`);
        let parsedResponse = await response.json();

        if (!parsedResponse.lang) {
            return showWarningMessage();
        }

        response = await fetch(`${ URL }${ TRANSLATE_INSTRUCTION }${ KEY }
            ${ TEXT_PREFIX }${ encodeURI(textarea.value) }${ LANG_PREFIX }${ parsedResponse.lang }${ targetLanguage }`);
        parsedResponse = await response.json();

        textarea.value = '';

        showModalWindow(parsedResponse.text);
        refreshButton();
    } catch(error) {
        if (error.message === NETWORK_ERROR) {
            showErrorMessage(NETWORK_ERROR_MESSAGE);
        } else {
            showErrorMessage(UNKNOWN_MESSAGE);
        }
    }
}

textarea.addEventListener('input', refreshButton);
button.addEventListener('click', translate);
languagesList.addEventListener('change', changeLanguage);

getLanguages();
