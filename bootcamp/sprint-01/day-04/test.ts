interface User {
    name: string;
    age?: number;
    email: string;
}

type PartialUser = Partial<User>; // makes all properties optional
const user1: PartialUser = {};

type RequiredUser = Required<User>; // makes all properties required

type ReadonlyUser = Readonly<User>; // makes all properties readonly

type requiredAndReadonlyUser = Required<Readonly<User>>; // makes all properties required and readonly