let info : {
    officeId : number,
    isOpen : boolean,
    contact : {
        phone : string,
        email : string,
        address : {
            city : string
        }
    }
}

// Union type
let info2 : {
    officeId : number,  
    isOpen : boolean,
    contact : {
        phone : string, 
        email : string,
        address : {
            city : string
        }
    }
} | null

// ── Union type examples ─────────────────────────────

// 1) A value that can be one of several types
let id : string | number
id = 42
id = "abc-123"

// 2) Literal union — only these exact values are allowed
let taskStatus : "pending" | "active" | "done"
taskStatus = "active"
// taskStatus = "cancelled" // ❌ Error: not part of the union

// 3) Narrowing — checking the type before using it
function printId(value : string | number) {
    if (typeof value === "string") {
        console.log(value.toUpperCase()) // here value is string
    } else {
        console.log(value.toFixed(2))    // here value is number
    }
}

// 4) Discriminated union — a common shape with a "tag" field
type Shape =
    | { kind : "circle", radius : number }
    | { kind : "square", side : number }

function area(shape : Shape) : number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2
        case "square":
            return shape.side ** 2
    }
}

// ── Literal Types ───────────────────────────────────
// A literal type is a type whose only allowed value is one
// exact constant. Instead of "any string" it means "this string".

// 1) String literal — the variable can hold ONLY "GET"
let method : "GET"
method = "GET"
// method = "POST" // ❌ Error: "POST" is not assignable to "GET"

// 2) Number literal — only the exact number 200 is allowed
let successCode : 200
successCode = 200
// successCode = 404 // ❌ Error

// 3) Boolean literal — only true is allowed
let isEnabled : true
isEnabled = true

// On their own a single literal is useless — the power comes
// from combining literals into a UNION (a closed set of values).
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"

function request(url : string, method : HttpMethod) {
    console.log(`${method} ${url}`)
}
request("/users", "POST") // ✅
// request("/users", "PATCH") // ❌ "PATCH" is not a valid HttpMethod

// ── Type widening & `as const` ──────────────────────
// TypeScript "widens" literals to their general type by default.

let a = "GET"        // type is string  (widened, because `let` can change)
const b = "GET"      // type is "GET"   (literal, because `const` can't change)

// With objects, properties are widened too:
let config = { method : "GET" }        // method: string
// `as const` freezes everything to its literal type (readonly):
let config2 = { method : "GET" } as const   // method: "GET" (readonly)

// This makes `as const` handy for passing exact values where a
// literal union is expected:
request("/posts", config2.method) // ✅ config2.method is "GET", not string

// ── Type Aliases ────────────────────────────────────
// A type alias gives a name to a type so you can reuse it
// instead of repeating the same shape everywhere.
// Syntax:  type Name = <any type>

// 1) Alias for an object shape
type User = {
    id : number,
    name : string,
    email : string
}

let user : User = {
    id : 1,
    name : "Ann",
    email : "ann@mail.com"
}

// 2) Alias for a union (reuse the closed set of values by name)
type Id = string | number
type Role = "admin" | "editor" | "viewer"

function findById(id : Id) { /* ... */ }

// 3) Alias for a function type
type Logger = (message : string) => void

const log : Logger = (message) => console.log(message)

// 4) Aliases can be composed and nested
type Contact = {
    phone : string,
    email : string
}

type Employee = {
    id : Id,          // reuse another alias
    role : Role,      // reuse the union alias
    contact : Contact // nest an object alias
}

// 5) Intersection — combine several aliases into one (&)
type Timestamps = {
    createdAt : Date,
    updatedAt : Date
}

type Account = User & Timestamps // has all fields of both

let account : Account = {
    id : 1,
    name : "Ann",
    email : "ann@mail.com",
    createdAt : new Date(),
    updatedAt : new Date()
}

// Note: `type` vs `interface`
// - `type` can alias ANY type: unions, primitives, functions, tuples.
// - `interface` describes object shapes and can be "reopened"/merged.
// For objects both work; use `type` when you need unions or composition.

// ── Interfaces ──────────────────────────────────────
// An interface describes the SHAPE of an object: which
// properties and methods it must have. Syntax uses `interface`
// (no `=` sign, unlike a type alias).

// 1) Basic object shape
interface Person {
    id : number
    name : string
    email? : string          // optional property (may be missing)
    readonly createdAt : Date // can't be reassigned after creation
}

let person : Person = {
    id : 1,
    name : "Ann",
    createdAt : new Date()
}
// person.createdAt = new Date() // ❌ readonly

// 2) Methods inside an interface
interface Repository {
    find(id : number) : Person | null
    save(person : Person) : void
}

