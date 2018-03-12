var PORT = 3000;
var EXPECTED_VALUE = 'EXPECTED_VALUE';

var express = function() {
    var server = 'off';

    return {
        req: {},
        res: {},
        currentRequestMethod: '',
        routeTable: {
            get: {},
            use: {}
        },
        index: null,
        listen: function(port) {
            server = 'on';
        },
        getResponse: function(url, method) {
            if (server === 'off') {
                console.log('server in not started');
            } else if (url in this.routeTable.use) {
                this.currentRequestMethod = method;
                this.index = 0;

                this.routeTable.use[url][0]();
            }
        },
        use: function(url, callback) {
            var obj = this;

            if (!(url in this.routeTable.use)) {
                this.routeTable.use[url] = [];
            }

            this.routeTable.use[url].push(function() {
                obj.index++;

                if (obj.routeTable.use[url][obj.index]) {
                    callback(obj.req, obj.res, obj.routeTable.use[url][obj.index]);
                } else {
                    callback(obj.req, obj.res, obj.routeTable[obj.currentRequestMethod.toLowerCase()][url]);
                }
            });
        },
        get: function(url, callback) {
            this.routeTable.get[url] = callback.bind(this, this.req, this.res);
        }
    }
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

app.get('/', function(req, res) {
    console.log(req.input === EXPECTED_VALUE) // true
});

app.listen(PORT);

app.getResponse('/', 'GET');
