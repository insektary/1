function Server(name, login) {
    this.login = login;
    this.name = name;
    this.myClients = [];
    this.blackList = [];
    this.type = 'server';
    this.ADMIN_RIGHTS = 'admin';
}


Server.prototype.registerInNetwork = function (network) {
    this.address = network.getAddress(this.name, this.type);
    this.network = network;
};

Server.prototype.logOut = function () {
    this.network.removeClient(this.address);
};

Server.prototype.executeInstruction = function (requestInfo) {
    var userRights = requestInfo.type;
    var userName = requestInfo.name;
    var userLogin = requestInfo.login;
    var target = requestInfo.target;

    if (this.blackList.indexOf(userName) !== -1) {
        return console.log(userName + ' in a black list of ' + this.name);
    }

    switch (requestInfo.instruction) {
        case 'reset': {
            this.reset(userRights);
            break;
        }
        case 'logIn': {
            this.logIn(userLogin, userName);
            break;
        }
        case 'rebase': {
            this.rebase(userRights, target);
            break;
        }
        case 'showClients': {
            this.showClients(userRights);
            break;
        }
        case 'toBlackList': {
            this.toBlackList(userRights, target);
            break;
        }
        default: {
            console.log('incorrect instruction');
        }
    }
};

Server.prototype.rebase = function (userRights, wishAddress) {
    if (userRights !== this.ADMIN_RIGHTS) {
        return console.log('access denied');
    }

    var newAddress = this.network.changeAddress(this.address, wishAddress);

    if (newAddress) {
        console.log('successful on address ' + newAddress);

        this.address = newAddress;
    } else {
        console.log('address in busy');
    }
};

Server.prototype.reset = function (userRights) {
    if (userRights === this.ADMIN_RIGHTS) {
        console.log('server will be rebooted');
    } else {
        console.log('access denied');
    }
};

Server.prototype.logIn = function (userLogin, userName) {
    if (this.login === userLogin) {
        this.myClients.push(userName);

        console.log(userName + ' is registered on ' + this.name);
    }
    else {
        console.log('login incorrect');
    }
};

Server.prototype.showClients = function (userRights) {
    if (userRights === this.ADMIN_RIGHTS) {
        this.myClients.forEach(function (userName) {
            console.log(userName);
        });
    } else {
        console.log('access denied');
    }
};

Server.prototype.toBlackList = function (userRights, blockedUserName) {
    if (userRights === this.ADMIN_RIGHTS) {
        this.blackList.push(blockedUserName);

        console.log(blockedUserName + ' was blocked on ' + this.name);
    } else {
        console.log('access denied');
    }
};

module.exports = Server;
