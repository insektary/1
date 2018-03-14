function Network(name, networkAddress) {
    this.networkAddress = networkAddress;
    this.listOfClients = [];
    this.name = name;
    this.DELAY = 10000;
    this.ONLINE = 'online';
    this.TEMPORARILY_OFFLINE = 'temporarilyOffline';
    this.SERVER = 'server';
}

Network.prototype.getAddress = function (name, type, feedbackMethod) {
    var newAddress;

    var res = this.listOfClients.some(function (client) {
        if (client.name === name) {
            client.status = this.ONLINE;
            clearTimeout(client.timer);

            return true;
        }
    }, this);

    if (res) return;

    newAddress = this._findFreeAddress(this.listOfClients);

    this.listOfClients.push({
        name: name,
        address: newAddress,
        type: type,
        status: this.ONLINE,
        feedbackMethod: feedbackMethod
    });

    return newAddress;
};

Network.prototype._findFreeAddress = function (array) {
    var freeAddress = 0;

    while (array.some(function (client) {
        if (client.address === freeAddress) {
            freeAddress++;

            return true;
        }
    }));

    return freeAddress;
};

Network.prototype.removeClient = function (clientIP) {
    this.listOfClients.some(function (client, clientIndex, arrayOfClients) {
        if (client.address === clientIP) {
            client.status = this.TEMPORARILY_OFFLINE;

            client.timer = setTimeout(function () {
                arrayOfClients.splice(clientIndex, 1);
            }, this.DELAY);

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
            client.status === this.ONLINE) {
            console.log(this.networkAddress + '.' + client.address + ' ' + client.name + ' ' + client.type);
        }
    }, this);
};

Network.prototype.findServers = function () {
    var servers = [];

    this.listOfClients.forEach(function (client) {
        if (client.type === this.SERVER
        && client.status === this.ONLINE) {
            servers.push(client.name);
        }
    }, this);

    return servers;
};

Network.prototype.requestToServer = function (server, requestInfo) {
    var requestedServer;

    this.listOfClients.some(function (client) {
        if (client.name === server) {
            requestedServer = client;

            return true;
        }
    });

    requestedServer.feedbackMethod(requestInfo);
};

module.exports = Network;
