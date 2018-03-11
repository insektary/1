var PORT = 3000;
var EXPECTED_VALUE = 'EXPECTED_VALUE';

var express = function() {
    var server = 'off';

    return {
        routeTable: {
            get: {},
            use: {}
        },
        listen: function(port) {
            server = 'on';
        },
        caller: function(array, index) {
            if (!array[index + 1]) return;
            index++;
            array[index]('', '', array[index + 1]);
        },
        getResponse: function(url, method) {
            if (server === 'off') {
                return;
            } else if (url in this.routeTable.use) {
                this.caller(this.routeTable.use[url], -1);

                this.routeTable[method.toLowerCase()][url]();
            }
        },
        use: function(url, callback) {
            if (!(url in this.routeTable.use)) {
                this.routeTable.use[url] = [];
            }

            this.routeTable.use[url].push(callback);
        },
        get: function(url, callback) {
            this.routeTable.get[url] = callback;
        }
    }
};




var app = express();

app.use('/', function(req, res, next) {
    console.log('prev1');
    //req.input = EXPECTED_VALUE;
    next()
});

app.use('/', function(req, res, next) {
    console.log('prev2');
    //console.log(req.input);
    next()
});

app.get('/', function(req, res) {
    console.log('get');
    //console.log(req.input === EXPECTED_VALUE) // true
});

app.listen(PORT);

app.getResponse('/', 'GET');


// var express = require('express');
// var app = express();
//
// app.use('/', function(req, res, next) {
//     console.log(next);
//     next();
// });
//
// app.get('/', function(req, res) {
//     console.log('get come');
//     res.send('11');
// });
//
// app.listen(3000, function() {
//     console.log('server is running');
// });
//
// console.log('end');