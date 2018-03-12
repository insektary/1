var PORT = 3000;
var EXPECTED_VALUE = 'EXPECTED_VALUE';

var express = function () {
    var server = false;

    return {
        res: null,
        routeTable: {
            get: {},
            use: {}
        },
        index: null,
        listen: function(port) {
            console.log('server is running on ' + port);
            server = true;
        },
        getResponse: function(url, method) {
            if (!server) {
                console.log('server in not started');
            } else {
                this.req = {};
                this.counter1 = 0;
                this.counter2 = 0;
                this.fn = function() {
                    this.counter1++;
                };
                this.next = this.fn.bind(this);

                this.routeTable.use[url].forEach(function(middleware) {
                    if (this.counter1 === this.counter2) {
                        middleware(this.req, null, this.next);
                        this.counter2++;
                    }
                }, this);

                if (this.counter1 === this.counter2) {
                    this.routeTable[method.toLowerCase()][url](this.req, null);
                }
            }
        },
        use: function(url, callback) {
            if (!this.routeTable.use[url]) {
                this.routeTable.use[url] = [];
            }

            this.routeTable.use[url].push(callback);
        },
        get: function(url, callback) {
            this.routeTable.get[url] = callback;
        }
    };
};




var app = express();

app.use('/', function(req, res, next) {
    req.input = EXPECTED_VALUE;
    next();
});

app.use('/', function(req, res, next) {
    console.log(req.input);
    next();
});

app.get('/', function(req) {
    console.log(req.input === EXPECTED_VALUE); // true
});

app.listen(PORT);

app.getResponse('/', 'GET');
