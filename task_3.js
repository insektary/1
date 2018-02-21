var func = function() {
    var storage = {};

    return function(arg) {
        if (!storage[arg]) {
            storage[arg] = Math.round(Math.random() * (1000 - 5) + 5);
        }

        return storage[arg];
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