// 3) Extending — an interface can inherit from another (or many)
interface Animal {
    name : string
}

interface Dog extends Animal {
    breed : string
}

let dog : Dog = { name : "Rex", breed : "Husky" } // has both fields

// 4) Declaration merging — a feature UNIQUE to interfaces.
// Declaring the same interface twice MERGES the members.
// (A type alias would throw "Duplicate identifier" here.)
interface AppConfig {
    title : string
}
interface AppConfig {
    version : number
}
// AppConfig now has BOTH: { title: string; version: number }
let appConfig : AppConfig = { title : "Bootcamp", version : 1 }

// ── interface vs type: the differences ──────────────
// Both can describe an object, but:
//
//  FEATURE                     interface        type alias
//  ------------------------------------------------------------
//  Object / class shape          ✅               ✅
//  Union types                   ❌               ✅  (A | B)
//  Primitives / tuples / funcs   ❌               ✅
//  Extends / inherits            ✅ extends       ✅ via  &  (intersection)
//  Declaration merging           ✅               ❌
//  Implemented by a class        ✅               ✅
//
// Rule of thumb:
//  - Use `interface` for object/class contracts you may extend.
//  - Use `type` when you need unions, primitives, functions,
//    tuples, or complex composition.

// A class can implement an interface (enforces the contract):
class InMemoryRepository implements Repository {
    private items : Person[] = []

    find(id : number) : Person | null {
        return this.items.find(p => p.id === id) ?? null
    }
    save(person : Person) : void {
        this.items.push(person)
    }
}

// ── void ────────────────────────────────────────────
// `void` means "this function returns no useful value".
// It either has no `return`, or a bare `return;` to exit early.

function logMessage(message : string) : void {
    if (!message) return          // bare return — just exits
    console.log(message)
    // no `return <value>` here
}

// The result of a void function is not meant to be used:
let result = logMessage("hi")     // type of `result` is void — useless

// void vs undefined:
//  - void      → "don't rely on the return value"
//  - undefined → "the value literally is undefined"
function returnsUndefined() : undefined {
    return undefined              // must explicitly return undefined
}

// ── The important rule: void in callback types ──────
// A function returning ANY value is assignable to a `() => void`
// type — the return value is simply ignored. This is what lets
// forEach work with methods like push (which returns a number).
type VoidCallback = () => void

const cb : VoidCallback = () => 42 // ✅ allowed, the 42 is ignored

const numbers : number[] = []
;[1, 2, 3].forEach(n => numbers.push(n)) // push returns number → ignored as void

// But the value TYPED as void still can't be used:
const value = cb()                // type is void; can't use as a number

// ── unknown ─────────────────────────────────────────
// `unknown` is the type-safe counterpart of `any`.
// It accepts ANY value, but you can't USE it until you
// narrow the type with a check. (`any` would allow anything.)

let data : unknown

data = 42          // ✅ you can assign anything
data = "hello"     // ✅
data = { id : 1 }  // ✅

// You CANNOT operate on it directly:
// data.toUpperCase()   // ❌ Error: 'data' is of type 'unknown'
// let n : number = data // ❌ Error: unknown not assignable to number

// You must NARROW it first (type guard):
if (typeof data === "string") {
    console.log(data.toUpperCase()) // ✅ here TS knows data is string
}

// any vs unknown — the key difference:
let anyValue : any = "text"
anyValue.foo.bar()        // ✅ no error (unsafe! crashes at runtime)

let unknownValue : unknown = "text"
// unknownValue.foo.bar() // ❌ compile error — forces you to check first

// Typical use: values from outside your control (JSON, API, catch)
function parse(json : string) : unknown {
    return JSON.parse(json) // we don't know the shape → unknown, not any
}

try {
    // ...
} catch (err : unknown) {          // errors are `unknown` in modern TS
    if (err instanceof Error) {
        console.log(err.message)   // ✅ narrowed to Error
    }
}

type paymentAction = "checkout" | "refund" | "reject"

function processAction(action : paymentAction) {
    switch (action) {
        case "checkout":
            //...
            break;
        case "refund":
            //...   
            break;
        case "reject":
            //...
            break;
        default:
            const _exhaustiveCheck : never = action
            throw new Error(`Unhandled action: ${_exhaustiveCheck}`)
        }
}

// ── Type Guards ─────────────────────────────────────
// A type guard is a check that tells TypeScript the more
// specific type of a value inside a block. After the check,
// TS "narrows" the type and lets you use the matching members.
// There are 4 common forms:

