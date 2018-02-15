//Функция из Task_1 генерирующая тестовый массив
var createArr = function createArr(length) {
    var resArr = [];

    for (var i = 0; i < length; i++) {
        resArr.push(i * i);
    }

    return resArr;
};

var createOriginalArr = function createOriginalArr(arr) {
    var resArr = [];
    var sqr = function sqr() {
        if (arr.length) {
            resArr.push(Math.sqrt(arr.shift()));
            return sqr();
        }
    };

    sqr();

    return resArr;
};


//var createOriginalArr = function createOriginalArr(arr) {
//     if (arr.length) {
//         return createOriginalArr(arr.slice(0, arr.length - 1)).concat(Math.sqrt(arr.pop()));
//     } else return [];
// }

console.log(createArr(5));
console.log(createOriginalArr(createArr(5)));