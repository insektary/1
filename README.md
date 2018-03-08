Class Network

Creates a new network. Class takes two arguments:
1. name - name of network - string type
2. address - ip address of network in format 'XXX.XXX.XXX' - string type

Instance of class has one conditionally-public method:
1. getListOfClients() - show all registered servers and users, his ip-addresses and private status
This method used for supervision and debug only
Others methods are system-wide and are called other classes


Classes: Guest, AuthorizedUser, Admin

Creates a new user. Class takes one argument - name of user - string type
Classes has three conditionally-public methods:
1. registerInNetwork(network) - send a network request to receive IP-address.
This method takes one argument - link to the network, object type.
2. exitTheNetwork(network) - log out of the network. This method takes one argument - link to the network.
3. requestToServer(server, requestInfo) - multifunctional method. Method send network request for 
redirect to the required server and send instructions to this server. Method takes two arguments:
    1. server - name of the required server, string type.
    2. requestInfo - object containing details of the request. The object contains two types of properties: common 
    for all users and specific for each type
    A common property in 'instruction'. Below are the types of instructions, associated properties and types of users 
    that support them
    
1. 'reset'. Reloads the target server. Does not require additional parameters. Supported only by type 'Admin'.
2. 'logIn'. Sends an authorization request. Requires a parameter 'login'(string type). Supported all of the types users.
3. 'rebase'. Change the network address of the server to another if it is available. Requires a parameter
 'wishAddress'(number type) - desired new server address. Supported only by type 'Admin'.
4. 'toBlackList'. Prevents the user from accessing the server. Requires a parameter 'userForBlackList'(string type).
Supported only by type 'Admin'.
5. 'showClients' Show list of all clients. Shows a list of all clients of this server. 
Does not require additional parameters. Supported only by type 'Admin'.
        
    
    
Class PublicServer

Creates a new server. Class takes one argument - name of server - string type
Class has one public method:
1. registerInNetwork(network) - send a network request to receive IP-address. Received address are saved in property 'address'.
This method takes one argument - link to the network.


Class ProtectedServer

This class is similar to the PublicServer, but it does not accept requests from the users 'Guest' type.
