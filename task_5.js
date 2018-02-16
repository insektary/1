var banchMark = function(cb) {
    var time = Date.now();

    cb();

    return Date.now() - time;
}

//Тестовая функция
var testFunction = function() {
    var j = 0;

    for (var i = 0; i < 10000000; i++) {
        j += 2;
    }
}

console.log(banchMark(testFunction));