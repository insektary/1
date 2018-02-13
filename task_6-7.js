//Функция-обертка для измерения времени выполнения
function banchMark(cb, arg) {
    var time = Date.now();
    cb(arg);
    return Date.now() - time;
}

function checkFor(arr) {
    for (var i = 0; i < 10000; i++) {
        for (var j = 0; j < 10000; j++) {
            arr[j] = true;
        }
    }
}

function checkWhile(arr) {
    var i = 0;
    var j;
    while (i < 10000) {
        j = 0;
        while (j < 10000) {
            arr[j] = true;
            j++;
        }
        i++;
    }
}

function checkForEach(arr) {
    arr.forEach(function() {
       arr.forEach(function(elem, index, array) {
           array[index] = true;
       })
    });
}

var array = new Array(10000).fill(0);

console.log('while: ' + banchMark(checkWhile, array) + 'ms');
console.log('for: ' + banchMark(checkFor, array) + 'ms');
console.log('forEach: ' + banchMark(checkForEach, array)+ 'ms');


