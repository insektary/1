Array.prototype.polySome = function (callback, context) {
    for (let i = 0; i < this.length; i++) {
        if (callback.call(context, this[i], i, this)) {
            return true;
        }
    }

    return false;
};

Array.prototype.polyEvery = function (callback, context) {
    for (let i = 0; i < this.length; i++) {
        if (!callback.call(context, this[i], i, this)) {
            return false;
        }
    }

    return true;
};


Array.prototype.polyForEach = function (callback, context) {
    for (let i = 0; i < this.length; i++) {
        callback.call(context, this[i], i, this);
    }
};

Array.prototype.polyMap = function (callback, context) {
    const result = [];

    for (let i = 0; i < this.length; i++) {
        result.push(callback.call(context, this[i], i, this));
    }

    return result;
};

Array.prototype.polyFilter = function (callback, context) {
    const result = [];

    for (let i = 0; i < this.length; i++) {
        if (callback.call(context, this[i], i, this)) {
            result.push(this[i]);
        }
    }

    return result;
};

Array.prototype.polyReduce = function (callback, initialValue) {
    let startIndex;
    let result;

    if (initialValue) {
        result = initialValue;
        startIndex = 0;
    } else {
        result = this[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < this.length; i++) {
        result = callback(result, this[i], i, this);
    }

    return result;
};

Function.prototype.polyBind = function (context, ...rest) {
    const fn = this;

    return (...insideRest) => {
        insideRest.forEach((arg) => {
            rest.push(arg);
        });

        return fn.apply(context, rest);
    }
};

const banchMark = (func, arg) => {
    const time = Date.now();

    for (let i = 0; i < 10000; i++) {
        func.call(arg, () => {});
    }

    return Date.now() - time;
};

const testArray = new Array(10000).fill(0);

console.log(`some: ${banchMark(Array.prototype.some, testArray)} ms`);
console.log(`polySome: ${banchMark(Array.prototype.polySome, testArray)} ms`);
console.log(`every: ${banchMark(Array.prototype.every, testArray)} ms`);
console.log(`polyEvery: ${banchMark(Array.prototype.polyEvery, testArray)} ms`);
console.log(`forEach: ${banchMark(Array.prototype.forEach, testArray)} ms`);
console.log(`polyForEach: ${banchMark(Array.prototype.polyForEach, testArray)} ms`);
console.log(`map: ${banchMark(Array.prototype.map, testArray)} ms`);
console.log(`polyMap: ${banchMark(Array.prototype.polyMap, testArray)} ms`);
console.log(`filter: ${banchMark(Array.prototype.filter, testArray)} ms`);
console.log(`polyFilter: ${banchMark(Array.prototype.polyFilter, testArray)} ms`);
console.log(`reduce: ${banchMark(Array.prototype.reduce, testArray)} ms`);
console.log(`polyReduce: ${banchMark(Array.prototype.polyReduce, testArray)} ms`);
