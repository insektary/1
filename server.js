function Server(name, login, password) {
    this.login = login;
    this.password = password;
    this.status = 'public';
    this.name = name;
    this.address = undefined;
}

Server.prototype.setPublic = function(login, password) {
    if (this.login === login && this.password === password) {
        this.status = 'public';
        console.log('status was changed on "public"');
    } else {
        console.log('login or password are incorrect');
    }
};

Server.prototype.setProtected = function(login, password) {
    if (this.login === login && this.password === password) {
        this.status = 'protected';
        console.log(this.name + ' status was changed on "protected"');
    } else {
        console.log('login or password are incorrect');
    }
};

Server.prototype.registerInNetwork = function(network) {
    this.address = network._getAddress('server', this);
    console.log(this.name + ' has get address ' + this.address);
};

Server.prototype.turnOff = function(network) {
    network.removeClient(this.address);
};

module.exports = Server;