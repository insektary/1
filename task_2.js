//Функция из Task_1 генерирующая тестовый массив
function createArr(length) {
    var resArr = new Array();

    for (var i = 0; i < length; i++) {
        resArr.push(i * i);
    }

    return resArr;
}

function createOriginalArr(arr) {

    if (arr.length) {
        return (createOriginalArr(arr.slice(0, arr.length - 1))).concat(Math.sqrt(arr[arr.length - 1]));
    } else return [];
}

console.log(createArr(5));
console.log(createOriginalArr(createArr(5)));