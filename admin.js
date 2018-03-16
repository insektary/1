var AuthorizedUser = require('./authorizedUser.js');

var Admin = function (name) {
    var ADMIN = 'admin';

    AuthorizedUser.call(this, name);
    this.type = ADMIN;
};

Admin.prototype = Object.create(AuthorizedUser.prototype);

module.exports = Admin;
