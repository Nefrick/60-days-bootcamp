interface Data {
    group: number;
    name: string;
}

const data: Data[] = [
    { group: 1, name: 'Alice' },
    { group: 2, name: 'Bob' },
    { group: 1, name: 'Charlie' },
    { group: 2, name: 'David' },
    { group: 1, name: 'Eve' },
];

interface IGroup<T> {
    [key: string]: T[];
}

interface IGroupedData {
    [key: number]: string[];
}

type key = string | number | symbol;

function group<T extends Record<key, any>>(array: T[], key: keyof T): IGroup<T> {
    return array.reduce<IGroup<T>>((map: IGroup<T>, item) => {
        const itemKey = item[key];
        let curEl = map[itemKey];
        if(Array.isArray(curEl)) {
            curEl.push(item);
        } else {
            curEl = [item];
        }
        map[itemKey] = curEl;
        return map;
    }, {});
}


function groupData<T extends Data>(data: T[]): IGroupedData {
    return data.reduce((acc: IGroupedData, item: T) => {
        if (!acc[item.group]) {
            acc[item.group] = [];
        }
        acc[item.group].push(item.name);
        return acc;
    }, {});
}

const grouped = groupData(data);
console.log(grouped);

const res = group<Data>(data, 'group');
console.log(res);

const user = { group: 1, name: 'Frank' };

type keyofUser = keyof typeof user; // "group" | "name"

enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}

type DirectionKeys = keyof typeof Direction; // "Up" | "Down" | "Left" | "Right"

const roles = ['admin', 'user', 'guest'] as const;
type Role = typeof roles[number]; // "admin" | "user" | "guest"

interface Permission {
    endDate: Date;
}

interface User {
    name: string;
    age: number;
    roles: Role[];
    permissions: Permission;
   
}

const user2: User = {
    name: 'Grace',
    age: 30,
    roles: [],
    permissions: {
        endDate: new Date('2024-12-31'),
    },
    
}
const nameUser = user2['name']; // string
const ageUser = user2['age'];
type UserKeys = keyof User; // "name" | "age" | "roles" | "permissions"
type rolesType = User['roles']; // []
type rolesType2 = User[typeof roleName]; // []
let roleName: 'roles' = 'roles'; // Valid assignment

type toleType = User['roles'][number]; // "admin" | "user" | "guest"
type dateType = User['permissions']['endDate']; // Date