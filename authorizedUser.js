var User = require('./user.js');

var AuthorizedUser = function (name) {
    User.call(this, name);
    this.type = 'authorizedUser';
};

AuthorizedUser.prototype = Object.create(User.prototype);

module.exports = AuthorizedUser;
