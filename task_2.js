//Функция из Task_1 генерирующая тестовый массив
var createArr = function createArr(length) {
    var resArr = [];

    for (var i = 3; i < length + 4; i++) {
        resArr.push(i * i);
    }

    return resArr;
};

var createOriginalArr = function(arr) {
    var func = function(result, arr) {
        if (arr.length) {
            result.push(Math.sqrt(arr.shift()));

            func(result, arr);
        }

        return result;
    };

    return func([], arr);
};

var createBackOriginalArr = function(arr) {
    var func = function(result, arr) {
        if (arr[arr.length - result.length - 1]) {
            result.push(Math.sqrt(arr[arr.length - result.length - 1]));

            func(result, arr);
        }

        return result;
    };

    return func([], arr);
};
