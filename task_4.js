//properties for example
var myObj = {
    prop1: 'one',
    prop2: {
        subProp1: 'one+',
        subProp2: 'two+'
    }
};

function updateObj(obj) {
    return Object.assign({}, obj, {method: function() {}});
}

var newObj = updateObj(myObj);
console.log(myObj);
console.log(newObj);
console.log(myObj === newObj);
