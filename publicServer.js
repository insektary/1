var Server = require('./server.js');

var PublicServer = function (name, login) {
    Server.call(this, name, login);
    this.status = 'public';
};

PublicServer.prototype = Object.create(Server.prototype);

module.exports = PublicServer;
