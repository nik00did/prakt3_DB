function Validator(array) {
    this._array = array;

    this.isSignedUp = email => {
        for (let i = 0; i < this._array.length; i++) {
            const temp = this._array[i];

            if (temp._email === email) {
                return true;
            }
        }

        return false;
    };
}

const isInput = value => value !== "" && value && value !== void 0;

Validator.prototype.isValidLogIn = (email, password) => isInput(email) && isInput(password);

Validator.prototype.isValidSignUp = (firstName, lastName, date, email, password, config) => {
    return isInput(firstName) && isInput(lastName) && isInput(date) && isInput(email) && isInput(password) && isInput(config);
};

Validator.prototype.isValidPassword = (password, config) => password === config;

function ValidatorServices(array) {
    this._array = array;

    this.isAdded = type => {
        for (let i = 0; i < this._array.length; i++) {
            const temp = this._array[i];

            if (temp._type === type) {
                return true;
            }
        }

        return false;
    };
}

ValidatorServices.prototype.isValidInputed = (type, price) => {
    return isInput(type) && isInput(price);
};

function ValidatorStore(store) {
    this._store = store;

    this.isAdded = type => {
        for (let i = 0; i < this._store.length; i++) {
            const temp = this._store[i];

            if (temp._type === type) {
                return true;
            }
        }

        return false;
    };
}