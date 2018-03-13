function User(name) {
    this.name = name;
}

User.prototype.registerInNetwork = function (network) {
    this.network = network;
    this.address = this.network.getAddress(this.name, this.type);
};

User.prototype.logOut = function () {
    this.network.removeClient(this.address);
};

User.prototype.requestToServer = function (server, requestInfo) {
    var addressOfServer = (this.network.findServers()).indexOf(server);

    if (addressOfServer === -1) {
        return console.log('server not found');
    }

    requestInfo.name = this.name;
    requestInfo.type = this.type;

    this.network.requestToServer(addressOfServer, requestInfo);
};

module.exports = User;
