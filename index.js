var Network = require('./network.js');
var Server = require('./server.js');
var User = require('./user.js');

var myNetwork = new Network('myNetwork', '192.168.0');

var user1 = new User('user1');
user1.registerInNetwork(myNetwork);
var user2 = new User('user2');
user2.registerInNetwork(myNetwork);
var user3 = new User('user3');
user3.registerInNetwork(myNetwork);
var user4 = new User('user4');
user4.registerInNetwork(myNetwork);

// var admin1 = new Admin('admin1');
// admin1.registerInNetwork(myNetwork);
//myNetwork.showAllClients();

user3.logOut(myNetwork);
//myNetwork.showAllClients();

user3.registerInNetwork(myNetwork);
//myNetwork.showAllClients();

var server1 = new Server('server1');
server1.registerInNetwork(myNetwork);

myNetwork.showAllClients();

server1.rebase('0');
//myNetwork.showAllClients();
myNetwork.showAllClients();
