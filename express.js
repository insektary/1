var PORT = 3000;
var EXPECTED_VALUE = 'EXPECTED_VALUE';

var express = function() {
    var server = 'off';

    return {
        listen: function(port) {
            server = 'on';
        },
        getResponse: function(url, method) {
            if (server === 'off') {
                return;
            }

        },
        use: function(url, callback) {},
        get: function(url, callback) {}
    }
};




var app = express();

app.use('/', function(req, res, next) {
    req.input = EXPECTED_VALUE;
    next()
});

app.use('/', function(req, res, next) {
    console.log(req.input);
    next()
});

app.get('/', function(req, res) {
    console.log(req.input === EXPECTED_VALUE) // true
});

app.listen(PORT);

app.getResponse('/', 'GET');

