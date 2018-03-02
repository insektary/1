var Server = require('./server.js');

var PublicServer = function(name, login, password) {
    Server.apply(this, arguments);
};

PublicServer.prototype = Object.create(Server.prototype);
PublicServer.prototype.status = 'public';

module.exports = PublicServer;
