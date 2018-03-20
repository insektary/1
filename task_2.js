'use strict';
const request = require('request');
const _ = require('lodash');
const fetch = require('node-fetch');

const baseUrl = 'https://translate.yandex.net/api/v1.5/tr.json/';
const KEY = '?key=trnsl.1.1.20180220T094426Z.e1f4e967cf0ac2c7.8d56c206871ffd36c05216892008a97b3a312f5a';
const language = '&ui=ru';
const method = 'GET';
let instruction = 'getLangs';
let text = 'หนูมัสคแร็ต';

const config = {
    method,
    url: `${ baseUrl }${ instruction }${ KEY }${ language }`
};

// get list of supported languages(callbacks)
request(config, (error, response, body) => {
    if (!error) {
        const answer = JSON.parse(body);

        console.log(`${_.size(answer.langs)} languages`);
    }
});

// detecting language(async function)
instruction = 'detect';

async function detectLanguage() {
    const response = await fetch(`${ baseUrl }${ instruction }${ KEY }&text=${ encodeURI(text) }`);
    const parsedResponse = await response.json();

    console.log(parsedResponse.lang);
}

detectLanguage();

// detecting and translate(callbacks)
text = 'ბომონერი';

config.url = `${ baseUrl }detect${ KEY }&text=${ encodeURI(text) }`;

const callbackTranslate = (error, response, body) => {
    if (!error) {
        console.log(JSON.parse(body).text);
    }
};

const callbackDetect = (error, response, body) => {
    if (!error) {
        config.url = `${ baseUrl }translate${ KEY }&text=${ encodeURI(text) }&lang=${ JSON.parse(body).lang }-ru`;
        request(config, callbackTranslate);
    }
};

request(config, callbackDetect);

// detecting and translate(async function)
async function detectAndTranslate() {
    let response = await fetch(`${ baseUrl }detect${ KEY }&text=${ encodeURI(text) }`);
    let parsedResponse = await response.json();
    response = await fetch(`${ baseUrl }translate${ KEY }&text=${ encodeURI(text) }&lang=${ parsedResponse.lang }-ru`);
    parsedResponse = await response.json();

    console.log(parsedResponse.text);
}

detectAndTranslate();
