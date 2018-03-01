function Server(name, login, password) {
    this.login = login;
    this.password = password;
    this.status = 'public';
    this.name = name;
    this.address = undefined;
    this.myNetworks = {};
    this.myClients = {};
}

Server.prototype._setPublic = function(login, password) {
    if (this.login === login && this.password === password) {
        this.status = 'public';
        console.log('status was changed on "public"');

        return 'success';
    } else {
        console.log('login or password are incorrect');

        return 'failure';
    }
};

Server.prototype._setProtected = function(login, password) {
    if (this.login === login && this.password === password) {
        this.status = 'protected';
        console.log(this.name + ' status was changed on "protected"');

        return 'success'
    } else {
        console.log('login or password are incorrect');

        return 'failure';
    }
};

Server.prototype.registerInNetwork = function(network) {
    this.address = network._getAddress('server', this);
    this.myNetworks[network.name] = network;

    console.log(this.name + ' has get address ' + this.address);
};

Server.prototype._turnOff = function(network, login, password) {
    if (this.login === login && this.password === password) {
        delete(this.myNetworks[network.name]);
        network._removeClient(this.address);
    } else {
        console.log('login or password are incorrect');
    }

};

Server.prototype.showMyNetworks = function() {
    console.log(this.name + ' registered in networks:');

    for (var key in this.myNetworks) {
        console.log('   ' + key);
    }
};

Server.prototype.showMyUsers = function() {
    console.log('users on ' + this.name + ':');

    for (var key in this.myClients) {
        console.log('   ' + key + ' ' + this.myClients[key].address + ' ' + this.myClients[key].status);
    }
};

Server.prototype._signIn = function(user, login, password) {
    if (login === undefined && this.status === 'public') {
        this.myClients[user.name] = user;
        this.myClients[user.name].address = user.address;
        this.myClients[user.name].status = 'non-authorized';

        console.log(user.name + ' has a guest access on ' + this.name);

    } else if (login === undefined && this.status === 'protected') {
        console.log('access denied');

    } else if (this.login === login && this.password === password) {
        this.myClients[user.name] = user;
        this.myClients[user.name].address = user.address;
        this.myClients[user.name].status = 'authorized';

        console.log(user.name + ' was succsessfully registered on ' + this.name);
    } else {
        console.log('login or password are incorrect')
    }
};

module.exports = Server;