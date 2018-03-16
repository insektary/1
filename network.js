function Network(name, networkAddress) {
    this.networkAddress = networkAddress;
    this.listOfClients = [];
    this.name = name;
    this.CONSTS = {
        DELAY: 10000,
        ONLINE: 'online',
        TEMPORARILY_OFFLINE: 'temporarilyOffline',
        SERVER: 'server',
        ADDRESS_CAPACITY: 999
    };
}

Network.prototype.registerInNetwork = function (name, type, callback) {
    var address;

    var isClientInList = this.listOfClients.some(function (client) {
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
        feedbackMethod: callback
    });

    return address;
};

Network.prototype._findFreeAddress = function () {
    var freeAddress = 1;

    var checkFreeAddress = function (array) {
        return array.some(function (client) {
            if (client.address === freeAddress) {
                return true;
            }
        });
    };

    while (checkFreeAddress(this.listOfClients)) {
        freeAddress++;
    }

    return freeAddress;
};

Network.prototype._finalRemoveClient = function (clientIP) {
    this.listOfClients.some(function (client, clientIndex, listOfClients) {
        if (client.address === clientIP) {
            listOfClients.slice(clientIndex, 1);

            return true;
        }
    })
};

Network.prototype.removeClient = function (clientIP) {
    this.listOfClients.some(function (client) {
        if (client.address === clientIP) {
            client.status = this.CONSTS.TEMPORARILY_OFFLINE;
            client.timer = setTimeout(this._finalRemoveClient.bind(this), this.DELAY, clientIP);

            return true;
        }
    }, this);
};

Network.prototype.changeAddress = function (currentAddress, wishAddress) {
    var isBusyAddress = this.listOfClients.some(function (client) {
        if (client.address === wishAddress) {
            return true;
        }
    });

    if (isBusyAddress) {
        return;
    }
    this.listOfClients.some(function (client) {
        if (client.address === currentAddress) {
            client.address = wishAddress;
            return true;
        }
    });

    return wishAddress;
};

Network.prototype.showAllClients = function () {
    console.log('\n');

    this.listOfClients.forEach(function (client) {
        if ((client) &&
            client.status === this.CONSTS.ONLINE) {
            console.log(this.networkAddress + '.' + client.address + ' ' + client.name + ' ' + client.type);
        }
    }, this);
};

Network.prototype.findServers = function () {
    var servers = [];

    this.listOfClients.forEach(function (client) {
        if (client.type === this.CONSTS.SERVER
        && client.status === this.CONSTS.ONLINE) {
            servers.push(client.name);
        }
    }, this);

    return servers;
};

Network.prototype.requestToServer = function (serverName, requestInfo) {
    var requestedServer;

    this.listOfClients.some(function (client) {
        if (client.name === serverName) {
            requestedServer = client;

            return true;
        }
    });

    requestedServer.feedbackMethod(requestInfo);
};

module.exports = Network;
