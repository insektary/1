const PORT = 3000;
const EXPECTED_VALUE = 'EXPECTED_VALUE';

const express = () => {
    let serverIsOn = false;

    const res = null;
    const routeTable = {
        get: {},
        use: {}
    };

    const listen = (port) => {
        console.log(`server is running on ${ port }`);
        serverIsOn = true;
    };

    const getResponse = (url, method) => {
        if (!serverIsOn) {
            console.log('server in not started');
        } else {
            const req = {};

            if (routeTable.use[url].every(function (middleware) {
                let isNextCalled = false;
                const next = () => {
                    isNextCalled = true;
                };

                middleware(req, null, next);

                return isNextCalled;
            })) {
                routeTable[method.toLowerCase()][url](req, null);
            }
        }
    };

    const use = (url, callback) => {
        if (routeTable.use[url]) {
            routeTable.use[url].push(callback);
        } else {
            routeTable.use[url] = [callback];
        }
    };

    const get = (url, callback) => {
        routeTable.get[url] = callback;
    };

    return {
        listen,
        getResponse,
        use,
        get
    }
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
