function Network(name, networkAddress) {
    this.networkAddress = networkAddress;
    this.listOfClients = [];
    this.name = name;
    this.DELAY = 10000;
}

Network.prototype.getAddress = function (clientName, clientType, clientFeedbackMethod) {
    var newAddress;

    var res = this.listOfClients.some(function (client, clientIndex, arrayOfClients) {
        if (client.name === clientName) {
            arrayOfClients[clientIndex].status = 'online';
            clearTimeout(arrayOfClients[clientIndex].timer);

            return true;
        }
    });

    if (res) return;

    newAddress = this._findFreeAddress(this.listOfClients);

    this.listOfClients.push({
        name: clientName,
        address: newAddress,
        type: clientType,
        status: 'online',
        feedbackMethod: clientFeedbackMethod
    });

    return newAddress;
};

Network.prototype._findFreeAddress = function (array) {
    var freeAddress;
    var arrayOfAddresses = array.map(function (client) {
        return client.address;
    });

    arrayOfAddresses.sort(function (a, b) {
        return a - b;
    });

    freeAddress = arrayOfAddresses.some(function (address, numberOfAddress) {
        if (address !== numberOfAddress) {
            return true;
        }
    });

    return freeAddress || arrayOfAddresses.length;
};

Network.prototype.removeClient = function (clientIP) {
    this.listOfClients.some(function (client, clientIndex, arrayOfClients) {
        if (client.address === clientIP) {
            arrayOfClients[clientIndex].status = 'temporarilyOffline';

            arrayOfClients[clientIndex].timer = setTimeout(function () {
                arrayOfClients.splice(clientIndex, 1);
            }, this.DELAY);

            return true;
        }
    }, this);
};

Network.prototype.changeAddress = function (previousAddress, wishAddress) {
    var impossibilityOfChange = this.listOfClients.some(function (client) {
        if (client.address === wishAddress) {
            return true;
        }
    });

    if (impossibilityOfChange) {
        return;
    }
    this.listOfClients.some(function (client) {
        if (client.address === previousAddress) {
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
            client.status === 'online') {
            console.log(this.networkAddress + '.' + client.address + ' ' + client.name + ' ' + client.type);
        }
    }, this);
};

Network.prototype.findServers = function () {
    var response = [];

    this.listOfClients.forEach(function (client, address) {
        if (client.type === 'server') {
            response[address] = client.name;
        }
    });

    return response;
};

Network.prototype.requestToServer = function (addressOfServer, requestInfo) {
    var indexOfServer;

    this.listOfClients.some(function (client, currentIndex) {
        if (client.address === addressOfServer) {
            indexOfServer = currentIndex;
            return true;
        }
    });

    this.listOfClients[indexOfServer].feedbackMethod(requestInfo);
};

module.exports = Network;
