function Network(name, networkAddress) {
    this.networkAddress = networkAddress;
    this.listOfClients = [];
    this.listOfRemoved = [];
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
        } else {
            var previousAddress = this.listOfRemoved.indexOf(link.name);

            if (previousAddress !== -1) {
                this.listOfClients[previousAddress].online = 'true';
                clearTimeout(this.timer);

                return previousAddress;
            }
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
        console.log('sorry, network is overload');

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
    this.listOfRemoved[clientIP] = this.listOfClients[clientIP].name;
    this.listOfClients[clientIP].online = undefined;

    var DELAY = 10000; //ms
    var context = this;

    this.timer = setTimeout(function() {
        context.listOfRemoved[clientIP] = undefined;
    }, DELAY);
};

Network.prototype.changeAddress = function(previousAddress, wishAddress) {
    if (!this.listOfClients[wishAddress]) {
        this.listOfClients[wishAddress] = {};
        Object.assign(this.listOfClients[wishAddress], this.listOfClients[previousAddress]);
        this.listOfClients[previousAddress].name = '';
        this.listOfClients[previousAddress].online = undefined;

        return wishAddress;
    }
};

Network.prototype.showAllClients = function() {
    console.log('');

    for (var i = 0; i < this.listOfClients.length; i++) {
        if (!this.listOfClients[i] || !this.listOfClients[i].online) continue;

        var status = this.listOfClients[i].status || '';
        console.log(this.networkAddress + '.' + i + ' '
            + this.listOfClients[i].name + ' ' + this.listOfClients[i].type + ' ' + status);
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