var func = function() {
    var storage = {};

    return function(arg) {
        if (arg in storage) return storage[arg];

        else var res = Math.round(Math.random() * (1000 - 5) + 5);
        storage[arg] = res;

        return res;
    }
};

var returnRandomNumber = func();

console.log(returnRandomNumber(5));
console.log(returnRandomNumber(4));
console.log(returnRandomNumber(9));
console.log(returnRandomNumber(7));
console.log(returnRandomNumber(2));
console.log(returnRandomNumber(5));
console.log(returnRandomNumber(5));