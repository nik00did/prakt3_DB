//services
function Service(type, price) {
    this._type = type;
    this._price = price;
}

function Services() {
    this._services = [];
}

Services.prototype.getServices = function () {
    let array = [];

    for (let i = 0; i < this._services.length; i++) {
        array[i] = this._services[i];
    }

    return array;
};

Services.prototype.getServiceByType = function (type) {
    let service = null;

    for (let i = 0; i < this._services.length; i++) {
        if (String(this._services[i]._type) === String(type)) {
            service = this._services[i];
            break;
        }
    }

    return service;
};

Services.prototype.setService = function (service) {
    this._services.push(service);
};

Services.prototype.deleteService = function (id) {
    this._services.filter(service => service._id !== id);
};
//barbers
function Barber(firstName, lastName, email, age, experience, salary, rating) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._age = age;
    this._experience = experience;
    this._salary = salary;
    this._rating = rating;
}

function Barbers() {
    this._barbers = [];
}

Barbers.prototype.getBarbers = function () {
    let array = [];

    for (let i = 0; i < this._barbers.length; i++) {
        array[i] = this._barbers[i];
    }

    return array;
};

Barbers.prototype.getBarberByEmail = function (email) {
    let barber = null;

    for (let i = 0; i < this._barbers.length; i++) {
        if (String(this._barbers[i]._email) === String(email)) {
            barber = this._barbers[i];
            break;
        }
    }

    return barber;
};

Barbers.prototype.setBarber = function (barber) {
    this._barbers.push(barber);
};

Barbers.prototype.deleteBarber = function(email) {
    return this._barbers.filter(barber => barber._email !== email);
};
//users
function User(firstName, lastName, date, email, password, userType) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._date = date;
    this._email = email;
    this._password = password;
    this._userType = userType ? userType : 'user';
}

function Users() {
    this._users = [];
}

Users.prototype.getUsers = function () {
    return this._users;
};

Users.prototype.setUser = function (user) {
    this._users.push(user);
};

Users.prototype.deleteUser = function (email) {
    this._users.filter(user => user.email !== email);
};

function Record(firstName, lastName, email, dateTime, service, barber) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._dateTime = dateTime;
    this._service = service;
    this._barber = barber;
}

function Records() {
    this._records = [];
}

Records.prototype.getRecords = function () {
    let records = [];

    for (let i = 0; i < this._records.length; i++) {
        records.push(this._records[i]);
    }

    return records;
};

Records.prototype.getRecordDateTimeByBarber = function (barberEmail) {
    let dateTime;

    for (let i = 0; i < this._records.length; i++) {
        if (this._records[i]._barber === barberEmail) {
            dateTime = this._records[i]._dateTime;
        }
    }

    return dateTime;
};

Records.prototype.setRecord = function (order) {
    this._records.push(order);
};

Records.prototype.deleteRecord = function (dateTime) {
    this._records.filter(temp => temp._dateTime !== dateTime);
};

function StoreItem(type, price, mark) {
    this._type = type;
    this._price = price;
    this._mark = mark;
}

function Store() {
    this._store = [];
}

Store.prototype.getStore = function () {
    let store = [];

    for (let i = 0; i < this._store.length; i++) {
        store.push(this._store[i]);
    }

    return store;
};

Store.prototype.getStorePriceByType = function (type) {
    let price;

    for (let i = 0; i < this._store.length; i++) {
        if (this._store[i]._type === type) {
            price = this._store[i];
        }
    }

    return price;
};

Store.prototype.getStoreByType = function (type) {
    let storeItem = null;

    for (let i = 0; i < this._store.length; i++) {
        if (String(this._store[i]._type) === String(type)) {
            storeItem = this._store[i];
            break;
        }
    }

    return storeItem;
};

Store.prototype.setStoreItem = function (storeItem) {
    this._store.push(storeItem);
};

Store.prototype.deleteStoreItem = function (type) {
    this._store.filter(temp => temp._type !== type);
};

function Model() {
    this._users = new Users();
    this._barbers = new Barbers();
    this._services = new Services();
    this._records = new Records();
    this._store = new Store();
}