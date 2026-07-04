interface IForm {
    name: string;
    password: string;
}

const form: IForm = {
    name: 'John Doe',
    password: 'password123'
};

const formValidation: Validation<IForm> = {
    name: {isValid: true},
    password: {isValid: false, errorMessage: 'Password must be at least 8 characters long'}
};

type Validation<T>  = {
    [K in keyof T]: {
        isValid: true;
    } | {
        isValid: false;
        errorMessage: string;
    }
};