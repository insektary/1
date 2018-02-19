var func = function() {
    var lastTime = 0;
    var storage = {};

    return function(arg) {
        var interval = Date.now() - lastTime;
        lastTime = Date.now();

        if (interval > 2000) {
            if (arg in storage) return storage[arg];
            else {
                var res = Math.round(Math.random() * (1000 - 5) + 5);
                storage[arg] = res;

                return res;
            }
        }
    }
};

var comeBack = func();

//Тесты
setInterval(function() {
    console.log(comeBack())
}, 3000);
