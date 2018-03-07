var AuthorizedUser = require('./authorizedUser.js');

var Admin = function(name) {
    AuthorizedUser.call(this, name);
    this.type = 'admin';
};

Admin.prototype = Object.create(AuthorizedUser.prototype);

module.exports = Admin;