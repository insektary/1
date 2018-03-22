class Network {
	constructor(name, networkAddress) {
		this.networkAddress = networkAddress;
		this.listOfClients = [];
		this.name = name;
		this.CONSTS = {
			DELAY: 10000,
			ONLINE: 'online',
			TEMPORARILY_OFFLINE: 'temporarilyOffline',
			SERVER: 'server',
			ADDRESS_CAPACITY: 999,
		};
	}

	registerInNetwork(name, type, callback) {
		let address;

		const isClientInList = this.listOfClients.some(client => {
			if (client.name === name) {
				address = client.address;
				client.status = this.CONSTS.ONLINE;
				clearTimeout(client.timer);

				return true;
			}
		}, this);

		if (isClientInList) {
			return address;
		}

		if (this.listOfClients.length > this.CONSTS.ADDRESS_CAPACITY) {
			return;
		}

		address = this._findFreeAddress();

		this.listOfClients.push({
			name: name,
			address: address,
			type: type,
			status: this.CONSTS.ONLINE,
			feedbackMethod: callback,
		});

		return address;
	}

	_findFreeAddress() {
		let freeAddress = 1;

		const checkFreeAddress = array => {
			return array.some(client => {
				if (client.address === freeAddress) {
					return true;
				}
			});
		};

		while (checkFreeAddress(this.listOfClients)) {
			freeAddress++;
		}

		return freeAddress;
	}

	_finalRemoveClient(clientIP) {
		this.listOfClients.some((client, clientIndex, listOfClients) => {
			if (client.address === clientIP) {
				listOfClients.splice(clientIndex, 1);

				return true;
			}
		});
	}

	removeClient(clientIP) {
		this.listOfClients.some(client => {
			if (client.address === clientIP) {
				client.status = this.CONSTS.TEMPORARILY_OFFLINE;
				client.timer = setTimeout(
					this._finalRemoveClient.bind(this),
					this.CONSTS.DELAY,
					clientIP
				);

				return true;
			}
		}, this);
	}

	changeAddress(currentAddress, wishAddress) {
		const isBusyAddress = this.listOfClients.some(client => {
			if (client.address === wishAddress) {
				return true;
			}
		});

		if (isBusyAddress) {
			return;
		}

		this.listOfClients.some(client => {
			if (client.address === currentAddress) {
				client.address = wishAddress;
				return true;
			}
		});

		return wishAddress;
	}

	showAllClients() {
		console.log('\n');

		this.listOfClients.forEach(client => {
			if (client && client.status === this.CONSTS.ONLINE) {
				console.log(
					this.networkAddress +
						'.' +
						client.address +
						' ' +
						client.name +
						' ' +
						client.type
				);
			}
		}, this);
	}

	findServers() {
		const servers = [];

		this.listOfClients.forEach(client => {
			if (
				client.type === this.CONSTS.SERVER &&
				client.status === this.CONSTS.ONLINE
			) {
				servers.push(client.name);
			}
		}, this);

		return servers;
	}

	requestToServer(serverName, requestInfo) {
		let requestedServer;

		this.listOfClients.some(client => {
			if (client.name === serverName) {
				requestedServer = client;

				return true;
			}
		});

		requestedServer.feedbackMethod(requestInfo);
	}
}

module.exports = Network;
