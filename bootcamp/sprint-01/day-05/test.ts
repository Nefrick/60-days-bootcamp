interface IUserService {
    user: number;
    getUsersInDatabase(): number;
}

//@nullUser
@setUsers(5)
@log()
//@setUsersAdvanced(10)
//@threeUserAdvanced
class UserService implements IUserService {
    users: number = 1000;

    getUsersInDatabase(): number {
        return this.users;
    }
}

function nullUser(target: Function) {
    target.prototype.users = 0;
    return target;
}

function setUsers(users: number) {
    console.log('setUsers init');
    return function (target: Function) {
        console.log('setUsers called');
        target.prototype.users = users;
    }
}

function log() {
    console.log('log init');
    return function (target: Function) {
        console.log('log called');
    }
}

function setUsersAdvanced(users: number) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            users = users;
        }
    }
}

function threeUserAdvanced<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        users = 3;
    }
}

console.log(new UserService().getUsersInDatabase()); // Output: 5
//console.log(new (nullUser(UserService))().getUsersInDatabase()); // Output: 0