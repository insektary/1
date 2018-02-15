var createArr = function(length) {
    var resArr = new Arr();

    for (var i = 0; i < length; i++) {
        resArr.push(i * i);
    }

    return resArr;
}

console.log(createArr(6));