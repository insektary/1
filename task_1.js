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
    let startIndex = 1;
    let [result] = this;

    if (initialValue) {
        result = initialValue;
        startIndex = 0;
    }

    for (let i = startIndex; i < this.length; i++) {
        result = callback(result, this[i], i, this);
    }

    return result;
};

Function.prototype.polyBind = function (context, ...args) {
    const fn = this;

    return (...restArgs) => {
        args.push(...restArgs);

        return fn.apply(context, args);
    }
};

const banchMark = (func) => {
    const time = Date.now();

    for (let i = 0; i < 10000; i++) {
        func.call(testArray, () => {});
    }

    return Date.now() - time;
};

const testArray = new Array(10000).fill(0);

console.log(`some: ${banchMark(Array.prototype.some)} ms`);
console.log(`polySome: ${banchMark(Array.prototype.polySome)} ms`);
console.log(`every: ${banchMark(Array.prototype.every)} ms`);
console.log(`polyEvery: ${banchMark(Array.prototype.polyEvery)} ms`);
console.log(`forEach: ${banchMark(Array.prototype.forEach)} ms`);
console.log(`polyForEach: ${banchMark(Array.prototype.polyForEach)} ms`);
console.log(`map: ${banchMark(Array.prototype.map)} ms`);
console.log(`polyMap: ${banchMark(Array.prototype.polyMap)} ms`);
console.log(`filter: ${banchMark(Array.prototype.filter)} ms`);
console.log(`polyFilter: ${banchMark(Array.prototype.polyFilter)} ms`);
console.log(`reduce: ${banchMark(Array.prototype.reduce)} ms`);
console.log(`polyReduce: ${banchMark(Array.prototype.polyReduce)} ms`);
