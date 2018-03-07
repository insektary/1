var User = require('./user.js');

function Guest(name) {
    User.call(this, name);
    this.type = 'guest';
}

Guest.prototype = Object.create(User.prototype);

module.exports = Guest;