function Server(name, login) {
    this.login = login;
    this.name = name;
    this.myClients = [];
    this.blackList = [];
    this.type = 'server';
    this.ADMIN_RIGHTS = 'admin';
    this.exBind = Server.prototype._executeInstruction.bind(this);
}


Server.prototype.registerInNetwork = function(network) {
    this.address = network.getAddress(this.name, this.type, this.exBind);
    this.network = network;
};

Server.prototype.logOut = function() {
    this.network.removeClient(this.address);
};

Server.prototype._executeInstruction = function(requestInfo) {
    var USER_RIGHTS = requestInfo.type;
    var USER_NAME = requestInfo.name;
    var USER_LOGIN = requestInfo.login;
    var WISH_ADDRESS = requestInfo.wishAddress;
    var USER_FOR_BLACK_LIST = requestInfo.userForBlackList;

    if (this.blackList.indexOf(USER_NAME) !== -1) {
        return console.log(USER_NAME + ' in a black list of ' + this.name);
    }

    switch (requestInfo.instruction) {
        case 'reset': {
            this._reset(USER_RIGHTS);
            break;
        }
        case 'logIn': {
            this._logIn(USER_LOGIN, USER_NAME);
            break;
        }
        case 'rebase': {
            this._rebase(USER_RIGHTS, WISH_ADDRESS);
            break;
        }
        case 'showClients': {
            this._showClients(USER_RIGHTS);
            break;
        }
        case 'toBlackList': {
            this._toBlackList(USER_RIGHTS, USER_FOR_BLACK_LIST);
            break;
        }
        default: {
            console.log('incorrect instruction');
        }
    }
};

Server.prototype._rebase = function(userRights, wishAddress) {
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

Server.prototype._reset = function(userRights) {
    if (userRights === this.ADMIN_RIGHTS) {
        console.log('server will be rebooted');
    } else {
        console.log('access denied');
    }
};

Server.prototype._logIn = function(userLogin, userName) {
    if (this.login === userLogin) {
        this.myClients.push(userName);

        console.log(userName + ' is registered on ' + this.name);
    }
    else {
        console.log('login incorrect');
    }
};

Server.prototype._showClients = function(userRights) {
    if (userRights === this.ADMIN_RIGHTS) {
        this.myClients.forEach(function(userName) {
            console.log(userName);
        });
    } else {
        console.log('access denied');
    }
};

Server.prototype._toBlackList = function(userRights, blockedUserName) {
    if (userRights === this.ADMIN_RIGHTS) {
        this.blackList.push(blockedUserName);

        console.log(blockedUserName + ' was blocked on ' + this.name);
    } else {
        console.log('access denied');
    }
};

module.exports = Server;
