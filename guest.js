import User from './user.js';

class Guest extends User {
    constructor(name) {
        super(name);
        this.type = 'guest';
    }
}

export default Guest;
