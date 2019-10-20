//services
function Service() {
    this._type = '';
    this._price = '';
}

function Services() {
    this._listServices = [];
}

Services.prototype.getItem = () => {
    return this._listServices;
};

Services.prototype.setItem = item => {
    this._listServices.push(item);
};

Services.prototype.deleteItem = id => {
    this._listServices.filter(item => item._id !== id);
};
//barbers
function Barber() {
    this._firstName = '';
    this._lastName = '';
    this._age = 0;
    this._experience = 0;
    this._password = '';
}

function Barbers() {
    this._barbers = [];
}

Barbers.prototype.getBarbers = () => {
    return this._barbers;
};

Barbers.prototype.setBarber = barber => {
    this._barbers.push(barber);
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

function Model() {
    this._users = new Users();
    this._barbers = new Barbers();
    this._services = new Services();
}