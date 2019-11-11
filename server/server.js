const express = require('express');
const bodyParse = require("body-parser");
const jsonParser = bodyParse.json();
const Dal = require('./db/dal/dal');
const {Validator, ValidatorServices, ValidatorStore} = require('./validator');
const urlencodedParser = bodyParse.json();
const {Model, User, Barber, Service, Record, StoreItem} = require('./model');
const email = require("../node_modules/emailjs/email");

const sendToUsersEmail = (userEmail, userName, sendText, titleMessage) => {
    const server = email.server.connect({
        host: "smtp.gmail.com",
        ssl: true,
        user: "nik.hairstyle2019",
        password: "2019hairstyle",
    });

    server.send({
        text: sendText,
        from: 'nik.hairstyle2019',
        to: `${userName} ${userEmail}`,
        cc: "",
        subject: titleMessage,
    }, function (err, message) {
        console.log(err || message);
    });
};

const app = express();
app.use(express.static('../public/'));
app.use(express.json());

app.listen(3000, () => console.log('Listen post on 3000 port!'));

const modelUsers = new Model()._users;
const modelBarbers = new Model()._barbers;
const modelServices = new Model()._services;
const modelRecords = new Model()._records;
const modelStore = new Model()._store;
const modelBlackListUsers = new Model()._users;

const validator = new Validator(modelUsers._users);
const barbersValidator = new Validator(modelBarbers._barbers);
const servicesValidator = new ValidatorServices(modelServices._services);
const storeValidator = new ValidatorStore(modelStore._store);

const dal = new Dal();
dal.init();

app.post('/logIn', urlencodedParser, function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    let data = JSON.stringify(req.body);
    data = JSON.parse(data);

    let rez = validator.isSignedUp(data.email);

    if (rez) {
        res.send({rez});
    } else {
        res.send({rez: "bad_reg"});
    }
});

app.post('/signUp', urlencodedParser, async function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    let data = JSON.stringify(req.body);
    data = JSON.parse(data);

    const newUser = new User(data.firstName, data.lastName, data.date, data.email, data.password);

    if (validator.isSignedUp(newUser._email)) {
        res.send("bad_reg");
    } else {
        modelUsers.setUser(newUser);
        await dal.setUser(newUser);
        const newUserJson = JSON.stringify(newUser);

        res.send(newUserJson);
    }
});

app.get('/getUsersDataFromDB', urlencodedParser, async (request, res) => {
    const users = await dal.getAllUsers();

    modelUsers._users = [];

    for (let i = 0; i < users.length; i++) {
        modelUsers.setUser(new User(users[i].firstName, users[i].lastName, users[i].date, users[i].email, users[i].password, users[i].userType));
    }

    res.send(JSON.stringify(modelUsers.getUsers()));
});

app.post('/setBlackUser', urlencodedParser, async (request, res) => {
    const email = request.body.email;

    await dal.updateUser(email, 'blackList');
});

app.post('/setUser', urlencodedParser, async (request, res) => {
    const email = request.body.email;

    await dal.updateUser(email, 'user');
});

app.post('/configAddBarber', urlencodedParser, async function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    let data = JSON.stringify(req.body);
    data = JSON.parse(data);

    const newBarber = new Barber(data.firstName, data.lastName, data.email, data.age, data.experience, data.salary, data.rating, data.fired);

    if (barbersValidator.isSignedUp(newBarber._email)) {
        res.send("bad_reg");
    } else {
        modelBarbers.setBarber(newBarber);
        await dal.setBarber(newBarber);
        const newBarberJson = JSON.stringify(newBarber);

        res.send(newBarberJson);
    }
});

app.post('/deleteBarberByEmail', urlencodedParser, async function (req, res) {
    const emailBarber = req.body.email;

    await dal.deleteBarber(emailBarber);
});

app.get('/getBarbersDataFromDB', urlencodedParser, async (request, res) => {
    const barbers = await dal.getAllBarbers();

    modelBarbers._barbers = [];

    for (let i = 0; i < barbers.length; i++) {
        modelBarbers.setBarber(new Barber(barbers[i].firstName, barbers[i].lastName, barbers[i].email, barbers[i].age, barbers[i].experience, barbers[i].salary, barbers[i].rating, barbers[i].fired));
    }

    res.send(JSON.stringify(modelBarbers.getBarbers()));
});

app.post('/changeSalaryBarber', urlencodedParser, async function (req, res) {
    const newSalaryBarber = req.body.newSalary;
    const emailChangeSalaryBarber = req.body.email;
    const currentBarber = modelBarbers.getBarberByEmail(emailChangeSalaryBarber);

    await dal.updateBarber(currentBarber._email, newSalaryBarber);
});

app.post('/setFiredBarber', urlencodedParser, async function (req, res) {
    const data = req.body;

    await dal.setFiredBarber(data.email, data.fired);
});

