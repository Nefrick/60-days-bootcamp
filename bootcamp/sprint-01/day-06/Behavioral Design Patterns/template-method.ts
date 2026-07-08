class Form {
    constructor(private name: string, private email: string, private password: string) {}
}

abstract class SaveForm<T> {

    public save(form: Form): void {

        const filledForm = this.fill(form);
        this.log(filledForm);
        this.send(filledForm);
        console.log(`Saving form for ${filledForm}`);
    }

    protected abstract fill(form: Form): T;

    protected log(data: T): void {
        console.log(`Log: ${data}`);
    }

    protected abstract send(data: T): void;
}

class FirstAPI extends SaveForm<string> {
    protected fill(form: Form): string {
        return `FirstAPI filled form with name: ${form['name']}, email: ${form['email']}, password: ${form['password']}`;
    }

    protected send(data: string): void {
        console.log(`FirstAPI sending data: ${data}`);
    }
}

class SecondAPI extends SaveForm<string> {
    protected fill(form: Form): string {
        return `SecondAPI filled form with name: ${form['name']}, email: ${form['email']}, password: ${form['password']}`;
    }
    
    protected send(data: string): void {
        console.log(`SecondAPI sending data: ${data}`);
    }
}

// Example usage
const form = new Form('John Doe', 'john.doe@example.com', 'password123');
const firstAPI = new FirstAPI();
firstAPI.save(form);

const secondAPI = new SecondAPI();
secondAPI.save(form);