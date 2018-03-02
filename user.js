var User = function(name) {
    this.name = name;
};

User.prototype.registerInNetwork = function(network) {
    this.address = network.getAddress(this.type, this);
};

User.prototype.logOut = function(network) {
    network.removeClient(this.address);
};

User.prototype.requestToServer = function(server, network) {
    if (!network.findServer(server)) {
        console.log('server not found');

        return;
    }
};

module.exports = User;
