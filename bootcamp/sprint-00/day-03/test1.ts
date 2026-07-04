const a1: number = Math.random() > 0.5 ? 1 : 0;

interface HTTPResponse<T extends 'success' | 'failed'> {
    code: number;
    data: T extends 'success' ? string  : Error;
}

const suc: HTTPResponse<'success'> = {
    code: 200,
    data: 'Operation successful'
};

const err: HTTPResponse<'failed'> = {
    code: 500,
    data: new Error('Internal Server Error')
};

class User {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

class UserPersistence extends User {
    dbID: string;

    constructor(dbID: string) {
        super(0, '');
        this.dbID = dbID;
    }
}



function getUser(id: number): User;
function getUser(dbId: string): UserPersistence;
function getUser(dbIdOrID: string | number): User | UserPersistence {
    if (typeof dbIdOrID === 'string') {
        return new UserPersistence(dbIdOrID);
    } else {
        return new User(dbIdOrID, 'John Doe');
    }
}

type UserOrUserPersistence<T extends string | number> = T extends string ? UserPersistence : User;

function getUserNew<T extends string | number>(id: T): UserOrUserPersistence<T> {
    if (typeof id === 'string') {
        return new UserPersistence(id) as UserOrUserPersistence<T>;
    } else {
        return new User(id, 'John Doe') as UserOrUserPersistence<T>;
    }
}