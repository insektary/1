function createArr(length) {
    var resArr = [];
    for (var i = 0; i < length; i++) {
        resArr[i] = i*i;
    }
    return resArr;
}

console.log(createArr(7));