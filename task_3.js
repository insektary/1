var arrayOfProps = ['one',
    'two',
    'three',
    'four'
];

function createObj(props) {
    var obj = props.reduce(function(result, item, index, array) {
        return Object.assign(result, {[item]: true});
    }, {});
    return obj;
}
console.log(arrayOfProps);
console.log(createObj(arrayOfProps));