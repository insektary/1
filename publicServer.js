const Server = require('./server.js');

class PublicServer extends Server {
	constructor(name, login) {
		super(name, login);
		this.status = 'public';
	}
}

module.exports = PublicServer;
