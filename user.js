function User(name) {
    this.name = name;
};

User.prototype.registerInNetwork = function(network) {
    this.address = network.getAddress(this.type, this);
    this.network = network;
};

User.prototype.logOut = function() {
    this.network.removeClient(this.address);
};

User.prototype.requestToServer = function(server, instruction, target, login, password) {
    var addressOfServer = (this.network.findServers()).indexOf(server);

    if (addressOfServer === -1) {
        console.log('server not found');

        return;
    }

    var requestInfo = {
        name: this.name,
        type: this.type,
        instruction: instruction,
        login: login,
        password: password,
        target: target
    };

    this.network.requestToServer(addressOfServer, requestInfo);
};

module.exports = User;
