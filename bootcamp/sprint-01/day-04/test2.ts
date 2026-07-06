class User {
    constructor( id: number, public name: string, public email: string, public age?: number) {
        
    }
}

function getData(id: number): User {
    return new User(id, 'John Doe', 'john.doe@example.com', 30);
} 

type RT = ReturnType<typeof getData>; // infers the return type of the getData function
type RT2 = ReturnType<() => void>; // infers the return type of the getData function

type PT = Parameters<typeof getData>; // infers the parameter types of the getData function
type RT3 = ReturnType<<T>() => T>; // infers the return type of the getData function
type RT4 = ReturnType<<T extends string>() => T>; // infers the return type of the getData function

type firstParam = PT[0]; // infers the type of the first parameter of the getData function

type UserConstructorParams = ConstructorParameters<typeof User>; // infers the constructor parameter types of the User class