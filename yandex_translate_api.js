var request = require('request');
var _ = require('lodash');
var fetch = require('node-fetch');

var baseUrl = 'https://translate.yandex.net/api/v1.5/tr.json/';
var instruction = 'getLangs';
var KEY = '?key=trnsl.1.1.20180220T094426Z.e1f4e967cf0ac2c7.8d56c206871ffd36c05216892008a97b3a312f5a';
var language = '&ui=ru';
var text = 'หนูมัสคแร็ต';

//get list of supported languages(callbacks)
request({
        method: 'GET',
        url: baseUrl + instruction + KEY + language
    },
    function(error, response, body) {
        var answer;
        if (!error) {
            answer = JSON.parse(body);

            console.log(_.size(answer.langs) + ' languages');
        }
    });

//detecting language(promises)
instruction = 'detect';

fetch(baseUrl + instruction + KEY + '&text=' + encodeURI(text))
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data.lang);
});

//detecting and translate(callbacks)
text = 'ბომონერი';

var config = {
    method: 'GET',
    url: ''
};

config.url = baseUrl + 'detect' + KEY + '&text=' + encodeURI(text);

var callbackDetect = function(error, response, body) {
    if (!error) {
        config.url = baseUrl + 'translate' + KEY + '&text=' + encodeURI(text) + '&lang=' + JSON.parse(body).lang + '-ru';
        request(config, callbackTranslate);
    }
};

var callbackTranslate = function(error, response, body) {
    if (!error) {
        console.log(JSON.parse(body).text);
    }
};

request(config, callbackDetect);

//detecting and translate(promises)
fetch(baseUrl + 'detect' + KEY + '&text=' + encodeURI(text))
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        return fetch(baseUrl + 'translate' + KEY + '&text=' + encodeURI(text) + '&lang=' + data.lang + '-ru')
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data.text)
    });
