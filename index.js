var Network = require('./network.js');
var Server = require('./server.js');
var User = require('./user.js');


var myNetwork = new Network('192.168.0');

var server1 = new Server('server1', 'admin', 'pass');
server1.registerInNetwork(myNetwork, server1);

var server2 = new Server('server2');
server2.registerInNetwork(myNetwork, server2);

var user1 = new User('user1');
user1.registerInNetwork(myNetwork, user1);
var user2 = new User('user2');
user2.registerInNetwork(myNetwork, user2);
var user3 = new User('user3');
user3.registerInNetwork(myNetwork, user3);
//
myNetwork.getListOfClients();

user1.requestServerAddress(myNetwork, 'server1', 'connectToServer', 'admin', 'pass');

