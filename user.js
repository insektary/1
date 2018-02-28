var User = function(name) {
    this.name = name;
};

User.prototype.registerInNetwork = function(network, link) {
    this.address = network.getAddress('user', this.name, link);
    console.log(this.name + ' has get address ' + this.address);
};

User.prototype.requestServerAddress = function(network, server, action, login, password) {
    var address = network._findAddress(server);

    if (!address) {
        console.log('server in not avaibale');

        return;
    }
    network._actionWithServer(address, action, login, password);
};

module.exports = User;