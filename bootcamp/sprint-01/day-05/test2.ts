interface IUserService {
    user: number;
    getUsersInDatabase(): number;
}

class UserService implements IUserService {
    users: number = 1000;

    @Log()
    getUsersInDatabase(): number {
        throw new Error("Method not implemented.");
    }
}


function Log() {
    return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
    const originalMethod = descriptor.value;
    console.log(target, propertyKey, descriptor);
    descriptor.value = (...args: any[]) => {
        console.log(`Calling ${String(propertyKey)} with arguments:`, args);
    }
}
}
console.log(new UserService().getUsersInDatabase()); // Output: 1000