var Network = function(networkAddress) {
    this.networkAddress = networkAddress;

    var listOfClients = {};

    this.getAddress = function(typeOfClient, status) {
        var buffer = 0;
        var newAddress;

        for (var key in listOfClients) {
            if (+key - buffer !== 1) {
                newAddress = buffer + 1;

                break;
            } else buffer = +key;
        }

        if (!newAddress) {
            newAddress = buffer + 1;
        }

        listOfClients[newAddress] = {type: typeOfClient, status: status};
        console.log('Your address is ' + networkAddress + '.' + newAddress);

        return networkAddress + '.' + newAddress;
    };

    this.removeClient = function(clientIP) {
        var address = clientIP.split('.')[3];
        delete(listOfClients[address]);
    };

    this.getListOfClients = function() {
        for (var key in listOfClients) {
            var status = (listOfClients[key].status) ? listOfClients[key].status : '';

            console.log(networkAddress + '.' + key + ' ' + listOfClients[key].type + ' ' + status);
        }
    }


};

var Server = function(login, password) {
    this.login = login;
    this.password = password;

    var status = 'public';
    var address;

    this.setPublic = function(login, password) {
        if (this.login === login && this.password === password) {
            status = 'public';
            console.log('status was changed on "public"');
        } else {
            console.log('login or password are incorrect');
        }
    };

    this.setProtected = function(login, password) {
        if (this.login === login && this.password === password) {
            status = 'protected';
            console.log('status was changed on "protected"');
        } else {
            console.log('login or password are incorrect');
        }
    };

    this.registerInNetwork = function(network) {
        address = network.getAddress('server', status);
        console.log('my address is ' + address);
    }
};

var User = function() {
    var address;

    this.registerInNetwork = function(network) {
        address = network.getAddress('user');
        console.log('my address is ' + address);
    }
};

var server1 = new Server('admin', 'pass');
server1.setProtected('admin', 'pass');

var myNetwork = new Network('192.168.0');

server1.registerInNetwork(myNetwork);

var user1 = new User();
user1.registerInNetwork(myNetwork);
//
// myNetwork.getAddress('client');
// myNetwork.getAddress('client');
// myNetwork.getAddress('client');
// myNetwork.getAddress('server', 'public');
myNetwork.getListOfClients();

// var myNetwork2 = new Network('192.112.0');
// myNetwork2.getAddress();
