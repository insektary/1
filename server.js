function Server(name, login, password) {
    this.login = login;
    this.password = password;
    this.name = name;
    this.network;
    this.myClients = [];
}

Server.prototype.type = 'server';

Server.prototype.registerInNetwork = function(network) {
    this.address = network.getAddress('server', this);
    this.network = network;
};

Server.prototype.logOut = function() {
    this.network.removeClient(this.address);
};

Server.prototype.executeInstruction = function(user, requestInfo) {
    var userStatus = user.type;

    switch (requestInfo.instruction) {
        case 'reset': {
            if (userStatus === 'admin') {
                console.log('server will be restarted');
            } else {
                console.log('access denied');
            }
            break;
        }
        case 'logIn': {
            if (this.login === requestInfo.login && this.password === requestInfo.password) {
                this.myClients.push(user);
                console.log(user.name + ', welcome to the ' + this.name);
            } else {
                console.log('login or password are incorrect');
            }
            break;
        }
        case 'rebase': {
            if (userStatus === 'admin') {
                this.rebase(requestInfo.target);
            } else {
                console.log('access denied');
            }
            break;
        }
        case 'showClients': {
            var prefix = this.network.networkAddress;

            console.log('');
            console.log(this.name+ ':');

            this.myClients.forEach(function(item, index) {
                console.log(prefix + '.' + index + ' ' + item.name + ' ' + item.type);
            });
            break;
        }
        default: {
            console.log('incorrect instruction');
        }
    }
};

Server.prototype.rebase = function(wishAddress) {
    var res = this.network.changeAddress(this.address, wishAddress);

    if (res) {
        console.log('successful on address ' + res);
        this.address = res;
    } else {
        console.log('address in busy');
    }
};

module.exports = Server;
