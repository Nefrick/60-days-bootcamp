class Payment {
    private date: Date = new Date();

    getDate(this: Payment): Date {
        return this.date;
    }

    getDateArrow = (): Date => {
        return this.date;
    }

}

const p = new Payment();

const user = {
    id: 1,
    name: "John Doe",
    paymentDate: p.getDate.bind(p),
    paymentDateArrow: p.getDateArrow
};
console.log(p.getDate()); // This will work correctly and return the date
console.log(user.paymentDate()); // This will throw an error because 'this' is undefined in getDate
console.log(user.paymentDateArrow()); // This will work correctly and return the date because 'this' is bound to the instance of Payment in getDateArrow