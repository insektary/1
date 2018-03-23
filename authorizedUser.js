import User from './user.js';

class AuthorizedUser extends User {
    constructor(name) {
        super(name);
        this.type = 'authorizedUser';
    }
}

export default AuthorizedUser;
