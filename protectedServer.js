const Server = require('./server.js');

class ProtectedServer extends Server {
	constructor(name, login) {
		super(name, login);
		this.status = 'protected';
	}
}

module.exports = ProtectedServer;
