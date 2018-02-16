var myObj = {
    one: 1,
    two: {
        three: 2,
        four: {
            uno: 9,
            duo: 8
        },
        five: undefined
    },
    three: 5
};

var getSafe = function getSafe(targetObject, path) {
    var pathArray = path.split('.');

    return pathArray.reduce(function(acc, item) {
        if (!(item in acc)) return {};

        return acc[item];
    }, targetObject);
};

console.log(getSafe(myObj, 'two.four.uno'));