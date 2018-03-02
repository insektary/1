var User = require('./user.js');

var AuthorizedUser = function(name) {
    this.name = name;
};
AuthorizedUser.prototype = Object.create(User.prototype);
AuthorizedUser.prototype.type = 'authorizedUser';

module.exports = AuthorizedUser;