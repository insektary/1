var Network = require('./network.js');
var Server = require('./server.js');
var User = require('./user.js');


var myNetwork = new Network('myNetwork', '192.168.0');

var server1 = new Server('server1', 'admin', 'pass');
server1.registerInNetwork(myNetwork);

var server2 = new Server('server2');
server2.registerInNetwork(myNetwork);

var user1 = new User('user1');
user1.registerInNetwork(myNetwork);
var user2 = new User('user2');
user2.registerInNetwork(myNetwork);
var user3 = new User('user3');
user3.registerInNetwork(myNetwork);
//


user1.requestToServer(myNetwork, 'server1', 'setProtected', 'admin', 'pass');

user1.requestToServer(myNetwork, 'server1', 'signIn', 'admin', 'pass');

user2.exitTheNetwork(myNetwork);

server1.changeAddress(myNetwork, '7');
//server1._turnOff(myNetwork, 'admin', 'pass');
//server1.showMyNetworks();
//server1.showMyUsers();
myNetwork.getListOfClients();