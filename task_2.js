//Функция из Task_1 генерирующая тестовый массив
var createArr = function createArr(length) {
    var resArr = [];

    for (var i = 0; i < length; i++) {
        resArr.push(i * i);
    }

    return resArr;
};

var createOriginalArr = function createOriginalArr(arr) {
    function shouldHaveCorrectName(arr, result) {
        result.push(Math.sqrt(arr.shift()));

        if (arr.length) {
            return shouldHaveCorrectName(arr, result);
        }

        return result;
    }

    return shouldHaveCorrectName(arr, []);
};

console.log(createArr(5));
console.log(createOriginalArr(createArr(5)));