function Server(name, login, password) {
    this.login = login;
    this.password = password;
    this.status = 'public';
    this.name = name;
    this.address = undefined;
    this.network;
    this.myClients = [];
}

Server.prototype.registerInNetwork = function(network) {
    this.address = network.getAddress('server', this);
    this.network = network;
};

Server.prototype.logOut = function(network) {
    network.removeClient(this.address);
};

Server.prototype.rebase = function(wishAddress) {
    var res = this.network.changeAddress(this.address, wishAddress);

    if (res) {
        console.log('successful!');
        this.address = res;
    } else {
        console.log('address in busy');
    }
};


module.exports = Server;