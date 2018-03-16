const request = require('request');
const _ = require('lodash');
const fetch = require('node-fetch');

const baseUrl = 'https://translate.yandex.net/api/v1.5/tr.json/';
const KEY = '?key=trnsl.1.1.20180220T094426Z.e1f4e967cf0ac2c7.8d56c206871ffd36c05216892008a97b3a312f5a';
const language = '&ui=ru';
let instruction = 'getLangs';
let text = 'หนูมัสคแร็ต';

// get list of supported languages(callbacks)
request({
    method: 'GET',
    url: baseUrl + instruction + KEY + language
},
(error, response, body) => {
    if (!error) {
        const answer = JSON.parse(body);

        console.log(`${_.size(answer.langs)} languages`);
    }
});

// detecting language(promises)
instruction = 'detect';

fetch(`${baseUrl}${instruction}${KEY}&text=${encodeURI(text)}`)
    .then(response => response.json())
    .then(data => console.log(data.lang));

// detecting and translate(callbacks)
text = 'ბომონერი';

const config = {
    method: 'GET',
    url: ''
};

config.url = `${baseUrl}detect${KEY}&text=${encodeURI(text)}`;

const callbackTranslate = function (error, response, body) {
    if (!error) {
        console.log(JSON.parse(body).text);
    }
};

const callbackDetect = function (error, response, body) {
    if (!error) {
        config.url = `${baseUrl}translate${KEY}&text=${encodeURI(text)}&lang=${JSON.parse(body).lang}-ru`;
        request(config, callbackTranslate);
    }
};

request(config, callbackDetect);

// detecting and translate(promises)
fetch(`${baseUrl}detect${KEY}&text=${encodeURI(text)}`)
    .then(response => response.json())
    .then(data => fetch(`${baseUrl}translate${KEY}&text=${encodeURI(text)}&lang=${data.lang}-ru`))
    .then(response => response.json())
    .then(data => console.log(data.text));
