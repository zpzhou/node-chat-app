class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        let idx = this.users.findIndex((user) => user.id === id);
        if (idx === -1) {
            return null;
        }
        let removedUser = this.users[idx];
        this.users = this.users.filter((user) => user.id !== id);
        return removedUser;
    }
    getUser(id) {
        let idx = this.users.findIndex((user) => user.id === id);
        return this.users[idx];
    }
    getUsersList(room) {
        return this.users.filter((user) => {
            return user.room === room;
        }).map((user) => {
            return user.name;
        });
    }
    getNumberUsers() {
        return this.users.length;
    }
}

module.exports = {Users};