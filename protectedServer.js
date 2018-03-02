var Server = require('./server.js');

var ProtectedServer = function(name, login, password) {
    Server.apply(this, arguments);
};

ProtectedServer.prototype = Object.create(Server.prototype);
ProtectedServer.prototype.status = 'protected';

module.exports = ProtectedServer;