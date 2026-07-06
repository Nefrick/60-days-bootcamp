interface IUserService {
    user: number;
    getUsersInDatabase(): number;
}

class UserService implements IUserService {
    users: number = 1000;

    @Catch({rethrow: false})
    getUsersInDatabase(): number {
        throw new Error("Method not implemented.");
    }
}


function Catch({rethrow} :{rethrow: boolean} = {rethrow: true}) {
    return (
    target: Object,
    _: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
    
    const method = descriptor.value;
    descriptor.value = async(...args: any[]) => {
            try {
                return await method?.apply(target, args);
            } catch (error) {
               if(error instanceof Error) {
                console.error(`Error in method: ${error.message}`);
                if(rethrow) {
                    throw error;
                }
               }
            }
        };
    };
}
console.log(new UserService().getUsersInDatabase()); // Output: 1000