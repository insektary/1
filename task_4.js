var func = function() {
    var lastTime = 0;

    return function(delay) {
        if ((Date.now() - lastTime) > delay) {
            lastTime = Date.now();

            return 'called';
        } else {
            lastTime = Date.now();

            return 'to early!';
        }
    }
};

var returnCalled = func();

//Тесты
// setInterval(function() {
//     console.log(returnCalled(2000))
// }, 1000);

setInterval(function() {
    console.log(returnCalled(2000))
}, 3000);