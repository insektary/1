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
        const foundClient = this.listOfClients.find(
            ({ clientName }) => clientName === name
        );

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
            return array.find(({ address }) => address === freeAddress);
        };

        while (checkFreeAddress(this.listOfClients)) {
            freeAddress++;
        }

        return freeAddress;
    }

    _finalRemoveClient(clientIP) {
        this.listOfClients.splice(
            this.listOfClients.findIndex(({ address }) => address === clientIP),
            1
        );
    }

    removeClient(clientIP) {
        const foundClient = this.listOfClients.find(
            ({ address }) => address === clientIP
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
            ({ address }) => address === wishAddress
        );

        if (isBusyAddress) {
            return;
        }

        this.listOfClients.find(
            ({ address }) => address === currentAddress
        ).address = wishAddress;

        return wishAddress;
    }

    showAllClients() {
        console.log('\n');

        this.listOfClients.forEach(({ status, address, name, type }) => {
            if (status === this.CONSTS.ONLINE) {
                console.log(
                    `${this.networkAddress}.${address} ${name} ${type}`
                );
            }
        });
    }

    findServers() {
        return this.listOfClients.filter(
            ({ type, status }) =>
                type === this.CONSTS.SERVER && status === this.CONSTS.ONLINE
        );
    }

    requestToServer(serverName, requestInfo) {
        this.listOfClients
            .find(({ name }) => name === serverName)
            .feedbackMethod(requestInfo);
    }
}

export default Network;
