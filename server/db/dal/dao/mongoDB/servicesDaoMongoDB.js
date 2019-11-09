const Dao = require('../dao');
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    type: {
        type: String,
    },
    price: {
        type: String,
    },
});

function ServicesDaoMongoDB () {
    this._collection = null;
    this._model = null;
}

ServicesDaoMongoDB.prototype = Object.create(Dao.prototype);
ServicesDaoMongoDB.prototype.constructor = ServicesDaoMongoDB;

ServicesDaoMongoDB.prototype.init = function () {
    if (this._collection) {
        return;
    }

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/HearStyle');
    this._collection = true;
    this._model = mongoose.model('services', serviceSchema);
};

ServicesDaoMongoDB.prototype.setBarber = async function (object) {
    await this._model.create({
        type: object._type,
        price: object._price,
    });
};

ServicesDaoMongoDB.prototype.getAllServices = async function () {
    return await this._model.find({});
};

ServicesDaoMongoDB.prototype.getService = async function (type) {
    return await this._model.findOne({type});
};

ServicesDaoMongoDB.prototype.updateService = async function (type, newPrice) {
    await this._model.findOne({type}, (err, doc) => {
        doc.price = newPrice;
        doc.save();
    });
};

ServicesDaoMongoDB.prototype.deleteService = async function (type) {
    await this._model.remove({type});
};

module.exports = ServicesDaoMongoDB;