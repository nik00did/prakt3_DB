const Dao = require('../dao');
const mongoose = require('mongoose');

const barberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
});

function BarbersDaoMongoDB () {
    this._collection = null;
    this._model = null;
}

BarbersDaoMongoDB.prototype = Object.create(Dao.prototype);
BarbersDaoMongoDB.prototype.constructor = BarbersDaoMongoDB;

BarbersDaoMongoDB.prototype.init = function () {
    if (this._collection) {
        return;
    }

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/HearStyle');
    this._collection = true;
    this._model = mongoose.model('barbers', barberSchema);
};

BarbersDaoMongoDB.prototype.setBarber = async function (object) {
    const barber = this._model(object);
    await barber.save();
};

BarbersDaoMongoDB.prototype.getAllBarbers = async function () {
    return await this._model.find({});
};

BarbersDaoMongoDB.prototype.getBarber = async function (email) {
    return await this._model.findOne({email});
};

module.exports = BarbersDaoMongoDB;