app.get('/getServicesDataFromDB', urlencodedParser, async (request, res) => {
    const services = await dal.getAllServices();

    modelServices._services = [];

    for (let i = 0; i < services.length; i++) {
        modelServices.setService(new Service(services[i].type, services[i].price));
    }

    res.send(JSON.stringify(modelServices.getServices()));
});

app.post('/configAddService', urlencodedParser, async function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    let data = JSON.stringify(req.body);
    data = JSON.parse(data);

    const newService = new Service(data.type, data.price);

    if (servicesValidator.isAdded(newService._type)) {
        res.send("bad_reg");
    } else {
        modelServices.setService(newService);
        await dal.setService(newService);
        const newServiceJson = JSON.stringify(newService);

        res.send(newServiceJson);
    }
});

app.post('/deleteServiceByType', urlencodedParser, async function (req, res) {
    const typeService = req.body.type;

    await dal.deleteService(typeService);
});

app.post('/changePriceService', urlencodedParser, async function (req, res) {
    const newPriceService = req.body.newPrice;
    const typeChangePriceService = req.body.type;
    const currentService = modelServices.getServiceByType(typeChangePriceService);

    await dal.updateService(currentService._type, newPriceService);
});

app.get('/getRecordsDataFromDB', urlencodedParser, async (request, res) => {
    const records = await dal.getAllRecords();

    modelRecords._records = [];

    for (let i = 0; i < records.length; i++) {
        modelRecords.setRecord(new Record(records[i].firstName, records[i].lastName, records[i].email, records[i].dateTime, records[i].service, records[i].barber));
    }

    res.send(JSON.stringify(modelRecords.getRecords()));
});

app.post('/addRecords', urlencodedParser, async function (req, res) {
    const {firstName, lastName, email, dateTime, service, barber} = req.body;

    const newRecord = new Record(firstName, lastName, email, dateTime, service, barber);

    modelRecords.setRecord(new Record(firstName, lastName, email, dateTime, service, barber));

    await dal.setRecord(new Record(firstName, lastName, email, dateTime, service, barber));

    res.send(JSON.stringify(newRecord));
});

app.post('/deleteRecordByDateTime', urlencodedParser, async function (req, res) {
    const dateTime = req.body.dateTime;
    const serviceType = req.body.service;
    const records = modelRecords.getRecords();


    for (let i = 0; i < records.length; i++) {
        if (records[i]._dateTime.slice(0, 10) !== dateTime && records[i]._service === serviceType) {
            let sendText = `Доброго времени суток, ${records[i]._firstName}! Приносим свои извенения, но выбранная вами услуга "${serviceType}" была удалена из списка по решению руководства. Вы можете выбрать стрижку которая вам нужна из отставшихся в нашем списке!`;
            let titleMessage = 'Запись отменена!';

            sendToUsersEmail(records[i]._email, records[i]._firstName, sendText, titleMessage);

            await dal.deleteRecordByService(serviceType);
        }
    }
});

app.post('/sendEmail', urlencodedParser, async function (req, res) {
    const { firstName, email, date, time, service, sendBarber } = req.body;

    const sendText = `Добрый день, ${firstName}! Вы записаны на услугу ${service}, ${date} числа на ${time}. Ваш барбер ${sendBarber}.`;

    sendToUsersEmail(email, firstName, sendText, 'Вы записаны!');
});

app.get('/getStoreDataFromDB', urlencodedParser, async function (req, res) {
    const store = await dal.getAllStore();

    modelStore._store = [];

    for (let i = 0; i < store.length; i++) {
        modelStore.setStoreItem(new StoreItem(store[i].type, store[i].price, store[i].mark));
    }

    res.send(JSON.stringify(modelStore.getStore()));
});

app.post('/configAddStoreItem', urlencodedParser, async function (req, res) {
    const { type, price, mark } = req.body;

    const newStoreItem = new StoreItem(type, price, mark);

    if (storeValidator.isAdded(newStoreItem._type)) {
        res.send("bad_reg");
    } else {
        modelStore.setStoreItem(newStoreItem);
        await dal.setStoreItem(newStoreItem);

        res.send(JSON.stringify(newStoreItem));
    }
});

app.post('/changePriceStoreItem', urlencodedParser, async function (req, res) {
    const newPriceStoreItem = req.body.newPrice;
    const typeChangePriceStoreItem = req.body.type;
    const currentService = modelStore.getStoreByType(typeChangePriceStoreItem);

    await dal.updateStoreItem(currentService._type, newPriceStoreItem);
});

app.post('/deleteStoreItemByType', urlencodedParser, async function (req, res) {
    const typeStoreItem = req.body.type;

    await dal.deleteStoreItem(typeStoreItem);
});

app.post('/sendEmailToAdmin', urlencodedParser, async function (req, res) {
    const { email, text } = req.body;

    sendToUsersEmail(email, '', text, 'Письмо от пользователя из черного списка.');
});