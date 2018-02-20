var callbackInside = function() {
    var storage = {};

    var func = function(arg) {
        if (!storage[arg]) {
            storage[arg] = Math.round(Math.random() * (1000 - 5) + 5);
        }

        return storage[arg];
    };

    return func;
};

var callback = callbackInside();

var timerInside = function() {
    var lastTime = 0;
    var DELAY = 500; //ms

    var func = function(arg) {
        var interval = Date.now() - lastTime;
        lastTime = Date.now();

        if (interval > DELAY) {
            return callback(arg) + ' ' + Date();
        }
    };

    return func;
};

var timer = timerInside();
