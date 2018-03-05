function Network(name, networkAddress) {
    this.networkAddress = networkAddress;
    this.listOfClients = [];
    this.name = name;
}

Network.prototype.getAddress = function(clientType, link) {
    var newAddress = this.listOfClients.length;
    var RANGE = 999;

    try {
        if (clientType === 'server') {
            this.listOfClients.forEach(function (item, index, array) {
                if (item.name === link.name) {
                    array[index].online = 'true';
                    newAddress = index;

                    throw(e);
                }
            });
        }
    } catch (e) {
        return newAddress;
    }

    for (var i = 0; i < this.listOfClients.length; i++) {
        if (!this.listOfClients[i]) {
            newAddress = i;
            break;
        }
    }

    if (newAddress > RANGE) {
        console.log('sorry, network are overloaded');

        return;
    }

    this.listOfClients[newAddress] = {
        type: clientType,
        status: link.status,
        name: link.name,
        link: link,
        online: 'true'
    };

    return newAddress;
};

Network.prototype.removeClient = function(clientIP) {
    this.listOfClients[clientIP].online = undefined;
};

Network.prototype.changeAddress = function(previousAddress, wishAddress) {
    if (!this.listOfClients[wishAddress]) {
        this.listOfClients[wishAddress] = {};
        Object.assign(this.listOfClients[wishAddress], this.listOfClients[previousAddress]);
        this.listOfClients[previousAddress].name = '';
        this.removeClient(previousAddress);

        return wishAddress;
    }
};

Network.prototype.showAllClients = function() {
    console.log('');

    for (var i = 0; i < this.listOfClients.length; i++) {
        if (!this.listOfClients[i] || !this.listOfClients[i].online) continue;

        var status = this.listOfClients[i].status || '';
        console.log(i + ' ' + this.listOfClients[i].name + ' ' + this.listOfClients[i].type + ' ' + status);
    }
};

Network.prototype.findServer = function() {
    var res = {};

    this.listOfClients.forEach(function(item, index) {
        if (item.online) {
            res[item.name] = {};
            res[item.name].address = index;
            res[item.name].status = item.status;
        }
    });

    return res;
};

Network.prototype.requestToServer = function(server, user, requestInfo) {
    var link = this.listOfClients[server].link;
    link.executeInstruction(user, requestInfo);
};

module.exports = Network;