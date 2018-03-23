import AuthorizedUser from './authorizedUser.js';

class Admin extends AuthorizedUser {
    constructor(name) {
        super(name);
        this.type = 'ADMIN_RIGHTS';
    }
}

export default Admin;
