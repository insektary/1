Array.prototype.polyForEach = function(callback, thisArg) {
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

Function.prototype.polyBind = function(context) {
    var args = [].slice.call(arguments, 1);
    var That = this;

    return function() {
        return That.apply(context, args);
    }
};
