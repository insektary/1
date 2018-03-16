var Server = require('./server.js');

var ProtectedServer = function (name, login) {
    Server.call(this, name, login);
    this.status = 'protected';
};

ProtectedServer.prototype = Object.create(Server.prototype);

module.exports = ProtectedServer;
