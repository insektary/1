var request = require('request');
var url = 'https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=trnsl.1.1.20180220T094426Z.e1f4e967cf0ac2c7.8d56c206871ffd36c05216892008a97b3a312f5a&ui=ru';
var answer = '';

request({
    method: 'GET',
    url: url,
    qs: {
        param: 'edit',
        value: 100
    }
}, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        answer = body;
        console.log(answer);
    }
});