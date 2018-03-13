var Network = require('./network.js');
var PublicServer = require('./publicServer.js');
var Guest = require('./guest.js');
var Admin = require('./admin.js');

var myNetwork = new Network('myNetwork', '192.168.0');

var server1 = new PublicServer('server1', 'admin');
server1.registerInNetwork(myNetwork);

var guest1 = new Guest('guest1');
guest1.registerInNetwork(myNetwork);
var guest2 = new Guest('guest2');
guest2.registerInNetwork(myNetwork);
var guest3 = new Guest('guest3');
guest3.registerInNetwork(myNetwork);
var guest4 = new Guest('guest4');
guest4.registerInNetwork(myNetwork);

guest2.logOut();

var guest66 = new Guest('guest66');
guest66.registerInNetwork(myNetwork);

guest2.registerInNetwork(myNetwork);


var requestInfo = {
    instruction: 'toBlackList',
    login: '',
    wishAddress: 20,
    userForBlackList: 'guest1'
};

var admin1 = new Admin('admin1');
admin1.registerInNetwork(myNetwork);

admin1.requestToServer('server1', requestInfo);

requestInfo.instruction = 'logIn';
guest1.requestToServer('server1', requestInfo);

console.log('end');
