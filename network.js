function Network(name, networkAddress) {
    this.networkAddress = networkAddress;
    this.listOfClients = new Array(999);
    this.listOfRemoved = [];
    this.name = name;
}

Network.prototype.getAddress = function(clientType, link) {
    var context = this;
    var newAddress = this.listOfClients.findIndex(function(user, address) {
        if ((user)
            && (link.name === user.name)) {
            clearTimeout(context.timer);

            return true;
        }
    });

    if (newAddress === -1) {
        newAddress = this.listOfRemoved.indexOf(link.name);
    }

    if (newAddress !== -1) {
        this.listOfRemoved[newAddress] = undefined;
    } else {
        newAddress = this.listOfClients.findIndex(function(user) {
            if (!user) {
                return true;
            }
        });
    }

    console.log(link.name + ' was registered on address ' + this.networkAddress + '.' + newAddress);

    this.listOfClients[newAddress] = {
        type: clientType,
        name: link.name,
        link: link,
        status: 'online'
    };
    this.listOfRemoved[newAddress] = undefined;

    return newAddress;
};

Network.prototype.removeClient = function(clientIP) {
    var DELAY = 10000; //ms
    var user = this.listOfClients[clientIP];
    var context = this;

    this.timer = setTimeout(function() {
        context.listOfRemoved[clientIP] = undefined;
    }, DELAY);

    console.log(user.name + ' log out');
    this.listOfClients[clientIP].status = 'temporarilyOffline';
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
    console.log('');

    this.listOfClients.forEach(function(user, address) {
        if (user && (user.status === 'online')) {
            console.log(this.networkAddress + '.' + address + ' ' + user.name);
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