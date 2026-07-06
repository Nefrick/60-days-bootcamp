interface Prototype<T> {
    clone(): T;
}

class UserHistory implements Prototype<UserHistory> {

    createAte: Date = new Date();

    constructor(public email: string, public name: string) { 
        this.createAte = new Date();
    }

    clone(): UserHistory {
        let target = new UserHistory(this.email, this.name);
        target.createAte = this.createAte;
        return target;
    }   
}


let userHistory = new UserHistory('a@tes.com', 'Alex');
console.log(userHistory);
let userHistory2 = userHistory.clone();
console.log(userHistory2);