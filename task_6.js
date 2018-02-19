var func = function() {
    var lastTime = 0;
    var storage = {};

    return function(arg) {
        var interval = Date.now() - lastTime;
        lastTime = Date.now();

        if (interval > 500) {
            if (arg in storage) return storage[arg] + ' ' + Date();
            else {
                var res = Math.round(Math.random() * (1000 - 5) + 5);
                storage[arg] = res;

                return res + ' ' + Date();
            }
        }
    }
};

var comeBack = func();

//Тесты
setInterval(function() {
    console.log(comeBack())
}, 1000);
