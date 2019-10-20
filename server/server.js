const express = require('express');
const bodyParse = require("body-parser");
const jsonParser = bodyParse.json();
const Dal = require('./db/dal/dal');
const Validator = require('./validator');
const urlencodedParser = bodyParse.json();
const { Model, User } = require('./model');

const app = express();
app.use(express.static('../public/'));
app.use(express.json());

app.listen(3000, () => console.log('Listen post on 3000 port!'));

const modelUsers = new Model()._users;

const validator = new Validator(modelUsers._users);

const dal = new Dal();
dal.init();

app.post('/logIn', urlencodedParser, function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    console.log("/logIn");

    let data = JSON.stringify(req.body);
    data = JSON.parse(data);

    console.log(`что пришло`);
    console.log(data.email, data.password);

    console.log(`Валидация`);

    if (validator.isValidLogIn(data.email, data.password)) {
        console.log('is valid');
    } else {
        console.log('NO valid');
    }

    console.log(`Проверка регистрации`);
    let rez = validator.isSignedUp(data.email);

    if (rez) {
        console.log(`ПРОШЕЛ ПРОВЕРКУ`);
        console.log(rez);
        res.send({rez});
    } else {
        console.log(`НЕ ПРОШЕЛ ПРОВЕРКУ`);
        res.send({rez: "bad_reg"});
    }
});

app.post('/signUp', urlencodedParser, function (req, res) {

    if (!req.body) {
        return res.sendStatus(400);
    }

    let data = JSON.stringify(req.body);
    data = JSON.parse(data);

    console.log("/signUp");

    const newUser = new User(data.firstName, data.lastName, data.date, data.email, data.password);

    if (!validator.isValidSignUp(data.email, data.password)) {
        console.log('is valid');
    } else {
        console.log('NO valid');
    }

    console.log(`Проверка регистрации`);

    if (validator.isSignedUp(newUser._email)) {
        console.log(`Уже зарегистрирован!!!!!!`);

        res.send("bad_reg");
    } else {
        modelUsers.setUser(newUser);
        dal.setUser(newUser);  //._users.insert(modelUsers.getUsersLast());
        console.log(`ПРОШЕЛ РЕГИСТРАЦИЮ`);
        const newUserJson = JSON.stringify(newUser);

        res.send(newUserJson);
    }
});

app.post('/getUsersDataFromDB', urlencodedParser, async (request, res) => {
    const users = await dal.getAllUsers();

    if(modelUsers.getUsers().length !== users.length) {
        for (let i = 0; i < users.length; i++) {
            modelUsers.setUser(new User(users[i].firstName, users[i].lastName, users[i].date, users[i].email, users[i].password, users[i].userType));
        }
    }

    res.send(modelUsers.getUsers());
});


app.post('/pushAdminToServer', urlencodedParser, async (req, res) => {
    const temp = await req.body;
    const users = modelUsers.getUsers();
    const admin = new User(temp._firstName, temp._lastName, temp._date, temp._email, temp._password, temp._userType);

    console.log(modelUsers.getUsers(), 'users data on server model');
    console.log(modelUsers.getUsers().length === 0);
    if (modelUsers.getUsers().length === 0) {
        console.log('111111111111111111111111');
        modelUsers.setUser(admin);
        await dal.setUser(admin);
        res.send(admin);
    }
});