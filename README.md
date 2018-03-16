This project emulates the operation of a computer network
==========================================================

**Run application** 
```
npm run start
```

API Reference
================

* ### Class Network
------------------------
#### Network([name], [address])
Create new Network.
**Kind:** constructor

| Param | Type | Description |
| --- | --- | --- |
| [name] | string | name of network |
| [address] | string | ip address of network in format "XXX.XXX.XXX" |


#### getListOfClients()
Show all registered servers and users, his ip-addresses and private status
**Kind:** method


* ### Classes Guest([name]), AuthorizedUser([name]), Admin([name])
-----------------------------------------------------------------------
Create a new user of type 'guest', 'authorized user' or 'admin' respectively
**Kind:** constructor

| Param | Type | Description |
| --- | --- | --- |
| [name] | string | name of user |

#### Common methods
------------------------

#### registerInNetwork([network])
Send a network request to receive IP-address.
**Kind:** method

| Param | Type | Description |
| --- | --- | --- |
| [network] | object | link to a network |

#### exitTheNetwork([network]) 
Log out of the network.
**Kind:** method

| Param | Type | Description |
| --- | --- | --- |
| [name] | object | link to a network |

#### Specific methods
------------------------

#### requestToServer([server], [requestInfo])
Multifunctional method. Method send network request for redirect to the required server and send instructions to this server.
**Kind:** method

| Param | Type | Description |
| --- | --- | --- |
| [name] | string | name of the required serve |
| requestInfo | object | object containing details of the request |

##### Properties of the requestInfo

| Property | Type | Authorized user |
| --- | --- | --- |
| "instruction" | string | **look below** |
| "login" | string | login for authorization |
| "wishAddress" | number | desired new address |
| "userForBlackList" | string | username you want to deny access to |


* Options of the "instruction" property

|  | Guest | Authorized user | Admin | description |
| --- | --- | --- | --- | --- |
| "reset" | --- | --- | * | Reloads the target server |
| "logIn" | * | * | * | Sends an authorization request. Requires a parameter 'login' |
| "rebase" | --- | --- | * | Change the network address of the server to another if it is available|
| "toBlackList" | --- | --- | * | revents the user from accessing the server. Requires a parameter 'userForBlackList' |
| showClients | --- | * | * | Shows a list of all clients of this server |

* ### Classes PublicServer([name])
-----------------------------------------------------------------------
Create a new server of 'public' type
**Kind:** constructor

| Param | Type | Description |
| --- | --- | --- |
| [name] | string | name of server |

#### registerInNetwork([network])
Send a network request to receive IP-address
**Kind:** method

| Param | Type | Description |
| --- | --- | --- |
| [network] | object | link to a network |
    
* ### Classes ProtectedServer([name])
-----------------------------------------------------------------------
Create a new server of 'public' type
**Kind:** constructor

**This class is similar to the PublicServer, but it does not accept requests from the users 'Guest' type.**