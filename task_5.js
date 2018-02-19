var func = function() {
    var lastTime = 0;

    return function() {
        if ((Date.now() - lastTime) > 2000) {
            lastTime = Date.now();

            return 'called';
        } else {
            lastTime = Date.now();

            return;
        }
    }
};

var comeBack = func();

//
setInterval(function() {
    console.log(comeBack())
}, 3000);