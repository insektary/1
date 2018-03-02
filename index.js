var Network = require('./network.js');
var PublicServer = require('./publicServer.js');
var ProtectedServer = require('./protectedServer.js');
var Guest = require('./guest.js');
var Admin = require('./admin.js');



var myNetwork = new Network('myNetwork', '192.168.0');
//
var guest1 = new Guest('guest1');
guest1.registerInNetwork(myNetwork);
var guest2 = new Guest('guest2');
guest2.registerInNetwork(myNetwork);
var guest3 = new Guest('guest3');
guest3.registerInNetwork(myNetwork);
var guest4 = new Guest('guest4');
guest4.registerInNetwork(myNetwork);


var server1 = new PublicServer('server1', 'admin', 'pass');
server1.registerInNetwork(myNetwork);

server1.rebase('8');


var admin1 = new Admin('admin1');
admin1.registerInNetwork(myNetwork);

var server2 = new ProtectedServer('server2');
server2.registerInNetwork(myNetwork);

myNetwork.showAllClients();

guest4.requestToServer('server1', myNetwork);




