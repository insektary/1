function banchMark(cb) {
    var time = Date.now();
    cb();
    return Date.now() - time;
}
//Тестовая функция
function testFunction() {
    var j = 0;
    for (var i = 0; i < 10000000; i++) {
        j += 2;
    }
}

console.log(banchMark(testFunction));