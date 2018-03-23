class Server {
    constructor(name, login) {
        this.login = login;
        this.name = name;
        this.myClients = [];
        this.blackList = [];
        this.type = 'SERVER';
        this.feedbackMethod = Server.prototype._executeInstruction.bind(this);
        this.CONSTS = {
            ADMIN_RIGHTS: 'ADMIN_RIGHTS',
            RESET: 'RESET',
            LOG_IN: 'LOG_IN',
            REBASE: 'REBASE',
            SHOW_CLIENTS: 'SHOW_CLIENTS',
            TO_BLACK_LIST: 'TO_BLACK_LIST',
        };
    }

    registerInNetwork(network) {
        const address = network.registerInNetwork(
            this.name,
            this.type,
            this.feedbackMethod
        );

        if (address) {
            this.address = address;
            this.network = network;
        } else {
            console.log('no free addresses');
        }
    }

    logOut() {
        this.network.removeClient(this.address);
    }

    _executeInstruction(requestInfo) {
        const {
            type,
            name,
            login,
            wishAddress,
            userForBlackList,
        } = requestInfo;

        const userInBlackList = this.blackList.includes(name);

        if (userInBlackList) {
            return console.log(`${name} in a black list of ${this.name}`);
        }

        switch (requestInfo.instruction) {
            case this.CONSTS.RESET: {
                this._reset(type);
                break;
            }
            case this.CONSTS.LOG_IN: {
                this._logIn(login, name);
                break;
            }
            case this.CONSTS.REBASE: {
                this._rebase(type, wishAddress);
                break;
            }
            case this.CONSTS.SHOW_CLIENTS: {
                this._showClients(type);
                break;
            }
            case this.CONSTS.TO_BLACK_LIST: {
                this._toBlackList(type, userForBlackList);
                break;
            }
            default: {
                console.log('incorrect instruction');
            }
        }
    }

    _rebase(userRights, wishAddress) {
        if (userRights !== this.CONSTS.ADMIN_RIGHTS) {
            return console.log('access denied');
        }

        const address = this.network.changeAddress(this.address, wishAddress);

        if (address) {
            console.log(`successful on address ${address}`);

            this.address = address;
        } else {
            console.log('address in busy');
        }
    }

    _reset(userRights) {
        if (userRights === this.CONSTS.ADMIN_RIGHTS) {
            console.log('server will be rebooted');
        } else {
            console.log('access denied');
        }
    }

    _logIn(login, name) {
        if (this.login === login) {
            this.myClients.push(name);

            console.log(`${name} is registered on ${this.name}`);
        } else {
            console.log('login incorrect');
        }
    }

    _showClients(userRights) {
        if (userRights === this.CONSTS.ADMIN_RIGHTS) {
            this.myClients.forEach(userName => console.log(userName));
        } else {
            console.log('access denied');
        }
    }

    _toBlackList(userRights, name) {
        if (userRights === this.CONSTS.ADMIN_RIGHTS) {
            this.blackList.push(name);

            console.log(`${name} was blocked on ${this.name}`);
        } else {
            console.log('access denied');
        }
    }
}

export default Server;
