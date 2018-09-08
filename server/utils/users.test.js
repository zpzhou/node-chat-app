const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'user1',
            room:  'room1'
        }, {
            id: '2',
            name: 'user2',
            room:  'room1'
        }, {
            id: '3',
            name: 'user3',
            room:  'room2'
        }];
    });
    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: 'test_id',
            name: 'test_name',
            room: 'test_room'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.getUser('test_id')).toEqual(resUser);
    });
    it('should return users for specified room', () => {
        let userList = users.getUsersList('room1');
        expect(userList.length).toBe(2);
        expect(userList[0]).toBe('user1');
        expect(userList[1]).toBe('user2');
    });
    it('should find specified user', () => {
        let targetUser = users.getUser('1');
        let foundUser= users.removeUser('1');
        expect(foundUser).toEqual(targetUser);
    });
    it('should not find specified user', () => {
        let user = users.removeUser('mockId');
        expect(user).toBeFalsy();
    });
    it('should remove specified user', () => {
        let targetUser = users.getUser('1');
        let removedUser = users.removeUser('1');
        expect(removedUser).toEqual(targetUser);
        expect(users.getNumberUsers()).toBe(2);
    });
    it('should not remove specified user', () => {
        let removedUser = users.removeUser('mockId');
        expect(removedUser).toBeFalsy();
        expect(users.getNumberUsers()).toBe(3);
    });
});