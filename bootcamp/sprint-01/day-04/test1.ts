interface PaymentPersistent {
    id: number;
    sum: number;
    from: string;
    to: string;
}

type Payment = Omit<PaymentPersistent, 'id'>; // removes the 'id' property
type PaymentRequisits = Pick<PaymentPersistent, 'from'|'to'>; // picks only the 'from' and 'to' properties
type ExtractEx = Extract<'from'| 'to' | Payment, string>; // extracts the 'from' and 'to' properties from PaymentPersistent
type ExcludeEx = Exclude<'from'| 'to' | Payment, string>; // excludes the 'from' and 'to' properties from PaymentPersistent