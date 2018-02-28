function Network(networkAddress) {
    this.networkAddress = networkAddress;
    this.listOfClients = {};
}

Network.prototype.getAddress = function(typeOfClient, name, link, status) {
    var buffer = 0;
    var newAddress;

    for (var key in this.listOfClients) {
        if (+key - buffer !== 1) {
            newAddress = buffer + 1;

            break;
        } else buffer = +key;
    }

    if (!newAddress) {
        newAddress = buffer + 1;
    }

    this.listOfClients[newAddress] = {type: typeOfClient, status: status, name: name, link: link};

    return this.networkAddress + '.' + newAddress;
};

Network.prototype.removeClient = function(clientIP) {
    var address = clientIP.split('.')[3];
    delete(this.listOfClients[address]);
};

Network.prototype.getListOfClients = function() {
    for (var key in this.listOfClients) {
        var status = (this.listOfClients[key].status) ? this.listOfClients[key].status : '';

        console.log(this.networkAddress + '.' + key + ' ' + this.listOfClients[key].type + ' ' + status);
    }
};

Network.prototype._findAddress = function(name) {
    for (var key in this.listOfClients) {
        if (this.listOfClients[key].name === name) {

            return key;
        }
    }
};

Network.prototype._actionWithServer = function(address, action, login, password) {
    switch (action) {

        case 'connectToServer':
            this.listOfClients[address].link.setPublic(login, password);
            break;
    }
};


module.exports = Network;