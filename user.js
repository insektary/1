var User = function(name) {
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
    this.listOfServers = this.network.findServer();

    if (!(server in this.listOfServers)) {
        console.log('server not found');

        return;
    }

    var requestInfo = {instruction: instruction,
                    login: login,
                    password: password,
                    target: target};

    this.network.requestToServer(this.listOfServers[server].address, this, requestInfo);
};

module.exports = User;
