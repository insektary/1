var func = function() {
    var lastTime = 0;

    return function(delay) {
        var interval = Date.now() - lastTime;
        lastTime = Date.now();

        if (interval > delay) return 'called';
    }
};

var returnCalled = func();

//Тесты
// setInterval(function() {
//     console.log(returnCalled(2000))
// }, 1000);

setInterval(function() {
    console.log(returnCalled(2000));
}, 3000);