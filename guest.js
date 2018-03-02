var User = require('./user.js');

var Guest = function(name) {
    this.name = name;
};

Guest.prototype = Object.create(User.prototype);
Guest.prototype.type = 'guest';

module.exports = Guest;