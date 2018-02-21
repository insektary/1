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

Function.prototype.polyBind = function(context) {
    var args = Array.prototype.slice.call(arguments, 1);
    var fn = this;

    return function() {
        Array.prototype.forEach.call(arguments, function(item) {
            args.push(item);
        });

        return fn.apply(context, args);
    }
};
