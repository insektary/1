const Network = require('./network.js');
const PublicServer = require('./publicServer.js');
const Guest = require('./guest.js');
const Admin = require('./admin.js');

const myNetwork = new Network('myNetwork', '192.168.0');

const server1 = new PublicServer('server1', 'admin');
server1.registerInNetwork(myNetwork);

const guest1 = new Guest('guest1');
guest1.registerInNetwork(myNetwork);
const guest2 = new Guest('guest2');
guest2.registerInNetwork(myNetwork);
const guest3 = new Guest('guest3');
guest3.registerInNetwork(myNetwork);
const guest4 = new Guest('guest4');
guest4.registerInNetwork(myNetwork);

guest2.logOut();

const guest66 = new Guest('guest66');
guest66.registerInNetwork(myNetwork);

guest2.registerInNetwork(myNetwork);

let requestInfo = {
	instruction: 'rebase',
	login: 'admin',
	wishAddress: 20,
	userForBlackList: 'guest1',
};

const admin1 = new Admin('admin1');
admin1.registerInNetwork(myNetwork);

admin1.requestToServer('server1', requestInfo);

requestInfo.instruction = 'logIn';
guest1.requestToServer('server1', requestInfo);

console.log('end');
