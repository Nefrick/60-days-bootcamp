const data = [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Bob", age: 25 },
  { id: 3, name: "Charlie", age: 35 },
];

interface Person {
  id: number;
  name: string;
  age: number;
};

function sortByIdIncAndDec<T extends Person>(data: T[], type: 'asc' | 'desc' = 'asc', idOrAge: 'id' | 'age' = 'id'
): T[] {
    return data.sort((a, b) => {
        if (idOrAge === 'id') {
            return type === 'asc' ? a.id - b.id : b.id - a.id;
        } else {
            return type === 'asc' ? a.age - b.age : b.age - a.age;
        }
    });
}

console.log("Sorted by ID (ascending):", sortByIdIncAndDec(data, 'asc', 'id'));
console.log("Sorted by ID (descending):", sortByIdIncAndDec(data, 'desc', 'id'));
console.log("Sorted by Age (ascending):", sortByIdIncAndDec(data, 'asc', 'age'));
console.log("Sorted by Age (descending):", sortByIdIncAndDec(data, 'desc', 'age'));

// --- Вариант 1: pluck — достаёт значения ОДНОГО поля ---
// K ограничен ключами T, поэтому "email" сюда не передашь.
// Возвращаемый тип T[K][] зависит от переданного ключа.
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
    return items.map(item => item[key]);
}

const names = pluck(data, "name"); // string[]
const ages  = pluck(data, "age");  // number[]
const ids   = pluck(data, "id");   // number[]

console.log("Pluck names:", names);
console.log("Pluck ages:", ages);
console.log("Pluck ids:", ids);

// --- Вариант 2: pluckMany — оставляет НАБОР полей у каждого объекта ---
// keys: K[] — массив ключей; Pick<T, K> — тип объекта только с этими полями.
function pluckMany<T, K extends keyof T>(items: T[], keys: K[]): Pick<T, K>[] {
    return items.map(item => {
        const result = {} as Pick<T, K>;
        for (const key of keys) {
            result[key] = item[key];
        }
        return result;
    });
}

const idsAndNames = pluckMany(data, ["id", "name"]); // { id: number; name: string }[]

console.log("Pluck many (id + name):", idsAndNames);