const Dao = require('../dao');
const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    type: {
        type: String,
    },
    price: {
        type: String,
    },
    mark: {
        type: String,
    },
});

function StoreDaoMongoDB() {
    this._collection = null;
    this._model = null;
}

StoreDaoMongoDB.prototype = Object.create(Dao.prototype);
StoreDaoMongoDB.prototype.constructor = StoreDaoMongoDB;

StoreDaoMongoDB.prototype.init = function () {
    if (this._collection) {
        return;
    }

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/HearStyle', { useNewUrlParser: true });
    this._collection = true;
    this._model = mongoose.model('store', storeSchema);
};

StoreDaoMongoDB.prototype.getAllStore = async function () {
    return await this._model.find({}, (err, data) => {
        // console.log(data);
    });
};

StoreDaoMongoDB.prototype.getStoreItem = async function (type) {
    return await this._model.findOne({type});
};

StoreDaoMongoDB.prototype.setStoreItem = async function (object) {
    await this._model.create({
        type: object._type,
        price: object._price,
        mark: object._mark,
    });
};

StoreDaoMongoDB.prototype.updateStoreItem = async function (type, newPrice) {
    await this._model.findOne({type}, (err, doc) => {
        doc.price = newPrice;
        doc.save();
    });
};


StoreDaoMongoDB.prototype.deleteStoreItem = async function (type) {
    await this._model.remove({type});
};

module.exports = StoreDaoMongoDB;