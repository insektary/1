Class Network

Creates a new network. Class takes two arguments:
1. name - name of network - string type
2. address - ip address of network in format 'XXX.XXX.XXX' - string type

Instance of class has one conditionally-public method:
1. getListOfClients() - show all registered servers and users, his ip-addresses and private status
This method used for supervision and debug only
Others methods are system-wide and are called other classes


Class User

Creates a new user. Class takes one argument - name of user - string type
Class has three conditionally-public methods:
1. registerInNetwork(network) - send a network request to receive IP-address. Received address are saved in property 'address'.
This method takes one argument - link to the network.
2. exitTheNetwork(network) - log out of the network. This method takes one argument - link to the network.
3. requestToServer(server, instruction, target, login, password) - multifunctional method. Method send network request for 
redirect to the required server and send instructions ti this server. Method takes five arguments:
    1. server - name of the required server, string type.
    2. instruction - instruction to the server. String type. May be next:
        1. logIn. Request to sign in on required server. If server is protected, need to specify login and password.
        2. reset. This instruction reboot required server.
        3. rebase. This instruction is rebase required server on new address. New address input in field 'target'.
        this instructions need to admin's access.
        4. showClients. This instructions show all clients of this server.
    3 - 4(optionality). login and password. Login and password to administrator rights.
    
    
Class Server

Creates a new server. Class takes one argument - name of user - string type
Class has one public method:
1. registerInNetwork(network) - send a network request to receive IP-address. Received address are saved in property 'address'.
This method takes one argument - link to the network.
