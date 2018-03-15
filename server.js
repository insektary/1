function Server(name, login) {
    this.login = login;
    this.name = name;
    this.myClients = [];
    this.blackList = [];
    this.type = 'server';
    this.feedbackMethod = Server.prototype._executeInstruction.bind(this);
    this.CONSTS = {
        ADMIN_RIGHTS: 'admin',
        RESET: 'reset',
        LOG_IN: 'logIn',
        REBASE: 'rebase',
        SHOW_CLIENTS: 'showClients',
        TO_BLACK_LIST: 'toBlackList'
    };
}


Server.prototype.registerInNetwork = function (network) {
    var address = network.registerInNetwork(this.name, this.type, this.feedbackMethod);

    if (address) {
        this.address = address;
        this.network = network;
    } else {
        console.log('no free addresses');
    }
};

Server.prototype.logOut = function () {
    this.network.removeClient(this.address);
};

Server.prototype._executeInstruction = function (requestInfo) {
    var USER_RIGHTS = requestInfo.type;
    var USER_NAME = requestInfo.name;
    var USER_LOGIN = requestInfo.login;
    var WISH_ADDRESS = requestInfo.wishAddress;
    var USER_FOR_BLACK_LIST = requestInfo.userForBlackList;
    var userInBlackList = (this.blackList.indexOf(USER_NAME) !== -1);

    if (userInBlackList) {
        return console.log(USER_NAME + ' in a black list of ' + this.name);
    }

    switch (requestInfo.instruction) {
        case this.CONSTS.RESET: {
            this._reset(USER_RIGHTS);
            break;
        }
        case this.CONSTS.LOG_IN: {
            this._logIn(USER_LOGIN, USER_NAME);
            break;
        }
        case this.CONSTS.REBASE: {
            this._rebase(USER_RIGHTS, WISH_ADDRESS);
            break;
        }
        case this.CONSTS.SHOW_CLIENTS: {
            this._showClients(USER_RIGHTS);
            break;
        }
        case this.CONSTS.TO_BLACK_LIST: {
            this._toBlackList(USER_RIGHTS, USER_FOR_BLACK_LIST);
            break;
        }
        default: {
            console.log('incorrect instruction');
        }
    }
};

Server.prototype._rebase = function (userRights, wishAddress) {
    if (userRights !== this.CONSTS.ADMIN_RIGHTS) {
        return console.log('access denied');
    }

    var changedAddress = this.network.changeAddress(this.address, wishAddress);

    if (changedAddress) {
        console.log('successful on address ' + changedAddress);

        this.address = changedAddress;
    } else {
        console.log('address in busy');
    }
};

Server.prototype._reset = function (userRights) {
    if (userRights === this.CONSTS.ADMIN_RIGHTS) {
        console.log('server will be rebooted');
    } else {
        console.log('access denied');
    }
};

Server.prototype._logIn = function (login, name) {
    if (this.login === login) {
        this.myClients.push(name);

        console.log(name + ' is registered on ' + this.name);
    } else {
        console.log('login incorrect');
    }
};

Server.prototype._showClients = function (userRights) {
    if (userRights === this.CONSTS.ADMIN_RIGHTS) {
        this.myClients.forEach(function (userName) {
            console.log(userName);
        });
    } else {
        console.log('access denied');
    }
};

Server.prototype._toBlackList = function (userRights, name) {
    if (userRights === this.CONSTS.ADMIN_RIGHTS) {
        this.blackList.push(name);

        console.log(name + ' was blocked on ' + this.name);
    } else {
        console.log('access denied');
    }
};

module.exports = Server;
