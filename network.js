var Network = function(networkAddress) {
    this.networkAddress = networkAddress;

    var listOfClients = {};

    this.getAddress = function(typeOfClient) {
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

        listOfClients[newAddress] = {type: typeOfClient};
        console.log('Your address is ' + networkAddress + '.' + newAddress);
    };

    this.removeClient = function(clientIP) {
        var address = clientIP.split('.')[3];
        delete(listOfClients[address]);
    };

    this.getListOfClients = function() {
        for (var key in listOfClients) {
            console.log(networkAddress + '.' + key + ' ' + listOfClients[key].type);
        }
    }


};

var myNetwork = new Network('192.168.0');

myNetwork.getAddress('client');
myNetwork.getAddress('client');
myNetwork.getAddress('client');
myNetwork.getAddress('server');
myNetwork.getListOfClients();

// var myNetwork2 = new Network('192.112.0');
// myNetwork2.getAddress();
