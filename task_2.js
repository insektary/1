//Функция из Task_1 генерирующая тестовыый массив
function createArr(length) {
    var resArr = [];
    for (var i = 0; i < length; i++) {
        resArr[i] = i*i;
    }
    return resArr;
}

function createOriginalArr(arr) {
    var resArr = [];
    function sqr() {
        if (arr.length) {
            resArr.push(Math.sqrt(arr.shift()));
            sqr();
        }
    }
    sqr();
    return resArr;
}
console.log(createArr(5));
console.log(createOriginalArr(createArr(5)));