class Server {
	constructor(name, login) {
		this.login = login;
		this.name = name;
		this.myClients = [];
		this.blackList = [];
		this.type = 'server';
		this.feedbackMethod = Server.prototype._executeInstruction.bind(this);
		this.CONSTS = {
			ADMIN_RIGHTS: 'admin',
			RESET: 'reset',
			LOG_IN: 'logIn',
			REBASE: 'rebase',
			SHOW_CLIENTS: 'showClients',
			TO_BLACK_LIST: 'toBlackList',
		};
	}

	registerInNetwork(network) {
		const address = network.registerInNetwork(
			this.name,
			this.type,
			this.feedbackMethod
		);

		if (address) {
			this.address = address;
			this.network = network;
		} else {
			console.log('no free addresses');
		}
	}

	logOut() {
		this.network.removeClient(this.address);
	}

	_executeInstruction(requestInfo) {
		const USER_RIGHTS = requestInfo.type;
		const USER_NAME = requestInfo.name;
		const USER_LOGIN = requestInfo.login;
		const WISH_ADDRESS = requestInfo.wishAddress;
		const USER_FOR_BLACK_LIST = requestInfo.userForBlackList;
		const userInBlackList = this.blackList.indexOf(USER_NAME) !== -1;

		if (userInBlackList) {
			return console.log(`${USER_NAME} in a black list of ${this.name}`);
		}

		switch (requestInfo.instruction) {
			case this.CONSTS.RESET: {
				this._reset(USER_RIGHTS);
				break;
			}
			case this.CONSTS.LOG_IN: {
				this._logIn(USER_LOGIN, USER_NAME);
				break;
			}
			case this.CONSTS.REBASE: {
				this._rebase(USER_RIGHTS, WISH_ADDRESS);
				break;
			}
			case this.CONSTS.SHOW_CLIENTS: {
				this._showClients(USER_RIGHTS);
				break;
			}
			case this.CONSTS.TO_BLACK_LIST: {
				this._toBlackList(USER_RIGHTS, USER_FOR_BLACK_LIST);
				break;
			}
			default: {
				console.log('incorrect instruction');
			}
		}
	}

	_rebase(userRights, wishAddress) {
		if (userRights !== this.CONSTS.ADMIN_RIGHTS) {
			return console.log('access denied');
		}

		const address = this.network.changeAddress(this.address, wishAddress);

		if (address) {
			console.log(`successful on address ${address}`);

			this.address = address;
		} else {
			console.log('address in busy');
		}
	}

	_reset(userRights) {
		if (userRights === this.CONSTS.ADMIN_RIGHTS) {
			console.log('server will be rebooted');
		} else {
			console.log('access denied');
		}
	}

	_logIn(login, name) {
		if (this.login === login) {
			this.myClients.push(name);

			console.log(`${name} is registered on ${this.name}`);
		} else {
			console.log('login incorrect');
		}
	}

	_showClients(userRights) {
		if (userRights === this.CONSTS.ADMIN_RIGHTS) {
			this.myClients.forEach(userName => {
				console.log(userName);
			});
		} else {
			console.log('access denied');
		}
	}

	_toBlackList(userRights, name) {
		if (userRights === this.CONSTS.ADMIN_RIGHTS) {
			this.blackList.push(name);

			console.log(`${name} was blocked on ${this.name}`);
		} else {
			console.log('access denied');
		}
	}
}

module.exports = Server;
