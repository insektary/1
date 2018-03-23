import Server from './server.js';

class ProtectedServer extends Server {
	constructor(name, login) {
		super(name, login);
		this.status = 'protected';
	}
}

export default ProtectedServer;
