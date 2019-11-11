const Dao = require('../dao');
const mongoose = require('mongoose');

const barberSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    age: {
        type: Number,
    },
    experience: {
        type: Number,
    },
    rating: {
        type: Number,
    },
    salary: {
        type: Number,
    },
    fired: {
        type: String,
    }
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
    await this._model.create({
        firstName: object._firstName,
        lastName: object._lastName,
        email: object._email,
        age: object._age,
        experience: object._experience,
        rating: object._rating,
        salary: object._salary,
        fired: object._fired,
    });
};

BarbersDaoMongoDB.prototype.getAllBarbers = async function () {
    return await this._model.find({});
};

BarbersDaoMongoDB.prototype.getBarber = async function (email) {
    return await this._model.findOne({email});
};

BarbersDaoMongoDB.prototype.updateBarber = async function (email, newSalary) {
    await this._model.findOne({email}, (err, doc) => {
        doc.salary = newSalary;
        doc.save();
    });
};

BarbersDaoMongoDB.prototype.setFiredBarber = async function (email, date) {
    await this._model.findOne({email}, (err, doc) => {
        doc.fired = date;
        doc.save();
    });
};

BarbersDaoMongoDB.prototype.deleteBarber = async function (email) {
    await this._model.remove({email});
};

module.exports = BarbersDaoMongoDB;