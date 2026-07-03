enum PaymentStatus {
    Holded = "HOLD",
    Processing = "PROCESSING",
    Reversed = "REVERSED",
    Completed = "COMPLETED",
    Pending = "PENDING"
}

class Payment {
    id: number;
    private status: PaymentStatus = PaymentStatus.Pending;
    createdAt: Date = new Date();
    updatedAt?: Date;

    constructor(id: number) {
        this.id = id;
    }

    getPaymentLifeTime(): number {
        return new Date().getTime() - this.createdAt.getTime();
    }

    unholdPayment(): void {
        if (this.status === PaymentStatus.Processing) {
            throw new Error("Payment cannot be unheld. Current status: " + this.status);
        } else {
           this.status = PaymentStatus.Reversed;
           this.updatedAt = new Date();
        }
    }
}
const payment = new Payment(1);
payment.unholdPayment();
console.log(payment);
const time = payment.getPaymentLifeTime();
console.log("Payment lifetime in milliseconds:", time);