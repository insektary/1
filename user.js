class User {
    constructor(name) {
        this.name = name;
        this.type = 'user';
    }

    registerInNetwork(network) {
        const address = network.registerInNetwork(this.name, this.type);

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

    requestToServer(serverName, requestInfo) {
        const isServer = this.network
            .findServers()
            .find(({ name })=> serverName === name);

        if (isServer) {
            requestInfo.name = this.name;
            requestInfo.type = this.type;

            this.network.requestToServer(serverName, requestInfo);
        } else {
            console.log('server not found');
        }
    }
}

export default User;
