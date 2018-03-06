var User = require('./user.js');

function Guest(name) {
    this.name = name;
};

Guest.prototype = Object.create(User.prototype);
Guest.prototype.type = 'guest';

module.exports = Guest;