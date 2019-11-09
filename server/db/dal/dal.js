const BarbersDaoMongoDB = require('./dao/mongoDB/barbersDaoMongoDB');
const UsersDaoMongoDB = require('./dao/mongoDB/usersDaoMongoDB');
const ServicesDaoMongoDB = require('./dao/mongoDB/servicesDaoMongoDB');
const RecordsDaoMongoDB = require('./dao/mongoDB/recordsDaoMongoDB');
const StoreDaoMongoDB = require('./dao/mongoDB/storeDaoMongoDB');

function Dal () {
    this._barbersDal = null;
    this._usersDal = null;
    this._servicesDal = null;
    this._recordsDal = null;
    this._storeDal = null;
}

Dal.prototype.init = function () {
    this._barbersDal = new BarbersDaoMongoDB();
    this._barbersDal.init();

    this._usersDal = new UsersDaoMongoDB();
    this._usersDal.init();

    this._servicesDal = new ServicesDaoMongoDB();
    this._servicesDal.init();

    this._recordsDal = new RecordsDaoMongoDB();
    this._recordsDal.init();

    this._storeDal = new StoreDaoMongoDB();
    this._storeDal.init();
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

Dal.prototype.updateBarber = async function (email, newSalary) {
    await this._barbersDal.updateBarber(email, newSalary);
};

Dal.prototype.deleteBarber = async function (email) {
    await this._barbersDal.deleteBarber(email);
};

Dal.prototype.getAllServices = async function () {
    return await this._servicesDal.getAllServices();
};

Dal.prototype.getService = async function (type) {
    return await this._servicesDal.getBarber(type);
};

Dal.prototype.setService = async function (object) {
    await this._servicesDal.setBarber(object);
};

Dal.prototype.updateService = async function (type, newPrice) {
    await this._servicesDal.updateService(type, newPrice);
};

Dal.prototype.deleteService = async function (type) {
    await this._servicesDal.deleteService(type);
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

Dal.prototype.getAllRecords = async function () {
    return await this._recordsDal.getAllRecords();
};

Dal.prototype.getRecordByDateTime = async function (dateTime) {
    return await this._recordsDal.getRecordByDateTime(dateTime);
};

Dal.prototype.setRecord = async function (object) {
    await this._recordsDal.setRecord(object);
};

Dal.prototype.getAllStore = async function () {
    return await this._storeDal.getAllStore();
};

Dal.prototype.getStoreItem = async function (type) {
    return await this._storeDal.getStoreItem(type);
};

Dal.prototype.setStoreItem = async function (object) {
    await this._storeDal.setStoreItem(object);
};

Dal.prototype.updateStoreItem = async function (type, newPrice) {
    await this._storeDal.updateStoreItem(type, newPrice);
};

Dal.prototype.deleteStoreItem = async function (type) {
    await this._storeDal.deleteStoreItem(type);
};

module.exports = Dal;