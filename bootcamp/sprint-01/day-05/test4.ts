interface IUserService {
    user: number;
    getUsersInDatabase(): number;
}


class UserService implements IUserService {
    @MaxUsers(100)
    users: number = 0;

    getUsersInDatabase(): number {
        throw new Error("Method not implemented.");
    }
}


function MaxUsers(max: number) {
    return (
    target: Object,
    propertyKey: string | symbol,
)  => {
   let value: number;
   const getter = () => value;
   const setter = (newValue: number) => {
    if (newValue > max) {
        console.error(`Value exceeds maximum of ${max}`);
        return;
    }
    value = newValue;
   }
   Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
   });
}
}

const userService = new UserService();
userService.users = 15; 
console.log(userService.users); // Output: 15
userService.users = 1511;
console.log(userService.users); // Output: Error: Value exceeds maximum of 100 