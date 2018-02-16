var arrayOfProps = [
    'one',
    'two',
    'three',
    'four'
];

function createObj(props) {
    return props.reduce(function(result, item, index, array) {
        result[item] = true;

        return result;
    }, {});
}

console.log(arrayOfProps);
console.log(createObj(arrayOfProps));