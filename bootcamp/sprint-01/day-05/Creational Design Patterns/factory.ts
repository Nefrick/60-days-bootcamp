interface IInsurance {
    id: number;
    name: string;
    status: string;
    setVehicle(vehicle: any): void;
    getVehicle(): string;
    submit(): Promise<boolean>;
}

class TFInsurance implements IInsurance {
    id: number = 0;
    name: string = '';
    status: string = '';
    private vehicle: any;
    setVehicle(vehicle: any): void {
        this.vehicle = vehicle;
    }
    getVehicle(): string {
        return this.vehicle;
    }
  
    async submit(): Promise<boolean> {
        const res = await fetch('https://api.tfinsurance.com/submit', {
            method: 'POST',
            body: JSON.stringify({  
            vehicle: this.vehicle }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.ok;
    }
}

class ABInsurance implements IInsurance {
    id: number = 0;
    name: string = '';
    status: string = '';
    private vehicle: any;
    setVehicle(vehicle: any): void {
        this.vehicle = vehicle;
    }
    getVehicle(): string {
        return this.vehicle;
    }

    async submit(): Promise<boolean> {
        const res = await fetch('https://api.abinsurance.com/submit', {
            method: 'POST',
            body: JSON.stringify({  
            vehicle: this.vehicle }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.ok;
    }
}


abstract class InsuranceFactory {

    protected db: any;

    constructor(db: any) {
        this.db = db;
    }

    abstract createInsurance(): IInsurance;

    saveHistory(insurance: IInsurance): void {
        // Save insurance history to database
        this.db.save(insurance.id ,insurance.name, insurance.status);
    }
}

class TFInsuranceFactory extends InsuranceFactory {
    createInsurance(): TFInsurance {
        return new TFInsurance();
    }
}

class ABInsuranceFactory extends InsuranceFactory {
    createInsurance(): ABInsurance {
        return new ABInsurance();
    }
}

const tfInsuranceFactory = new TFInsuranceFactory(db);
const tfInsurance = tfInsuranceFactory.createInsurance();
tfInsuranceFactory.saveHistory(tfInsurance);


const INSURANCE_TYPE = {
    tf:TFInsurance,
    ab:ABInsurance
};

type IT = typeof INSURANCE_TYPE;

class InsuranceFactoryAlt {
    db: any;

    constructor(db: any) {
        this.db = db;
    }

    createInsurance<T extends keyof IT>(type: T): IT[T] {
         return INSURANCE_TYPE[type];
    }

    saveHistory(insurance: IInsurance): void {
        // Save insurance history to database
        this.db.save(insurance.id ,insurance.name, insurance.status);
    }   
}

const insuranceFactoryAlt = new InsuranceFactoryAlt(db);
const tfInsuranceAlt = new (insuranceFactoryAlt.createInsurance('tf'));
insuranceFactoryAlt.saveHistory(tfInsuranceAlt);