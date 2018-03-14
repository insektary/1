function Network(name, networkAddress) {
    this.networkAddress = networkAddress;
    this.listOfClients = [];
    this.name = name;
    this.DELAY = 10000;
    this.ONLINE = 'online';
    this.TEMPORARILY_OFFLINE = 'temporarilyOffline';
    this.SERVER = 'server';
}

Network.prototype.getAddress = function (name, type, callback) {
    var address;

    var res = this.listOfClients.some(function (client) {
        if (client.name === name) {
            client.status = this.ONLINE;
            clearTimeout(client.timer);

            return true;
        }
    }, this);

    if (res) return;

    address = this._findFreeAddress();

    this.listOfClients.push({
        name: name,
        address: address,
        type: type,
        status: this.ONLINE,
        feedbackMethod: callback
    });

    return address;
};

Network.prototype._findFreeAddress = function () {
    var freeAddress = 0;

    var check = function (array) {
        return array.some(function (client) {
            if (client.address === freeAddress) {
                return true;
            }
        });
    };

    while (check(this.listOfClients)) {
        freeAddress++;
    }

    return freeAddress;
};

Network.prototype.removeClient = function (clientIP) {
    var finalRemove = function (clientName, arrayOfClients) {
        arrayOfClients.some(function (currentClient, clientIndex, array) {
            if (clientName === currentClient.name) {
                array.slice(clientIndex, 1);
            }
        })
    };

    this.listOfClients.some(function (currentClient, clientIndex, arrayOfClients) {
        if (currentClient.address === clientIP) {
            currentClient.status = this.TEMPORARILY_OFFLINE;

            currentClient.timer = setTimeout(finalRemove, this.DELAY, currentClient.name, arrayOfClients);

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
