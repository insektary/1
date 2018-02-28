function Server(name, login, password) {
    this.login = login;
    this.password = password;
    this.status = 'public';
    this.name = name;
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
        console.log('status was changed on "protected"');
    } else {
        console.log('login or password are incorrect');
    }
};

Server.prototype.registerInNetwork = function(network, link) {
    this.address = network.getAddress('server', this.name, link, this.status);
    console.log(this.name + ' has get address ' + this.address);
};

module.exports = Server;