const User = require('./user.js');

class AuthorizedUser extends User {
	constructor(name) {
		super(name);
		this.type = 'authorizedUser';
	}
}

module.exports = AuthorizedUser;
