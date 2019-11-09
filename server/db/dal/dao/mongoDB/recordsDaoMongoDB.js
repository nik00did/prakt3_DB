const Dao = require('../dao');
const mongoose = require('mongoose');

const recordsSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    dateTime: {
        type: String,
    },
    service: {
        type: String,
    },
    barber: {
        type: String,
    },
});

function RecordsDaoMongoDB () {
    this._collection = null;
    this._model = null;
}

RecordsDaoMongoDB.prototype = Object.create(Dao.prototype);
RecordsDaoMongoDB.prototype.constructor = RecordsDaoMongoDB;

RecordsDaoMongoDB.prototype.init = function () {
    if (this._collection) {
        return;
    }

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/HearStyle');
    this._collection = true;
    this._model = mongoose.model('records', recordsSchema);
};

RecordsDaoMongoDB.prototype.setRecord = async function (object) {
    await this._model.create({
        firstName: object._firstName,
        lastName: object._lastName,
        email: object._email,
        dateTime: object._dateTime,
        service: object._service,
        barber: object._barber,
    });
};

RecordsDaoMongoDB.prototype.getAllRecords = async function () {
    return await this._model.find({});
};

RecordsDaoMongoDB.prototype.getRecordByDateTime = async function (dateTime) {
    return await this._model.findOne({dateTime});
};

// OrdersDaoMongoDB.prototype.updateOrder = async function (dateTime, ) {
//     await this._model.findOne({type}, (err, doc) => {
//         doc.price = newPrice;
//         doc.save();
//     });
// };

RecordsDaoMongoDB.prototype.deleteRecord = async function (dateTime) {
    await this._model.remove({dateTime});
};

module.exports = RecordsDaoMongoDB;