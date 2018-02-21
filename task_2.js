Array.prototype.polyForEach = function(callback, context) {
    for (var i = 0; i < this.length; i++) {
        callback.call(context, this[i], i, this);
    }
};

Array.prototype.polyMap = function(callback, context) {
    var result = [];

    for (var i = 0; i < this.length; i++) {
        result.push(callback.call(context, this[i], i, this));
    }

    return result;
};

Array.prototype.polyFilter = function(callback, context) {
    var result = [];

    for (var i = 0; i < this.length; i++) {

        if (callback.call(context, this[i], i, this)) {
            result.push(this[i]);
        }
    }

    return result;
};

Array.prototype.polyReduce = function(callback, initialValue) {
    var startIndex;
    var result;

    if (initialValue) {
        result = initialValue;
        startIndex = 0;
    } else {
        result = this[0];
        startIndex = 1;
    }

    for (var i = startIndex; i < this.length; i++) {
        result = callback(result, this[i], i, this);
    }

    return result;
};

//Тестовый массив
var testArray = new Array(10000).fill(0);

//Тесты
var banchMark = function(func, arg) {
    var time = Date.now();

    for (var i = 0; i < 10000; i++) {
        func.call(arg, function(item) {
        });
    }

    return Date.now() - time;
};

console.log('forEach: ' + banchMark(Array.prototype.forEach, testArray) + 'ms');
console.log('polyForEach: ' + banchMark(Array.prototype.polyForEach, testArray) + 'ms');
console.log('map: ' + banchMark(Array.prototype.map, testArray) + 'ms');
console.log('polyMap: ' + banchMark(Array.prototype.polyMap, testArray) + 'ms');
console.log('filter: ' + banchMark(Array.prototype.filter, testArray) + 'ms');
console.log('polyFilter: ' + banchMark(Array.prototype.polyFilter, testArray) + 'ms');
console.log('reduce: ' + banchMark(Array.prototype.reduce, testArray) + 'ms');
console.log('polyReduce: ' + banchMark(Array.prototype.polyReduce, testArray) + 'ms');
