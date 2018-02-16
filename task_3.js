var returnRandomNumber = function(arg) {
    if (arg in returnRandomNumber) return returnRandomNumber[arg];

    else {
        var res = Math.round(Math.random() * (1000 - 5) + 5);
        returnRandomNumber[arg] = res;

        return res;
    }
};

console.log(returnRandomNumber(5));
console.log(returnRandomNumber(4));
console.log(returnRandomNumber(9));
console.log(returnRandomNumber(7));
console.log(returnRandomNumber(2));
console.log(returnRandomNumber(5));
console.log(returnRandomNumber(5));