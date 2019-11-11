const Dao = require('../dao');
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    date: {
        type: String,
    },
    userType: {
        type: String,
    },
});

function UsersDaoMongoDB() {
    this._collection = null;
    this._model = null;
}

UsersDaoMongoDB.prototype = Object.create(Dao.prototype);
UsersDaoMongoDB.prototype.constructor = UsersDaoMongoDB;

UsersDaoMongoDB.prototype.init = function () {
    if (this._collection) {
        return;
    }

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/HearStyle', { useNewUrlParser: true });
    this._collection = true;
    this._model = mongoose.model('users', usersSchema);
};

UsersDaoMongoDB.prototype.getAllUsers = async function () {
    return await this._model.find({}, (err, data) => {
        // console.log(data);
    });
};

UsersDaoMongoDB.prototype.getUser = async function (email) {
    return await this._model.findOne({email});
};

UsersDaoMongoDB.prototype.setUser = async function (object) {
    await this._model.create({
        firstName: object._firstName,
        lastName: object._lastName,
        email: object._email,
        password: object._password,
        date: object._date,
        userType: object._userType
    });
};

UsersDaoMongoDB.prototype.updateUser = async function (email, type) {
    await this._model.findOne({email}, (err, doc) => {
        doc.userType = type;
        doc.save();
    });
};

module.exports = UsersDaoMongoDB;