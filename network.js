function Network(name, networkAddress) {
    this.networkAddress = networkAddress;
    this.listOfClients = [];
    this.name = name;
    this.DELAY = 10000;
}

Network.prototype.getAddress = function(clientName, clientType, clientFeedbackMethod) {
    var newAddress;

    var res = this.listOfClients.find(function(client, clientIndex, arrayOfClients) {
        if (client.name === clientName) {
            arrayOfClients[clientIndex].status = 'online';
            clearTimeout(arrayOfClients[clientIndex].timer);

            return true;
        }
    });

    if (res) return;

    newAddress = this.findFreeAddress(this.listOfClients);

    this.listOfClients.push({
        name: clientName,
        address: newAddress,
        type: clientType,
        status: 'online',
        feedbackMethod: clientFeedbackMethod
    });

    return newAddress;
};

Network.prototype.findFreeAddress = function(array) {
    var freeAddress;
    var arrayOfAddresses = array.map(function(client) {
        return client.address;
    });

    arrayOfAddresses.sort(function(a, b) {
        return a - b;
    });

    freeAddress = arrayOfAddresses.find(function(address, numberOfAddress) {
        if (address !== numberOfAddress) {
            return true;
        }
    });

    return freeAddress || arrayOfAddresses.length;
};

Network.prototype.removeClient = function(clientIP) {
    this.listOfClients.find(function(client, clientIndex, arrayOfClients) {
        if (client.address === clientIP) {
            arrayOfClients[clientIndex].status = 'temporarilyOffline';

            arrayOfClients[clientIndex].timer = setTimeout(function() {
                console.log('deleted');
            }, this.DELAY);

            return true;
        }
    });


    // var LOG_OUT_MESSAGE = ' log out';
    // var user = this.listOfClients[clientIP];
    // var func = function() {
    //     this.listOfRemoved[clientIP] = undefined;
    // };
    // var fn = func.bind(this);
    //
    // this.timer = setTimeout(fn, this.DELAY);
    //
    // console.log(user.name + LOG_OUT_MESSAGE);
    // this.listOfClients[clientIP].status = 'temporarilyOffline';
};

Network.prototype.changeAddress = function(previousAddress, wishAddress) {
    if (!this.listOfClients[wishAddress]) {
        this.listOfClients[wishAddress] = {};
        Object.assign(this.listOfClients[wishAddress], this.listOfClients[previousAddress]);
        this.listOfClients[previousAddress] = undefined;

        return wishAddress;
    }
};

Network.prototype.showAllClients = function() {
    console.log('\n');

    this.listOfClients.forEach(function(client) {
        if ((client) &&
            client.status === 'online') {
            console.log(this.networkAddress + '.' + client.address + ' ' + client.name + ' ' + client.type);
        }
    }, this);
};

Network.prototype.findServers = function() {
    var response = [];

    this.listOfClients.forEach(function(client, address) {
        if (client.type === 'server') {
            response[address] = client.name;
        }
    });

    return response;
};

Network.prototype.requestToServer = function(server, requestInfo) {
    var link = this.listOfClients[server].link;

    link.executeInstruction(requestInfo);
};

module.exports = Network;