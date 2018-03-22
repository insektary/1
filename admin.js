const AuthorizedUser = require('./authorizedUser.js');

class Admin extends AuthorizedUser {
	constructor(name) {
		super(name);
		this.type = 'admin';
	}
}

module.exports = Admin;
