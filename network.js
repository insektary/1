function Network(name, networkAddress) {
    this.networkAddress = networkAddress;
    this.listOfClients = {};
    this.name = name;
}

Network.prototype._getAddress = function(typeOfClient, link) {
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

    this.listOfClients[newAddress] = {type: typeOfClient, status: link.status, name: link.name, link: link};

    return this.networkAddress + '.' + newAddress;
};

Network.prototype._removeClient = function(clientIP) {
    var address = clientIP.split('.')[3];
    console.log(this.listOfClients[address].name + ' log out');
    delete(this.listOfClients[address]);
};

Network.prototype.getListOfClients = function() {
    console.log('list of clients:');
    for (var key in this.listOfClients) {
        var status = (this.listOfClients[key].status) ? this.listOfClients[key].status : '';

        console.log('  ' + this.listOfClients[key].name + ' ' + this.networkAddress + '.' +
            key + ' ' + this.listOfClients[key].type + ' ' + status);
    }
};

Network.prototype._findAddress = function(name) {
    for (var key in this.listOfClients) {
        if (this.listOfClients[key].name === name) {

            return key;
        }
    }
};

Network.prototype._actionWithServer = function(address, action, login, password, user) {
    switch (action) {

        case 'setPublic':
            if (this.listOfClients[address].link._setPublic(login, password) === 'success') {
                this.listOfClients[address].status = 'public';
            }
            break;

        case 'setProtected':
            if (this.listOfClients[address].link._setProtected(login, password) === 'success') {
                this.listOfClients[address].status = 'protected';
            }
            break;

        case 'turnOff':
            this.listOfClients[address].link._turnOff(this, login, password);

            break;

        case 'signIn':
            this.listOfClients[address].link._signIn(user, login, password);

            break;
    }
};


module.exports = Network;