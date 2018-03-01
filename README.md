class Network

Creates a new network. Class takes two arguments:
1. name - name of network - string type
2. address - ip address of network in format 'XXX.XXX.XXX' - string type

Instance of class has one conditionally-public method:
1. getListOfClients() - show all registered servers and users, his ip-addresses and private status
This method used for supervision and debug only
Othes methods are system-wide and are called other classes


class User

Creates a new user. Class takes one argument - name of user - string type
Class has three conditionally-public methods:
1. registerInNetwork(network) - send a network request to receive IP-address. Received address are saved in property 'address'.
This method takes one argument - link to the network.
2. exitTheNetwork(network) - log out of the network. This method takes one argument - link to the network.
3. requestToServer(network, server, action, login, password) - multifunctional method. Method send network request for 
redirect to the required server and send instructions ti this server. Method takes five arguments:
    1. network - link to the required network.
    2. server - name of the required server, string type.
    3. action - instruction to the server. String type. May be next:
        1. signIn. Request to sign in on required server. If server is protected, need to specify login and password.
        2. turnOff. This instruction turn off required server and log out it on the network.
        3 - 4. setPublic and setProtected. Set required server status as 'public' or 'protected' respectively.
        this instructions need to specify login and password.
    4 - 5(optionality). login and password. Login and password to administrator rights.
    
    
Class Server

Creates a new server. Class takes one argument - name of user - string type
Class has one public method:
1. registerInNetwork(network) - send a network request to receive IP-address. Received address are saved in property 'address'.
This method takes one argument - link to the network.
2. Also class has two conditionally-public methods:
    1. showMyNetworks() - shows all networks in which the server is registered.
    2. showMyUsers() - shows all users registered on this server, his statuses(admin or guest), names and addresses
    This method used for supervision and debug only
