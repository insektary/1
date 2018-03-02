var AuthorizedUser = require('./authorizedUser.js');

var Admin = function(name) {
    this.name = name;
};

Admin.prototype = Object.create(AuthorizedUser.prototype);
Admin.prototype.type = 'admin';

module.exports = Admin;