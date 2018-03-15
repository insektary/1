var User = require('./user.js');

function Guest(name) {
    var GUEST = 'guest';

    User.call(this, name);
    this.type = GUEST;
}

Guest.prototype = Object.create(User.prototype);

module.exports = Guest;
