const BarbersDaoMongoDB = require('./dao/mongoDB/barbersDaoMongoDB');
const UsersDaoMongoDB = require('./dao/mongoDB/usersDaoMongoDB');

function Dal () {
    this._barbersDal = null;
    this._usersDal = null;
}

Dal.prototype.init = function () {
    // this._barbersDal = new BarbersDaoMongoDB();
    // this._barbersDal.init();

    this._usersDal = new UsersDaoMongoDB();
    this._usersDal.init();
};

Dal.prototype.getAllBarbers = async function () {
    return await this._barbersDal.getAllBarbers();
};

Dal.prototype.getBarber = async function (email) {
    return await this._barbersDal.getBarber(email);
};

Dal.prototype.setBarber = async function (object) {
    await this._barbersDal.setBarber(object);
};

Dal.prototype.getAllUsers = async function () {
    return await this._usersDal.getAllUsers();
};

Dal.prototype.getUser = async function (email) {
    return await this._usersDal.getUser(email);
};

Dal.prototype.setUser = async function (object) {
    await this._usersDal.setUser(object);
};

module.exports = Dal;