// 1) typeof — for primitives (string, number, boolean, symbol...)
function format(value : string | number) : string {
    if (typeof value === "number") {
        return value.toFixed(2)     // narrowed to number
    }
    return value.trim()             // narrowed to string
}

// 2) instanceof — for class instances
class ApiError extends Error {
    constructor(public status : number, message : string) {
        super(message)
    }
}

function handle(err : unknown) {
    if (err instanceof ApiError) {
        console.log(err.status)     // narrowed to ApiError
    } else if (err instanceof Error) {
        console.log(err.message)    // narrowed to Error
    }
}

// 3) `in` operator — checks a property exists on the object.
// Useful for distinguishing object shapes without a "kind" tag.
type Cat = { meow : () => void }
type Dogg = { bark : () => void }

function speak(animal : Cat | Dogg) {
    if ("meow" in animal) {
        animal.meow()               // narrowed to Cat
    } else {
        animal.bark()               // narrowed to Dogg
    }
}

// 4) Custom (user-defined) type guard — a function returning
//    `param is Type`. The return type IS the type predicate that
//    teaches TS how to narrow. This is the most powerful form.
type Admin = { role : "admin", permissions : string[] }
type Guest = { role : "guest" }

function isAdmin(user : Admin | Guest) : user is Admin {
    return user.role === "admin"
}

function showPanel(user : Admin | Guest) {
    if (isAdmin(user)) {
        console.log(user.permissions) // ✅ narrowed to Admin via the guard
    }
}

// Practical use: validating `unknown` data from an API
function isString(value : unknown) : value is string {
    return typeof value === "string"
}

function greet(input : unknown) {
    if (isString(input)) {
        console.log(input.toUpperCase()) // safe — narrowed from unknown
    }
}


// Type Guards

enum PaymentStatus {
    Success = "SUCCESS",
    Failed = "FAILED"
}

interface IPayment {
    amount : number,
    currency : string
}

interface IPaymentRequest extends IPayment {}

interface IDataSuccess extends IPayment {
    databaseId : number;
}

interface IDataFailed {
    errorMessage : string;
    errorCode : number;
}

interface IResponseSuccess {
    status : PaymentStatus.Success;
    data : IDataSuccess;
}

interface IResponseFailed {
    status : PaymentStatus.Failed;
    data : IDataFailed;
}

type Res = IResponseSuccess | IResponseFailed;

function isResponseSuccess(response : Res) : response is IResponseSuccess {
    return response.status === PaymentStatus.Success
}

function handlePaymentResponse(response : Res): number {
    if (isResponseSuccess(response)) {
        return response.data.databaseId;
    } else {
        throw new Error(`Payment failed: ${response.data.errorMessage} (code: ${response.data.errorCode})`);
    }
}

// ── Assertion Functions (`asserts`) ─────────────────
// A type guard RETURNS a boolean and you branch on it (if/else).
// An assertion function THROWS if the condition is false, and
// otherwise TELLS TypeScript the type is guaranteed AFTER the call —
// no `if` needed. The magic is the `asserts` keyword in the return type.

// Form 1:  asserts condition
// If it doesn't throw, TS trusts that `condition` is true afterwards.
function assert(condition : unknown, message : string) : asserts condition {
    if (!condition) {
        throw new Error(message)
    }
}

function getLength(value : string | null) : number {
    assert(value !== null, "value must not be null")
    // After the assert, TS narrows `value` to string — no null check needed:
    return value.length
}

// Form 2:  asserts x is Type
// Narrows a value to a specific type for the rest of the scope.
function assertIsString(value : unknown) : asserts value is string {
    if (typeof value !== "string") {
        throw new Error("Not a string")
    }
}

function shout(input : unknown) {
    assertIsString(input)
    // From here on `input` is `string` for the whole scope:
    console.log(input.toUpperCase())
}

// Type guard vs assertion function — same goal, different control flow:
//   guard:      if (isString(x)) { ...x is string only inside the if... }
//   assertion:  assertIsString(x);  ...x is string for the rest of the scope...
// Use a guard when you want to handle both cases (if/else).
// Use an assertion when the "wrong" case should just abort (throw).

// ── Related assertions (not the `asserts` keyword) ──

// `as` — type assertion: YOU tell TS the type. No runtime check!
// Use only when you know more than the compiler (e.g. DOM, casting).
const el = document.getElementById("app") as HTMLInputElement
// el.value  // TS now treats it as an input — but it's unchecked, be careful

// `!` — non-null assertion: "trust me, this isn't null/undefined".
// Also unchecked; prefer a real check or an assertion function instead.
function firstChar(text : string | undefined) : string {
    return text!.charAt(0) // `!` removes undefined — unsafe if actually undefined
}