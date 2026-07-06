interface IPaymentAPI {
    getPaymentDetails(id: number): IPaymentDetails | undefined;
}

interface IPaymentDetails {
    id: number;
    sum: number;
}

class PaymentAPI implements IPaymentAPI {

    private payments: IPaymentDetails[] = [
        { id: 1, sum: 100 },
        { id: 2, sum: 200 },
        { id: 3, sum: 300 },
    ];

    getPaymentDetails(id: number): IPaymentDetails | undefined {
        return this.payments.find(payment => payment.id === id);
    }
}

class PaymentAccessProxy {
    constructor(private paymentAPI: IPaymentAPI , private userId: string) {}

    getPaymentDetails(id: number): IPaymentDetails | undefined {
        if (this.userId === 'admin') {
            return this.paymentAPI.getPaymentDetails(id);
        } else {
            console.log('Access denied. Only admin can access payment details.');
            return undefined;
        }
    }
}

const proxy = new PaymentAccessProxy(new PaymentAPI(), 'user');
const paymentDetails = proxy.getPaymentDetails(1);
console.log(paymentDetails); // Output: Access denied. Only admin can access payment details.

const adminProxy = new PaymentAccessProxy(new PaymentAPI(), 'admin');
const adminPaymentDetails = adminProxy.getPaymentDetails(1);
console.log(adminPaymentDetails); // Output: { id: 1, sum: 100 }