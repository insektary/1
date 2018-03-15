var PORT = 3000;
var EXPECTED_VALUE = 'EXPECTED_VALUE';

var express = function () {
    var serverIsOn = false;

    return {
        res: null,
        routeTable: {
            get: {},
            use: {}
        },
        index: null,
        listen: function (port) {
            console.log('server is running on ' + port);
            serverIsOn = true;
        },
        getResponse: function (url, method) {
            if (!serverIsOn) {
                console.log('server in not started');
            } else {
                var req = {};

                if (this.routeTable.use[url].every(function (middleware) {
                    var flagOfExecutionNext = false;
                    var next = function () {
                        flagOfExecutionNext = true;
                    };

                    middleware(req, null, next);

                    return flagOfExecutionNext;
                })) {
                    this.routeTable[method.toLowerCase()][url](req, null);
                }
            }
        },
        use: function (url, callback) {
            if (!this.routeTable.use[url]) {
                this.routeTable.use[url] = [];
            }

            this.routeTable.use[url].push(callback);
        },
        get: function (url, callback) {
            this.routeTable.get[url] = callback;
        }
    };
};

var app = express();

app.use('/', function (req, res, next) {
    req.input = EXPECTED_VALUE;
    next();
});

app.use('/', function (req, res, next) {
    console.log(req.input);
    next();
});

app.get('/', function (req) {
    console.log(req.input === EXPECTED_VALUE); // true
});

app.listen(PORT);

app.getResponse('/', 'GET');
