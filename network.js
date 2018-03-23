class Network {
	constructor(name, networkAddress) {
		this.networkAddress = networkAddress;
		this.listOfClients = [];
		this.name = name;
		this.CONSTS = {
			DELAY: 10000,
			ONLINE: 'ONLINE',
			TEMPORARILY_OFFLINE: 'TEMPORARILY_OFFLINE',
			SERVER: 'SERVER',
			ADDRESS_CAPACITY: 999,
		};
	}

	registerInNetwork(name, type, feedbackMethod) {
		const foundClient = this.listOfClients.find(client => client.name === name);

		if (foundClient) {
			foundClient.status = this.CONSTS.ONLINE;
			clearTimeout(foundClient.timer);

			return foundClient.address;
		}

		if (this.listOfClients.length > this.CONSTS.ADDRESS_CAPACITY) {
			return;
		}

		const address = this._findFreeAddress();

		this.listOfClients.push({
			name,
			address,
			type,
			status: this.CONSTS.ONLINE,
			feedbackMethod,
		});

		return address;
	}

	_findFreeAddress() {
		let freeAddress = 1;

		const checkFreeAddress = array => {
			return array.find(client => client.address === freeAddress);
		};

		while (checkFreeAddress(this.listOfClients)) {
			freeAddress++;
		}

		return freeAddress;
	}

	_finalRemoveClient(clientIP) {
		this.listOfClients.splice(
			this.listOfClients.findIndex(client => client.address === clientIP),
			1
		);
	}

	removeClient(clientIP) {
		const foundClient = this.listOfClients.find(
			client => client.address === clientIP
		);

		foundClient.status = this.CONSTS.TEMPORARILY_OFFLINE;
		foundClient.timer = setTimeout(
			this._finalRemoveClient.bind(this),
			this.CONSTS.DELAY,
			clientIP
		);
	}

	changeAddress(currentAddress, wishAddress) {
		const isBusyAddress = this.listOfClients.find(
			client => client.address === wishAddress
		);

		if (isBusyAddress) {
			return;
		}

		this.listOfClients.find(
			client => client.address === currentAddress
		).address = wishAddress;

		return wishAddress;
	}

	showAllClients() {
		console.log('\n');

		this.listOfClients.forEach(client => {
			if (client && client.status === this.CONSTS.ONLINE) {
				console.log(
					`${this.networkAddress}.${client.address} ${client.name} ${
						client.type
					}`
				);
			}
		});
	}

	findServers() {
		return this.listOfClients.filter(
			client =>
				client.type === this.CONSTS.SERVER &&
				client.status === this.CONSTS.ONLINE
		);
	}

	requestToServer(serverName, requestInfo) {
		let requestedServer = this.listOfClients.find(
			client => client.name === serverName
		);

		requestedServer.feedbackMethod(requestInfo);
	}
}

export default Network;
