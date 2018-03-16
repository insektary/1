function User(name) {
    this.name = name;
}

User.prototype.registerInNetwork = function (network) {
    var address = network.registerInNetwork(this.name, this.type);

    if (address) {
        this.address = address;
        this.network = network;
    } else {
        console.log('no free addresses');
    }
};

User.prototype.logOut = function () {
    this.network.removeClient(this.address);
};

User.prototype.requestToServer = function (server, requestInfo) {
    var noServer = (this.network.findServers().indexOf(server) === -1);

    if (noServer) {
        return console.log('server not found');
    }

    requestInfo.name = this.name;
    requestInfo.type = this.type;

    this.network.requestToServer(server, requestInfo);
};

module.exports = User;
