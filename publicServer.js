import Server from './server.js';

class PublicServer extends Server {
	constructor(name, login) {
		super(name, login);
		this.status = 'public';
	}
}

export default PublicServer;
