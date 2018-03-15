var User = require('./user.js');

var AuthorizedUser = function (name) {
    var AUTHORIZED_USER = 'authorizedUser';

    User.call(this, name);
    this.type = AUTHORIZED_USER;
};

AuthorizedUser.prototype = Object.create(User.prototype);

module.exports = AuthorizedUser;
