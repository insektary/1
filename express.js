var PORT = 3000;
var EXPECTED_VALUE = 'EXPECTED_VALUE';

var express = function () {
    var server = false;

    return {
        req: {},
        res: null,
        currentRequestMethod: '',
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
            var METHOD = method.toLowerCase();

            if (!server) {
                console.log('server in not started');
            } else if (this.routeTable.use[url]) {
                this.currentRequestMethod = method;
                this.index = 0;

                this.routeTable.use[url][0]();
            } else {
                this.routeTable[METHOD][url]();
            }
        },
        use: function(url, callback) {
            var pushedFunction = function() {
                var pathToMethod = this.routeTable.use[url][this.index];
                var METHOD = this.currentRequestMethod.toLowerCase();
                this.index++;

                if (pathToMethod) {
                    callback(this.req, this.res, pathToMethod);
                } else {
                    callback(this.req, this.res, this.routeTable[METHOD][url]);
                }
            };

            var bindFunction = pushedFunction.bind(this);

            if (!this.routeTable.use[url]) {
                this.routeTable.use[url] = [];
            }

            this.routeTable.use[url].push(bindFunction);
        },
        get: function(url, callback) {
            this.routeTable.get[url] = callback.bind(this, this.req, this.res);
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
