Array.prototype.polyForEach = function polyForEach(callback, thisArg) {
    var array = (thisArg) ? thisArg : this;
    var index;
    var item;

    for (var i = 0; i < array.length; i++) {
        item = array[i];
        index = i;
        callback(item, index, array);
    }
};

Array.prototype.polyMap = function(callback, thisArg) {
    var array = (thisArg) ? thisArg : this;
    var result = [];
    var index;
    var item;

    for (var i = 0; i < array.length; i++) {
        item = array[i];
        index = i;
        result.push(callback(item, index, array));
    }

    return result;
};

Array.prototype.polyFilter = function(callback, thisArg) {
    var array = (thisArg) ? thisArg : this;
    var result = [];
    var index;
    var item;

    for (var i = 0; i < array.length; i++) {
        item = array[i];
        index = i;

        if (callback(item, index, array)) {
            result.push(array[i]);
        }
    }

    return result;
};

Array.prototype.polyReduce = function(callback, initialValue) {
    var array = this;
    var startIndex;
    var result;
    var index;
    var item;

    if (initialValue) {
        result = initualValue;
        startIndex = 0;
    } else {
        result = this[0];
        startIndex = 1;
    }

    for (var i = startIndex; i < array.length; i++) {
        item = array[i];
        index = i;
        result = callback(result, item, index, array);
    }

    return result;
};

//Тестовый массив
var testArray = new Array(10000).fill(0);

//Тесты
var banchMark = function(func) {
    var time = Date.now();

    for (var i = 0; i < 10000; i++) {
        testArray[func](function() {
        });
    }

    return Date.now() - time;
};

console.log('forEach: ' + banchMark('forEach') + 'ms');
console.log('polyForEach: ' + banchMark('polyForEach') + 'ms');
console.log('map: ' + banchMark('map') + 'ms');
console.log('polyMap: ' + banchMark('polyMap') + 'ms');
console.log('filter: ' + banchMark('filter') + 'ms');
console.log('polyFilter: ' + banchMark('polyFilter') + 'ms');
console.log('reduce: ' + banchMark('reduce') + 'ms');
console.log('polyReduce: ' + banchMark('polyReduce') + 'ms');
