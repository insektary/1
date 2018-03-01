var User = function(name) {
    this.name = name;
};

User.prototype.registerInNetwork = function(network) {
    this.address = network.getAddress('user', this);
};

User.prototype.logOut = function(network) {
    network.removeClient(this.address);
};


// var Admin = function(name) {
//     //Admin.prototype = Object.create(User.prototype);
// };

module.exports = User;
//module.exports = Admin;