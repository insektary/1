const User = require('./user.js');

class Guest extends User {
	constructor(name) {
		super(name);
		this.type = 'guest';
	}
}

module.exports = Guest;
