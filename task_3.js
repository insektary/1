const PORT = 3000;
const EXPECTED_VALUE = 'EXPECTED_VALUE';

const express = () => {
    let serverIsOn = false;

    return {
        res: null,
        routeTable: {
            get: {},
            use: {}
        },

        listen(port) {
            console.log(`server is running on ${ port }`);
            serverIsOn = true;
        },

        getResponse(url, method) {
            if (!serverIsOn) {
                console.log('server in not started');
            } else {
                const req = {};

                if (this.routeTable.use[url].every(function (middleware) {
                    let flagOfExecutionNext = false;
                    const next = () => {
                        flagOfExecutionNext = true;
                    };

                    middleware(req, null, next);

                    return flagOfExecutionNext;
                })) {
                    this.routeTable[method.toLowerCase()][url](req, null);
                }
            }
        },

        use(url, callback) {
            if (!this.routeTable.use[url]) {
                this.routeTable.use[url] = [];
            }

            this.routeTable.use[url].push(callback);
        },

        get(url, callback) {
            this.routeTable.get[url] = callback;
        }
    };
};

const app = express();

app.use('/', (req, res, next) => {
    req.input = EXPECTED_VALUE;
    next();
});

app.use('/', (req, res, next) => {
    console.log(req.input);
    next();
});

app.get('/', (req) => {
    console.log(req.input === EXPECTED_VALUE); // true
});

app.listen(PORT);

app.getResponse('/', 'GET');
