function Controller() {
    this._view = null;
    this._currentUser = null;
    this._usersModel = null;
    this._barbersModel = null;
    this._servicesModel = null;
    this._sendData = null;
    this._usersValidator = null;
    this._barbersValidator = null;
    this._servicesValidator = null;
    this._copyBarberList = null;
}

const sendAjaxRequest = async url => {
    let response = await fetch(url);
    return await response.json();
};

Controller.prototype.init = async () => {
    this._usersModel = new Model()._users;
    this._barbersModel = new Model()._barbers;
    this._servicesModel = new Model()._services;
    this._recordsModel = new Model()._records;
    this._storeModel = new Model()._store;

    this._sendData = new SendToServer();

    let users = await sendAjaxRequest('/getUsersDataFromDB');
    let user = null;

    for (let i = 0; i < users.length; i++) {
        user = new User(users[i]._firstName, users[i]._lastName, users[i]._date, users[i]._email, users[i]._password, users[i]._userType);
        this._usersModel.setUser(user);
    }

    let barbers = await sendAjaxRequest('/getBarbersDataFromDB');
    let barber = null;

    this._barbersModel = new Model()._barbers;

    for (let i = 0; i < barbers.length; i++) {
        if (barbers[i]._fired === '-') {
            barber = new Barber(barbers[i]._firstName, barbers[i]._lastName, barbers[i]._email, barbers[i]._age, barbers[i]._experience, barbers[i]._salary, barbers[i]._rating, barbers[i]._fired);
            this._barbersModel.setBarber(barber);
        }
    }

    let services = await sendAjaxRequest('/getServicesDataFromDB');
    let service = null;
    this._servicesModel = new Model()._services;

    for (let i = 0; i < services.length; i++) {
        service = new Service(services[i]._type, services[i]._price);
        this._servicesModel.setService(service);
    }

    let records = await sendAjaxRequest('/getRecordsDataFromDB');
    let record = null;
    this._recordsModel = new Model()._records;

    for (let i = 0; i < records.length; i++) {
        record = new Record(records[i]._firstName, records[i]._lastName, records[i]._email, records[i]._dateTime, records[i]._service, records[i]._barber);
        this._recordsModel.setRecord(record);
    }

    let store = await sendAjaxRequest('/getStoreDataFromDB');
    let storeItem = null;
    this._storeModel = new Model()._store;

    for (let i = 0; i < store.length; i++) {
        storeItem = new StoreItem(store[i]._type, store[i]._price, store[i]._mark);
        this._storeModel.setStoreItem(storeItem);
    }

    this._usersValidator = new Validator(this._usersModel.getUsers());
    this._barbersValidator = new Validator(this._barbersModel.getBarbers());
    this._storeValidator = new ValidatorStore(this._storeModel.getStore());

    this._currentUser = this._usersModel.getUserByEmail(localStorage.getItem('userEmail'));

    drawHomePage(this._currentUser);

    this._view = new View();
    this._view.getAllIdMenu();

    this._view._home.onclick = clickHome;
    this._view._service.onclick = clickServices;
    this._view._barbers.onclick = clickBarbers;
    this._view._store.onclick = clickStore;

    if (this._currentUser) {
        this._view._logOut = document.getElementById('logOut');
        this._view._logOut.onclick = clickLogOut;
    } else {
        this._view._logIn.onclick = clickLogIn;
    }

    if (this._currentUser && (this._currentUser._userType === 'user' || this._currentUser._userType === 'blackList')) {
        this._view._mine = document.getElementById('mine');
        this._view._mine.onclick = clickMine;
    }

    this._view._scrollDown.onclick = clickScrollDown;

    if (!this._currentUser || this._currentUser._userType !== 'admin') {
        this._view._recording.onclick = clickRecord;
        this._view._record.onclick = clickRecord;
    } else {
        this._view._data = document.getElementById('data');
        this._view._data.onclick = clickAdminData;
    }
};

const clickHome = () => {
    drawHomeContent(this._currentUser);
    clearCurrentHeaderFunc();
    clearCurrentHeaderItem();
    document.getElementById('home').classList.add('currentHeaderItem');

    this._view.getAllIdMenu();
    this._view._scrollDown.onclick = clickScrollDown;

    if (!this._currentUser || this._currentUser._userType !== 'admin') {
        this._view._recording.onclick = clickRecord;
    }
};

const clickAbout = () => {
    drawAboutContent();

    clearCurrentHeaderFunc();
    clearCurrentHeaderItem();
    document.getElementById('about').classList.add('currentHeaderItem');
};

const clickServices = async () => {
    let services = await sendAjaxRequest('/getServicesDataFromDB');
    let service = null;
    this._servicesModel = new Model()._services;

    for (let i = 0; i < services.length; i++) {
        service = new Service(services[i]._type, services[i]._price);
        this._servicesModel.setService(service);
    }

    drawServicesContent();

    this._copyServiceList = Object.create(this._servicesModel.getServices());

    drawPublicServices(this._copyServiceList, this._currentUser, this._view._imagesServicesObject);
    clearCurrentHeaderFunc();
    clearCurrentHeaderItem();
    document.getElementById('services').classList.add('currentHeaderItem');

    this._view._openBlockForParamsService = document.getElementById('toggleRequestsMenuButton');
    this._view._getSortedService = document.getElementById('buttonForSearchPrices');
    this._view._buttonResetService = document.getElementById('buttonForReset');


    this._view._openBlockForParamsService.onclick = clickOpenBlockForParamsService;
    this._view._getSortedService.onclick = clickSortPricesService;
    this._view._buttonResetService.onclick = clickButtonResetServices;
};

const clickOpenBlockForParamsService = () => {
    if (!this._view._toggleCurrentValue) {
        document.getElementById('blockForParamsService').setAttribute('style', 'visibility: visible');
        this._view._toggleCurrentValue = true;
    } else {
        document.getElementById('blockForParamsService').setAttribute('style', 'visibility: hidden');
        this._view._toggleCurrentValue = false;
    }
};

const clickSortPricesService = () => {
    this._copyServiceList.sort((a, b) => b._price - a._price);

    drawPublicServices(this._copyServiceList, this._currentUser, this._view._imagesServicesObject);
};

const clickButtonResetServices = () => {
    this._copyServiceList = Object.create(this._servicesModel.getServices());

    drawPublicServices(this._copyServiceList, this._currentUser, this._view._imagesServicesObject);
};

const clickBarbers = async () => {
    let barbers = await sendAjaxRequest('/getBarbersDataFromDB');
    let barber = null;

    this._barbersModel = new Model()._barbers;

    for (let i = 0; i < barbers.length; i++) {
        if (barbers[i]._fired === '-') {
            barber = new Barber(barbers[i]._firstName, barbers[i]._lastName, barbers[i]._email, barbers[i]._age, barbers[i]._experience, barbers[i]._salary, barbers[i]._rating, barbers[i]._fired);
            this._barbersModel.setBarber(barber);
        }
    }

    drawBarbersContent();

    this._copyBarberList = Object.create(this._barbersModel.getBarbers());

    drawPublicBarbers(this._copyBarberList, this._currentUser, this._view._imagesObject);
    clearCurrentHeaderFunc();
    clearCurrentHeaderItem();
    document.getElementById('barbers').classList.add('currentHeaderItem');

    this._view._openBlockForParamsBarber = document.getElementById('toggleRequestsMenuButton');
    this._view._getSortedBarbers = document.getElementById('buttonForSearchRating');
    this._view._buttonResetBarbers = document.getElementById('buttonForReset');
    this._view._buttonForSearchDate = document.getElementById('buttonForSearchDate');


    this._view._openBlockForParamsBarber.onclick = clickOpenBlockForParamsBarber;
    this._view._getSortedBarbers.onclick = clickSortRatingBarbers;
    this._view._buttonResetBarbers.onclick = clickButtonResetBarbers;
    this._view._buttonForSearchDate.onclick = clickButtonForSearchDate;
};

const clickSortRatingBarbers = () => {
    this._copyBarberList.sort((a, b) => b._rating - a._rating);

    drawPublicBarbers(this._copyBarberList, this._currentUser, this._view._imagesObject);
};

const clickButtonForSearchDate = () => {
    this._view._sortedDate = document.getElementById('date').value;
    this._view._sortedTime = document.getElementById('time').value;

    let data, filterBarbers = this._barbersModel.getBarbers();

    if (this._view._sortedDate.value === 'не выбрана' && this._view._sortedTime.value === 'не выбрано') {
        alert('Вы не выбрали параметры поиска!');
    } else if (this._view._sortedDate === 'не выбрана') {
        data = this._view._sortedTime;

        for (let i = 0; i < this._recordsModel.getRecords().length; i++) {
            if (data === this._recordsModel.getRecords()[i]._dateTime.slice(11)) {
                filterBarbers = filterBarbers.filter(barber => barber._email !== this._recordsModel.getRecords()[i]._barber);
            }
        }
    } else if (this._view._sortedTime === 'не выбрано') {
        data = this._view._sortedDate;

        for (let i = 0; i < this._recordsModel.getRecords().length; i++) {
            if (data === this._recordsModel.getRecords()[i]._dateTime.slice(0, 10)) {
                filterBarbers = filterBarbers.filter(barber => barber._email !== this._recordsModel.getRecords()[i]._barber);
            }
        }
    } else {
        data = `${this._view._sortedDate}.${this._view._sortedTime}`;

        for (let i = 0; i < this._recordsModel.getRecords().length; i++) {
            if (data === this._recordsModel.getRecords()[i]._dateTime) {
                filterBarbers = filterBarbers.filter(barber => barber._email !== this._recordsModel.getRecords()[i]._barber);
            }
        }
    }

    drawPublicBarbers(filterBarbers, this._currentUser, this._view._imagesObject);
};

const clickButtonResetBarbers = () => {
    this._copyBarberList = Object.create(this._barbersModel.getBarbers());

    drawPublicBarbers(this._copyBarberList, this._currentUser, this._view._imagesObject);
};

const clickOpenBlockForParamsBarber = () => {
    if (!this._view._toggleCurrentValue) {
        document.getElementById('blockForParamsBarber').setAttribute('style', 'visibility: visible');
        this._view._toggleCurrentValue = true;
    } else {
        document.getElementById('blockForParamsBarber').setAttribute('style', 'visibility: hidden');
        this._view._toggleCurrentValue = false;
    }
};

const goToRecordPage = email => {
    this._view._defaultBarber = this._barbersModel.getBarberByEmail(email);
    clickRecord();
};

const goToRecordPageFromServices = type => {
    this._view._defaultService = this._servicesModel.getServiceByType(type);
    clickRecord();
};

const clickStore = async () => {
    let store = await sendAjaxRequest('/getStoreDataFromDB');
    let storeItem = null;
    this._storeModel = new Model()._store;

    for (let i = 0; i < store.length; i++) {
        storeItem = new StoreItem(store[i]._type, store[i]._price, store[i]._mark);
        this._storeModel.setStoreItem(storeItem);
    }

    this._copyStoreList = Object.create(this._storeModel.getStore());

    drawStoreContent(this._copyStoreList);

    drawPublicStoreItem(this._copyStoreList, this._view._imagesStoreObject);
    clearCurrentHeaderFunc();
    clearCurrentHeaderItem();
    document.getElementById('store').classList.add('currentHeaderItem');

    this._view._openBlockForParamsService = document.getElementById('toggleRequestsMenuButton');
    this._view._getSortedService = document.getElementById('buttonForSearchPrices');
    this._view._buttonResetService = document.getElementById('buttonForReset');
    this._view._buttonFilterStoreMark = document.getElementById('buttonForSearchMark');

    this._view._openBlockForParamsService.onclick = clickOpenBlockForParamsStore;
    this._view._getSortedService.onclick = clickSortPricesStore;
    this._view._buttonResetService.onclick = clickButtonResetStore;
    this._view._buttonFilterStoreMark.onclick = clickFilterMarkStore;
};

const clickOpenBlockForParamsStore = () => {
    if (!this._view._toggleCurrentValueStore) {
        document.getElementById('blockForParamsService').setAttribute('style', 'visibility: visible');
        this._view._toggleCurrentValueStore = true;
    } else {
        document.getElementById('blockForParamsService').setAttribute('style', 'visibility: hidden');
        this._view._toggleCurrentValueStore = false;
    }
};

const clickSortPricesStore = () => {
    this._copyStoreList.sort((a, b) => b._price - a._price);

    drawPublicStoreItem(this._copyStoreList, this._view._imagesStoreObject);
};

const clickFilterMarkStore = () => {
    this._view._currentMark = document.getElementById('mark').value;

    if (this._view._currentMark !== 'не выбрана') {
        this._copyStoreList = this._copyStoreList.filter(a => a._mark === this._view._currentMark);
    }

    drawPublicStoreItem(this._copyStoreList, this._view._imagesStoreObject);
};

const clickButtonResetStore = () => {
    this._copyStoreList = Object.create(this._storeModel.getStore());

    drawPublicStoreItem(this._copyStoreList, this._view._imagesStoreObject);
};

const clickLogIn = () => {
    drawLogInContent();
    clearCurrentHeaderFunc();
    clearCurrentHeaderItem();
    document.getElementById('logIn').classList.add('currentHeaderItem');

    this._view._submitLogIn = document.getElementById('submitLogIn');
    this._view._submitLogIn.onclick = clickSubmitLogIn;

    this._view._submitSignUp = document.getElementById('submitSignUp');
    this._view._submitSignUp.onclick = clickSubmitSignUp;
};

const validateInput = (input, blockWrongData) => {
    const inputBlock = document.getElementById(input);
    const blockWrongDataInfo = document.getElementById(blockWrongData);

    if (!inputBlock.value.endsWith('@gmail.com') && !inputBlock.classList.contains('wrongInputData')) {
        inputBlock.classList.add('wrongInputData');
        blockWrongDataInfo.textContent = 'Неверно набранная почта (yourEmail@gmail.com)';
    }
};

const removeInvalid = (input, blockWrongData) => {
    const inputBlock = document.getElementById(input);
    const blockWrongDataInfo = document.getElementById(blockWrongData);

    if (inputBlock.classList.contains('wrongInputData')) {
        inputBlock.classList.remove('wrongInputData');
        blockWrongDataInfo.textContent = '';
    }
};

const confirmLogOut = () => {
    loading();
    document.getElementById('modal__back_logOut').setAttribute('style', 'visibility: hidden');

    if (this._currentUser._userType === 'user') {
        document.getElementById('mine').remove();
    }

    this._currentUser = null;
    drawHomePage(this._currentUser);
    document.getElementById('home').classList.add('currentHeaderItem');
    localStorage.removeItem('userEmail');

    this._view = new View();
    this._view.getAllIdMenu();

    this._view._home.onclick = clickHome;
    this._view._service.onclick = clickServices;
    this._view._barbers.onclick = clickBarbers;
    this._view._store.onclick = clickStore;
    this._view._logIn.onclick = clickLogIn;
    this._view._record.onclick = clickRecord;
    this._view._scrollDown.onclick = clickScrollDown;
    this._view._recording.onclick = clickRecord;
};

const cancelLogOut = () => {
    document.getElementById('modal__back_logOut').setAttribute('style', 'visibility: hidden');
};

const clickLogOut = () => {
    document.getElementById('modal__back_logOut').setAttribute('style', 'visibility: visible');

    this._view._confirmLogOut = document.getElementById('confirmLogOut');
    this._view._confirmLogOut.onclick = confirmLogOut;

    this._view._cancelLogOut = document.getElementById('cancelLogOut');
    this._view._cancelLogOut.onclick = cancelLogOut;
};

const clickSubmitLogIn = () => {
    loading();
    this._view._email = document.getElementById('email');
    this._view._password = document.getElementById('password');

    const data = {
        email: this._view._email.value,
        password: this._view._password.value,
    };

    let url = '/logIn';

    if (this._usersValidator.isValidLogIn(data.email, data.password)) {
        if (this._usersValidator.isSignedUp(data.email)) {
            if (data.password === this._usersModel.getUserByEmail(data.email)._password) {
                this._sendData.postRequest(url, data, rez => {
                    const rezObject = JSON.parse(rez);

                    if (rezObject.rez !== 'bad_reg') {
                    }
                });

                const users = this._usersModel.getUsers();
                let userType;

                for (let i = 0; i < users.length; i++) {
                    if (users[i]._email === data.email) {
                        userType = users[i]._userType;
                        this._currentUser = Object.create(users[i]);
                    }
                }

                switch (userType) {
                    case 'admin':
                        drawAdminPage();
                        drawHomeContent(this._currentUser);
                        document.getElementById('home').classList.add('currentHeaderItem');

                        this._view._adminData = document.getElementById('data');
                        this._view._adminData.onclick = clickAdminData;
                        this._view.getAllIdMenu();

                        this._view._scrollDown.onclick = clickScrollDown;

                        document.getElementsByTagName('body')[0].setAttribute('style', 'background-image: url("../view/image/icon10.png")');

                        break;
                    case 'user':
                        drawUserPage();
                        drawHomeContent(this._currentUser);
                        document.getElementById('home').classList.add('currentHeaderItem');
                        this._view._recording.onclick = clickRecord;
                        this._view.getAllIdMenu();

                        this._view._mine = document.getElementById('mine');

                        this._view._scrollDown.onclick = clickScrollDown;
                        this._view._mine.onclick = clickMine;

                        document.getElementsByTagName('body')[0].setAttribute('style', 'background-image: url("../view/image/icon11.png")');

                        break;
                    case 'blackList':
                        drawUserPage('blackList');
                        drawHomeContent(this._currentUser);
                        document.getElementById('home').classList.add('currentHeaderItem');

                        this._view._home.onclick = null;
                        this._view._service.onclick = null;
                        this._view._barbers.onclick = null;
                        this._view._store.onclick = null;
                        this._view._logIn.onclick = null;
                        this._view._record.onclick = null;
                        this._view._scrollDown.onclick = null;
                        this._view._recording.onclick = null;
                        this._view._canselSendAdminEmail = document.getElementById('cancelSendEmailToAdmin');
                        this._view._canselSendAdminEmail.onclick = cancelSendAdminEmail;
                        this._view._confirmSendAdminEmail = document.getElementById('confirmSendEmailToAdmin');
                        this._view._confirmSendAdminEmail.onclick = confirmSendAdminEmail;

                        document.getElementsByTagName('body')[0].setAttribute('style', 'background-image: url("../view/image/icon14.png")');

                        break;
                }

                const header = document.getElementById('header');

                let modalDiv = document.createElement('div');
                modalDiv.setAttribute('class', 'modal__back');
                modalDiv.setAttribute('id', 'modal__back_logOut');

                let window = document.createElement('div');
                window.setAttribute('class', 'modal__window_logOut');

                let formContent = document.createElement('div');
                formContent.setAttribute('class', 'form_content');
                formContent.textContent = 'Вы уверены, что хотите выйти из этого акаунта?';

                window.append(formContent);

                let divButtons = document.createElement('div');
                divButtons.setAttribute('class', 'formDivButtons');

                let buttonLogIn = document.createElement('button');
                buttonLogIn.setAttribute('id', 'cancelLogOut');
                buttonLogIn.setAttribute('class', 'form__item_button-modal');
                buttonLogIn.setAttribute('type', 'button');
                buttonLogIn.textContent = 'Нет';

                divButtons.append(buttonLogIn);

                let buttonSignUp = document.createElement('button');
                buttonSignUp.setAttribute('id', 'confirmLogOut');
                buttonSignUp.setAttribute('class', 'form__item_button-modal');
                buttonSignUp.setAttribute('type', 'button');
                buttonSignUp.textContent = 'Да';

                divButtons.append(buttonSignUp);

                window.append(divButtons);

                modalDiv.append(window);

                header.append(modalDiv);

                this._view._logOut = document.getElementById('logOut');
                this._view._logOut.onclick = clickLogOut;

                localStorage.setItem('userEmail', this._currentUser._email);
            } else {
                alert('Пароль не совпадает!');
            }
        } else {
            alert('Not found email!');
        }
    } else {
        alert('Wrong input data!');
    }
};

const clickMine = () => {
    let recordsCurrentUser = [];

    for (let i = 0; i < this._recordsModel.getRecords().length; i++) {
        if (this._recordsModel.getRecords()[i]._email === this._currentUser._email) {
            recordsCurrentUser.push(this._recordsModel.getRecords()[i]);
        }
    }

    console.log(this._recordsModel.getRecords());

    drawPersonalUserPage(this._currentUser, recordsCurrentUser);
    clearCurrentHeaderFunc();
    clearCurrentHeaderItem();
    document.getElementById('mine').classList.add('currentHeaderItem');

};

const confirmSendAdminEmail = () => {
    const email = document.getElementById('inputEmail').value;
    const text = document.getElementById('textArea').value;

    const data = { email, text };

    this._sendData.postRequest('/sendEmailToAdmin', data, () => {});

    cancelDeleteBarber();
};

const cancelSendAdminEmail = () => {
    document.getElementById('modal__back_sendEmailToAdmin').setAttribute('style', 'visibility: hidden');
};

const clickAdminData = async () => {
    let barbers = await sendAjaxRequest('/getBarbersDataFromDB');
    let barber = null;

    for (let i = 0; i < barbers.length; i++) {
        barber = new Barber(barbers[i]._firstName, barbers[i]._lastName, barbers[i]._email, barbers[i]._age, barbers[i]._experience, barbers[i]._salary, barbers[i]._rating, barbers[i]._fired);

        if (barber._fired !== '-' && new Date().getDate() - Number(barber._fired.split('.')[0]) >= 7) {
            this._sendData.postRequest('/deleteBarberByEmail', {email: barber._email,}, () => {
            });
        }
    }

    drawAdminDataContent();
    clearCurrentHeaderItem();
    document.getElementById('data').classList.add('currentHeaderItem');

    this._view._usersAdmin = document.getElementById('watchSignedUsers');
    this._view._blackListUsers = document.getElementById('watchBlackListUsers');
    this._view._watchBarbers = document.getElementById('watchBarbers');
    this._view._watchServices = document.getElementById('watchServices');
    this._view._watchStore = document.getElementById('watchStore');
    this._view._watchRecords = document.getElementById('watchRecords');
    this._view._watchBlackList = document.getElementById('watchBlackList');

    this._view._usersAdmin.onclick = clickUsersAdmin;
    this._view._blackListUsers.onclick = clickWatchBlackList;
    this._view._watchBarbers.onclick = clickWatchBarbers;
    this._view._watchServices.onclick = clickWatchServices;
    this._view._watchStore.onclick = clickWatchStore;
    this._view._watchRecords.onclick = clickWatchRecords;
    this._view._watchBlackList = clickWatchBlackList;
};

const clickWatchRecords = async () => {
    let records = await sendAjaxRequest('/getRecordsDataFromDB');
    let record = null;
    this._recordsModel = new Model()._records;

    for (let i = 0; i < records.length; i++) {
        record = new Record(records[i]._firstName, records[i]._lastName, records[i]._email, records[i]._dateTime, records[i]._service, records[i]._barber);
        this._recordsModel.setRecord(record);
    }

    drawRecordsInfo();
    clearCurrentHeaderFunc();
    console.log(this._recordsModel.getRecords());

    for (let i = 0; i < this._recordsModel.getRecords().length; i++) {
        drawRecord(i + 1, this._recordsModel.getRecords()[i]);
    }
};

const clickWatchStore = async () => {
    let store = await sendAjaxRequest('/getStoreDataFromDB');
    let storeItem = null;
    this._storeModel = new Model()._store;

    for (let i = 0; i < store.length; i++) {
        storeItem = new StoreItem(store[i]._type, store[i]._price, store[i]._mark);
        this._storeModel.setStoreItem(storeItem);
    }

    this._storeValidator = new ValidatorStore(this._storeModel.getStore());

    drawStoreInfo();
    clearCurrentHeaderFunc();

    for (let i = 0; i < this._storeModel.getStore().length; i++) {
        drawStoreItem(i + 1, this._storeModel.getStore()[i]);
    }

    this._view._addStoreItem = document.getElementById('addStoreItemButton');
    this._view._configAddStoreItem = document.getElementById('configAddStoreItem');

    this._view._addStoreItem.onclick = clickAddStoreItem;
    this._view._configAddStoreItem.onclick = clickConfigAddStoreItem;
};

const clickAddStoreItem = () => {
    document.getElementById('modal__back_store').setAttribute('style', 'visibility: visible;');

    this._view._cancelAddStoreItem = document.getElementById('cancelAddStoreItem');

    this._view._cancelAddStoreItem.onclick = clickCancelAddStoreItem;
};

const clickDeleteStoreItem = type => {
    document.getElementById('modal__back_confirmDeleteStoreItem').setAttribute('style', 'visibility: visible');

    this._view._currentServiceTypeforDelete = type;

    const service = this._storeModel.getStoreByType(this._view._currentServiceTypeforDelete);
    let tempSpan;
    let arrayServicesValues = [
        service._type,
        service._price,
        service._mark,
    ];
    const arrayValues = ['typeDeleteStoreItem', 'priceDeleteStoreItem', 'markDeleteStoreItem'];

    for (let i = 0; i < arrayValues.length; i++) {
        tempSpan = document.getElementById(arrayValues[i]);
        tempSpan.textContent = arrayServicesValues[i];
    }

    this._view._confirmDeleteService = document.getElementById('confirmDeleteStoreItem');
    this._view._cancelDeleteService = document.getElementById('cancelDeleteStoreItem');

    this._view._confirmDeleteService.onclick = confirmDeleteStoreItem;
    this._view._cancelDeleteService.onclick = cancelDeleteStoreItem;
};

const confirmDeleteStoreItem = async () => {
    let type = this._storeModel.getStoreByType(this._view._currentServiceTypeforDelete)._type;

    let data = {type};
    let url = '/deleteStoreItemByType';

    this._sendData.postRequest(url, data, () => {
    });

    await clickWatchStore();
};

const cancelDeleteStoreItem = () => {
    document.getElementById('modal__back_confirmDeleteStoreItem').setAttribute('style', 'visibility: hidden');
};

const clickConfigAddStoreItem = () => {
    this._view._type = document.getElementById('type');
    this._view._price = document.getElementById('price');
    this._view._mark = document.getElementById('mark');

    const data = {
        type: document.getElementById('type').value,
        price: document.getElementById('price').value,
        mark: document.getElementById('mark').value,
    };

    let url = '/configAddStoreItem';

    if (!this._storeValidator.isAdded(data.type)) {
        this._sendData.postRequest(url, data, rez => {
            if (rez) {
                const {_type, _price, _mark} = JSON.parse(rez);

                const newStoreItem = new StoreItem(_type, _price, _mark);
                this._storeModel.setStoreItem(newStoreItem);
                this._storeValidator = new ValidatorStore(this._storeModel.getStore());
            }
        });

        clickWatchStore();
    } else {
        alert('Type already added!');
    }
};

const clickCancelAddStoreItem = () => {
    document.getElementById('modal__back_store').setAttribute('style', 'visibility: hidden;');
};

const clickWatchServices = async () => {
    let services = await sendAjaxRequest('/getServicesDataFromDB');
    let service = null;
    this._servicesModel = new Model()._services;

    for (let i = 0; i < services.length; i++) {
        service = new Service(services[i]._type, services[i]._price);
        this._servicesModel.setService(service);
    }

    this._servicesValidator = new ValidatorServices(this._servicesModel.getServices());

    drawServicesInfo();
    clearCurrentHeaderFunc();

    for (let i = 0; i < this._servicesModel.getServices().length; i++) {
        drawService(i + 1, this._servicesModel.getServices()[i]);
    }

    this._view._addService = document.getElementById('addServiceButton');
    this._view._configAddService = document.getElementById('configAddService');

    this._view._addService.onclick = clickAddService;
    this._view._configAddService.onclick = clickConfigAddService;
};

const clickConfigAddService = () => {
    this._view._type = document.getElementById('type');
    this._view._price = document.getElementById('price');

    const data = {
        type: this._view._type.value,
        price: this._view._price.value,
    };

    let url = '/configAddService';

    if (this._servicesValidator.isValidInputed(data.type, data.price)) {
        if (!this._servicesValidator.isAdded(data.type)) {
            this._sendData.postRequest(url, data, rez => {
                if (rez) {
                    let newAddedService = JSON.parse(rez);

                    const newService = new Service(newAddedService._type, newAddedService._price);
                    this._servicesModel.setService(newService);
                    this._servicesValidator = new ValidatorServices(this._servicesModel.getServices());
                }
            });

            clickWatchServices();
        } else {
            alert('Type already added!');
        }
    } else {
        alert('Wrong input data!');
    }
};

const clickAddService = () => {
    document.getElementById('modal__back_service').setAttribute('style', 'visibility: visible;');

    this._view._cancelAddBarber = document.getElementById('cancelAddService');

    this._view._cancelAddBarber.onclick = clickCancelAddService;
};

const clickCancelAddService = () => {
    document.getElementById('modal__back_service').setAttribute('style', 'visibility: hidden;');
};

const clickDeleteService = type => {
    document.getElementById('modal__back_confirmDeleteService').setAttribute('style', 'visibility: visible');

    this._view._currentServiceTypeforDelete = type;

    const service = this._servicesModel.getServiceByType(this._view._currentServiceTypeforDelete);
    let tempSpan;
    let arrayServicesValues = [
        service._type,
        service._price,
    ];
    const arrayValues = ['typeDelete', 'priceDelete'];

    for (let i = 0; i < arrayValues.length; i++) {
        tempSpan = document.getElementById(arrayValues[i]);
        tempSpan.textContent = arrayServicesValues[i];
    }

    this._view._confirmDeleteService = document.getElementById('confirmDeleteService');
    this._view._cancelDeleteService = document.getElementById('cancelDeleteService');

    this._view._confirmDeleteService.onclick = confirmDeleteService;
    this._view._cancelDeleteService.onclick = cancelDeleteService;
};

const confirmDeleteService = async () => {
    let type = this._servicesModel.getServiceByType(this._view._currentServiceTypeforDelete)._type;

    let dateToday = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;
    let dataRec = {
        dateTime: dateToday,
        service: type,
    };

    this._sendData.postRequest('/deleteRecordByDateTime', dataRec, () => {
    });

    const data = {type};
    let url = '/deleteServiceByType';

    this._sendData.postRequest(url, data, () => {
    });

    await clickWatchServices();
};

const cancelDeleteService = () => {
    document.getElementById('modal__back_confirmDeleteService').setAttribute('style', 'visibility: hidden');
};

const clickDeleteBarber = email => {
    document.getElementById('modal__back_confirm').setAttribute('style', 'visibility: visible');

    this._view._currentBarbersEmailForDelete = email;

    const barber = this._barbersModel.getBarberByEmail(this._view._currentBarbersEmailForDelete);
    let tempSpan;
    let arrayBarberValues = [
        barber._firstName,
        barber._lastName,
        barber._email,
        barber._age,
        barber._experience,
        barber._salary,
        barber._rating,
    ];
    const arrayValues = ['firstNameDelete', 'lastNameDelete', 'ageDelete', 'experienceDelete', 'salaryDelete', 'ratingDelete', 'emailDelete'];

    for (let i = 0; i < arrayValues.length; i++) {
        tempSpan = document.getElementById(arrayValues[i]);
        tempSpan.textContent = arrayBarberValues[i];
    }

    this._view._confirmDeleteBarber = document.getElementById('confirmDeleteBarber');
    this._view._cancelDeleteBarber = document.getElementById('cancelDeleteBarber');

    this._view._confirmDeleteBarber.onclick = setFiredBarber;
    this._view._cancelDeleteBarber.onclick = cancelDeleteBarber;
};

const cancelDeleteBarber = () => {
    document.getElementById('modal__back_confirm').setAttribute('style', 'visibility: hidden');
};

const setFiredBarber = async () => {
    let email = this._barbersModel.getBarberByEmail(this._view._currentBarbersEmailForDelete)._email;
    let fired = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;
    const data = {email, fired};
    let url = 'setFiredBarber';

    this._sendData.postRequest(url, data, () => {
    });

    await clickWatchBarbers();
};

const clickWatchBarbers = async () => {
    console.log('clickWatchBarbers');

    let barbers = await sendAjaxRequest('/getBarbersDataFromDB');
    let barber = null;
    this._barbersModel = new Model()._barbers;

    for (let i = 0; i < barbers.length; i++) {
        barber = new Barber(barbers[i]._firstName, barbers[i]._lastName, barbers[i]._email, barbers[i]._age, barbers[i]._experience, barbers[i]._salary, barbers[i]._rating, barbers[i]._fired);
        this._barbersModel.setBarber(barber);
    }

    this._barbersValidator = new Validator(this._barbersModel.getBarbers());

    drawBarbersInfo();
    clearCurrentHeaderFunc();

    for (let i = 0; i < this._barbersModel.getBarbers().length; i++) {
        drawBarber(i + 1, this._barbersModel.getBarbers()[i]);
    }

    this._view._addBarber = document.getElementById('addBarberButton');
    this._view._configAddBarber = document.getElementById('configAddBarber');

    this._view._addBarber.onclick = clickAddBarber;
    this._view._configAddBarber.onclick = clickConfigAddBarber;
};

const clickConfigAddBarber = () => {
    this._view._age = document.getElementById('age');
    this._view._email = document.getElementById('email');
    this._view._salary = document.getElementById('salary');
    this._view._rating = document.getElementById('rating');
    this._view._lastName = document.getElementById('lastName');
    this._view._firstName = document.getElementById('firstName');
    this._view._experience = document.getElementById('experience');

    const data = {
        firstName: this._view._firstName.value,
        lastName: this._view._lastName.value,
        email: this._view._email.value,
        age: this._view._age.value,
        experience: this._view._experience.value,
        salary: this._view._salary.value,
        rating: this._view._rating.value,
        fired: '-',
    };

    let url = '/configAddBarber';

    if (this._barbersValidator.isValidSignUp(data.firstName, data.lastName, data.email, data.age, data.experience, data.salary, data.rating, data.fired)) {
        if (!this._barbersValidator.isSignedUp(data.email)) {
            this._sendData.postRequest(url, data, rez => {
                if (rez) {
                    let newAddedBarber = JSON.parse(rez);

                    const newBarber = new Barber(newAddedBarber._firstName, newAddedBarber._lastName, newAddedBarber._email, newAddedBarber._age, newAddedBarber._experience, newAddedBarber._salary, newAddedBarber._rating, newAddedBarber._fired);
                    this._barbersModel.setBarber(newBarber);
                    this._barbersValidator = new Validator(this._barbersModel.getBarbers());
                }
            });

            clickWatchBarbers();
        } else {
            alert('Email already signed up!');
        }
    } else {
        alert('Wrong input data!');
    }
};

const clickAddBarber = () => {
    document.getElementById('modal__back').setAttribute('style', 'visibility: visible;');

    this._view._cancelAddBarber = document.getElementById('cancel');

    this._view._cancelAddBarber.onclick = clickCancelAddBarbers;
};

const clickCancelAddBarbers = () => {
    document.getElementById('modal__back').setAttribute('style', 'visibility: hidden;');
};

const openModalChangeSalary = email => {
    document.getElementById('modal__back_changeSalary').setAttribute('style', 'visibility: visible;');

    this._view._configChangeSalaryBarber = document.getElementById('confirmChangeBarberSalary');
    this._view._cancelChangeSalaryBarber = document.getElementById('cancelChangeBarberSalary');
    this._view._currentSalaryBeforeChange = email;

    const currentBarber = this._barbersModel.getBarberByEmail(this._view._currentSalaryBeforeChange);

    document.getElementById('emailChange').textContent = currentBarber._email;
    document.getElementById('lastNameChange').textContent = currentBarber._lastName;
    document.getElementById('firstNameChange').textContent = currentBarber._firstName;
    document.getElementById('currentSalaryChange').textContent = currentBarber._salary;

    this._view._configChangeSalaryBarber.onclick = clickConfigChangeSalaryBarber;
    this._view._cancelChangeSalaryBarber.onclick = clickCancelChangeSalaryBarber;
};

const openModalChangePrice = type => {
    document.getElementById('modal__back_changeSalary').setAttribute('style', 'visibility: visible;');

    this._view._configChangeSalaryBarber = document.getElementById('confirmChangeServicePrice');
    this._view._cancelChangeSalaryBarber = document.getElementById('cancelChangeServicePrice');
    this._view._currentSalaryBeforeChange = type;

    const currentService = this._servicesModel.getServiceByType(this._view._currentSalaryBeforeChange);

    document.getElementById('typeChange').textContent = currentService._type;
    document.getElementById('priceChange').textContent = currentService._price;

    this._view._configChangeSalaryBarber.onclick = clickConfigChangePriceService;
    this._view._cancelChangeSalaryBarber.onclick = clickCancelChangePriceService;
};

const openModalChangePriceStoreItem = type => {
    document.getElementById('modal__back_changeStoreItem').setAttribute('style', 'visibility: visible;');

    this._view._configChangeSalaryBarber = document.getElementById('confirmChangeStoreItemPrice');
    this._view._cancelChangeSalaryBarber = document.getElementById('cancelChangeStoreItemPrice');
    this._view._currentSalaryBeforeChange = type;

    const currentService = this._storeModel.getStorePriceByType(this._view._currentSalaryBeforeChange);

    document.getElementById('typeChange').textContent = currentService._type;
    document.getElementById('priceChange').textContent = currentService._price;

    this._view._configChangeSalaryBarber.onclick = clickConfigChangePriceStoreItem;
    this._view._cancelChangeSalaryBarber.onclick = clickCancelChangePriceStoreItem;
};

const clickConfigChangePriceStoreItem = async () => {
    const data = {
        type: this._view._currentSalaryBeforeChange,
        newPrice: document.getElementById('newPriceStoreItem').value,
    };

    let url = '/changePriceStoreItem';

    this._sendData.postRequest(url, data, () => {
    });

    await clickWatchStore();
};

const clickCancelChangePriceStoreItem = () => {
    document.getElementById('modal__back_changeStoreItem').setAttribute('style', 'visibility: hidden;')
};

const clickConfigChangePriceService = async () => {
    const data = {
        type: this._view._currentSalaryBeforeChange,
        newPrice: document.getElementById('newPrice').value,
    };

    let url = '/changePriceService';

    this._sendData.postRequest(url, data, () => {
    });

    await clickWatchServices();
};

const clickCancelChangePriceService = () => {
    document.getElementById('modal__back_changeSalary').setAttribute('style', 'visibility: hidden;')
};

const clickConfigChangeSalaryBarber = async () => {
    const data = {
        email: this._view._currentSalaryBeforeChange,
        newSalary: document.getElementById('newSalary').value,
    };

    let url = '/changeSalaryBarber';

    this._sendData.postRequest(url, data, () => {
    });

    await clickWatchBarbers();
};

const clickCancelChangeSalaryBarber = () => {
    document.getElementById('modal__back_changeSalary').setAttribute('style', 'visibility: hidden;')
};

const clickDeleteUser = email => {
    document.getElementById('modal__back_confirmDeleteUser').setAttribute('style', 'visibility: visible');

    this._view._currentServiceTypeforDelete = email;

    const user = this._usersModel.getUserByEmail(this._view._currentServiceTypeforDelete);
    let tempSpan;
    let arrayServicesValues = [
        user._firstName,
        user._lastName,
        user._email,
        user._date,
    ];
    const arrayValues = ['firstNameDeleteUser', 'lastNameDeleteUser', 'emailDeleteUser', 'dateDeleteUser'];

    for (let i = 0; i < arrayValues.length; i++) {
        tempSpan = document.getElementById(arrayValues[i]);
        tempSpan.textContent = arrayServicesValues[i];
    }

    this._view._confirmDeleteService = document.getElementById('confirmDeleteUser');
    this._view._cancelDeleteService = document.getElementById('cancelDeleteUser');

    this._view._confirmDeleteService.onclick = confirmDeleteUser;
    this._view._cancelDeleteService.onclick = cancelDeleteUser;
};

const confirmDeleteUser = async () => {
    let email = this._usersModel.getUserByEmail(this._view._currentServiceTypeforDelete)._email;
    let tempUser = this._usersModel.getUserByEmail(this._view._currentServiceTypeforDelete);
    let data = {email};

    if (tempUser._userType === 'user') {
        this._sendData.postRequest('/setBlackUser', data, () => {
        });
    } else if (tempUser._userType === 'blackList') {
        this._sendData.postRequest('/setUser', data, () => {});
    }

    if (tempUser._userType === 'user') {
        await clickUsersAdmin();
    } else if (tempUser._userType === 'blackList') {
        await clickWatchBlackList();
    }
};

const clickWatchBlackList = async () => {
    let users = await sendAjaxRequest('/getUsersDataFromDB');
    console.log(users);
    let user = null;
    this._usersModel = new Model()._users;

    for (let i = 0; i < users.length; i++) {
        user = new User(users[i]._firstName, users[i]._lastName, users[i]._date, users[i]._email, users[i]._password, users[i]._userType);
        this._usersModel.setUser(user);
    }

    drawBlackListUsers();
    clearCurrentHeaderFunc();

    users = this._usersModel.getUsers();

    for (let i = 0, j = 1; i < users.length; i++) {
        if (users[i]._userType === 'blackList') {
            drawUser(j, users[i]);
            j++;
        }
    }
};

const cancelDeleteUser = () => {
    document.getElementById('modal__back_confirmDeleteUser').setAttribute('style', 'visibility: hidden');
};

const clickUsersAdmin = async () => {
    let users = await sendAjaxRequest('/getUsersDataFromDB');
    let user = null;
    this._usersModel = new Model()._users;

    for (let i = 0; i < users.length; i++) {
        user = new User(users[i]._firstName, users[i]._lastName, users[i]._date, users[i]._email, users[i]._password, users[i]._userType);
        this._usersModel.setUser(user);
    }

    drawUsersInfo();
    clearCurrentHeaderFunc();

    users = this._usersModel.getUsers();

    for (let i = 0, j = 1; i < users.length; i++) {
        if (users[i]._userType === 'user') {
            drawUser(j, users[i]);
            j++;
        }
    }
};

const clickSubmitSignUp = () => {
    drawSingUpContent();
    clearCurrentHeaderFunc();

    this._view._firstName = document.getElementById('firstName');
    this._view._lastName = document.getElementById('lastName');
    this._view._date = document.getElementById('date');
    this._view._email = document.getElementById('email');
    this._view._password = document.getElementById('password');
    this._view._config = document.getElementById('config');

    this._view._submitOkSignUp = document.getElementById('buttonOkSignUp');
    this._view._submitOkSignUp.onclick = clickSubmitOkSignUp;
};

const clickSubmitOkSignUp = () => {
    const data = {
        firstName: this._view._firstName.value,
        lastName: this._view._lastName.value,
        date: this._view._date.value,
        email: this._view._email.value,
        password: this._view._password.value,
        config: this._view._config.value,
    };

    let url = '/signUp';

    if (this._usersValidator.isValidSignUp(data.firstName, data.lastName, data.date, data.email, data.password, data.config)) {
        if (!this._usersValidator.isSignedUp(data.email)) {
            if (this._usersValidator.isValidPassword(data.password, data.config)) {
                this._sendData.postRequest(url, data, rez => {
                    if (rez) {
                        let newSignedUpUser = rez;
                        newSignedUpUser = JSON.parse(newSignedUpUser);

                        const newUser = new User(newSignedUpUser._firstName, newSignedUpUser._lastName, newSignedUpUser._date, newSignedUpUser._email, newSignedUpUser._password, newSignedUpUser._userType);
                        this._usersModel.setUser(newUser);
                        this._usersValidator = new Validator(this._usersModel.getUsers());
                        clickLogIn();
                    }
                });
            } else {
                alert('Did not match password!');
            }
        } else {
            alert('Email already signed up!');
        }
    } else {
        alert('Wrong input data!');
    }
};

const openModalSuccessRecorder = data => {
    document.getElementById('modal__back_record').setAttribute('style', 'visibility: visible;');

    const {firstName, email, dateTime, service, barber} = data;

    const date = dateTime.slice(0, 10);

    const time = dateTime.slice(11);

    let sendBarber = this._barbersModel.getBarberByEmail(barber);

    const image = getNumberOfImage(sendBarber._email, this._view._imagesObject.imagesArray);

    sendBarber = `${sendBarber._firstName} ${sendBarber._lastName}, почта барбера - ${sendBarber._email}`;

    const sendData = {firstName, email, date, time, service, sendBarber, image};

    this._sendData.postRequest('/sendEmail', sendData, () => {});
};

const closeModalSuccessRecorder = () => {
    document.getElementById('modal__back_record').setAttribute('style', 'visibility: hidden;');
    clearCurrentHeaderFunc();
    clearCurrentHeaderItem();
    console.log(this._currentUser);
    drawHomeContent(this._currentUser);
    document.getElementById('home').classList.add('currentHeaderItem');

    this._view = new View();
    this._view.getAllIdMenu();

    this._view._home.onclick = clickHome;
    this._view._service.onclick = clickServices;
    this._view._barbers.onclick = clickBarbers;
    this._view._store.onclick = clickStore;

    if (this._currentUser) {
        this._view._logOut.onclick = clickLogOut;
    } else {
        this._view._logIn.onclick = clickLogIn;
    }
    this._view._record.onclick = clickRecord;
    this._view._scrollDown.onclick = clickScrollDown;
    this._view._recording.onclick = clickRecord;
};

const clickSetRecord = () => {
    let data;
    if (!this._currentUser) {
         data = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            dateTime: `${document.getElementById('date').value}.${document.getElementById('time').value}`,
            service: document.getElementById('selectService').value.split(',')[0],
            barber: document.getElementById('select').value.split(' ')[2],
        };
    } else {
        data = {
            firstName: this._currentUser._firstName,
            lastName: this._currentUser._lastName,
            email: this._currentUser._email,
            dateTime: `${document.getElementById('date').value}.${document.getElementById('time').value}`,
            service: document.getElementById('selectService').value.split(',')[0],
            barber: document.getElementById('select').value.split(' ')[2],
        };
    }

    let url = '/addRecords';

    if (isInput(data.firstName) && data.firstName.search(/\d/g) === -1) {
        if (isInput(data.lastName && data.lastName.search(/\d/g) === -1)) {
            if (isInput(data.email) && data.email.search(/@gmail\.com/g) !== -1) {
                if (data.dateTime !== 'не выбрана.не выбрано') {
                    if (data.barber !== 'не выбран') {
                        if (data.service !== 'не выбрана') {
                            this._sendData.postRequest(url, data, res => {
                                const newRecord = JSON.parse(res);

                                this._recordsModel.setRecord(newRecord);
                            });

                            openModalSuccessRecorder(data);
                        } else {
                            alert('Не выбрана услуга');
                        }
                    } else {
                        alert('Не выбран бырбер');
                    }
                } else {
                    alert('Не выбрана точная дата и время');
                }
            } else {
                alert('Неверная почта! Поле должно содержать "@gmail.com" конце.');
            }
        } else {
            alert('Неверная фамилия! Поле не должно быть  пустым или содержать числа.');
        }
    } else {
        alert('Неверное имя! Поле не должно быть  пустым или содержать числа.');
    }
};

const setFreeTimesToBarber = () => {
    const date = document.getElementById('date').value;
    const barber = document.getElementById('select');
    const tempRecords = this._recordsModel.getRecords();

    let option;

    const time = document.getElementById('time');

    if (barber.value !== 'не выбран') {
        time.removeAttribute('onchange');
    } else {
        time.setAttribute('onchange', 'setFreeBarbersToTime()');
    }

    time.innerHTML = '';

    option = document.createElement('option');
    option.setAttribute('class', 'select__option');
    option.setAttribute('id', 'noneTime');
    option.setAttribute('selected', 'selected');
    option.textContent = 'не выбрано';

    time.append(option);

    const currentDay = new Date().toDateString().split(' ')[2];
    const selectedDay = date.slice(0, 2);

    for (let i = (currentDay === selectedDay) && (new Date().getHours() <= 20 || new Date().getHours() > 9) ? new Date().getHours() + 2 : 10; i < 21; i++) {
        option = document.createElement('option');
        option.setAttribute('class', 'select__option');
        option.setAttribute('id', `${i}:00`);
        option.textContent = `${i}:00`;

        for (let j = 0; j < tempRecords.length; j++) {
            if (date === tempRecords[j]._dateTime.slice(0, 10) && barber.value.split(' ')[2] === tempRecords[j]._barber && option.textContent === tempRecords[j]._dateTime.slice(11)) {
                option.setAttribute('style', 'display: none');
                break;
            }
        }

        time.append(option);
    }
};

const setFreeBarbersToTime = () => {
    const dateTime = `${document.getElementById('date').value}.${document.getElementById('time').value}`;

    const tempRecords = this._recordsModel.getRecords();

    const barbers = document.getElementById('select');

    const time = document.getElementById('time');

    if (time.value !== 'не выбрано') {
        barbers.removeAttribute('onchange');
    } else {
        barbers.setAttribute('onchange', 'setFreeTimesToBarber()');
    }

    barbers.innerText = '';

    const barbersList = this._barbersModel.getBarbers();

    let option;

    option = document.createElement('option');
    option.setAttribute('class', 'select__option');
    option.setAttribute('id', 'noneBarber');
    option.setAttribute('selected', 'selected');
    option.textContent = 'не выбран';

    barbers.append(option);

    for (let i = 0; i < barbersList.length; i++) {
        option = document.createElement('option');
        option.setAttribute('class', 'select__option');
        option.setAttribute('id', barbersList[i]._email);
        option.textContent = `${barbersList[i]._firstName} ${barbersList[i]._lastName}, ${barbersList[i]._email}`;

        for (let j = 0; j < tempRecords.length; j++) {
            if (dateTime === tempRecords[j]._dateTime) {
                if (barbersList[i]._email === tempRecords[j]._barber) {
                    option.setAttribute('style', 'display: none;');
                    break;
                }
            }
        }

        barbers.append(option);
    }
};

const setOnChangeBarbersAndHours = () => {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time');
    const barbers = document.getElementById('select');

    if (date !== 'не выбрана') {
        time.setAttribute('onchange', 'setFreeBarbersToTime()');
        barbers.setAttribute('onchange', 'setFreeTimesToBarber()');
    } else {
        time.setAttribute('onchange', 'setOnChangeFreeDaysAndBarbers()');
        barbers.setAttribute('onchange', 'setOnChangeFreeDaysAndHours()');
    }

    const currentDay = new Date().toDateString().split(' ')[2];
    const selectedDay = date.slice(0, 2);
    let option;

    let amountTimes = 0;

    time.innerHTML = '';
    option = document.createElement('option');
    option.setAttribute('class', 'select__option');
    option.setAttribute('id', 'noneTime');
    option.setAttribute('selected', 'selected');
    option.textContent = 'не выбрано';

    time.append(option);

    for (let i = (currentDay === selectedDay) && (new Date().getHours() <= 20 || new Date().getHours() > 9) ? new Date().getHours() + 2 : 10; i < 21; i++) {
        option = document.createElement('option');
        option.setAttribute('class', 'select__option');
        option.setAttribute('id', `${i}:00`);
        option.textContent = `${i}:00`;

        time.append(option);

        amountTimes++;
    }

    barbers.innerHTML = '';

    const barbersList = this._barbersModel.getBarbers();

    option = document.createElement('option');
    option.setAttribute('class', 'select__option');
    option.setAttribute('id', 'noneBarber');
    option.setAttribute('selected', 'selected');
    option.textContent = 'не выбран';

    barbers.append(option);

    let arrayNotFreeBarbers = [];

    for (let i = 0; i < barbersList.length; i++) {
        option = document.createElement('option');
        option.setAttribute('class', 'select__option');
        option.setAttribute('id', barbersList[i]._email);
        option.textContent = `${barbersList[i]._firstName} ${barbersList[i]._lastName}, ${barbersList[i]._email}`;

        arrayNotFreeBarbers[i] = 0;

        for (let j = 0; j < this._recordsModel.getRecords().length; j++) {
            if (barbersList[i]._email === this._recordsModel.getRecords()[j]._barber) {
                arrayNotFreeBarbers[i]++;
            }
        }

        if (arrayNotFreeBarbers[i] === amountTimes) {
            option.setAttribute('style', 'display: none;');
        }

        barbers.append(option);
    }
};

const setFreeBarbersByDay = () => {
    const dateTime = `${document.getElementById('date').value}.${document.getElementById('time').value}`;

    const tempRecords = this._recordsModel.getRecords();

    const barbers = document.getElementById('select');

    const date = document.getElementById('date');

    if (date.value !== 'не выбрана') {
        barbers.removeAttribute('onchange');
    } else {
        barbers.setAttribute('onchange', 'setFreeDaysByBarber()');
    }

    barbers.innerText = '';

    const barbersList = this._barbersModel.getBarbers();

    let option;

    option = document.createElement('option');
    option.setAttribute('class', 'select__option');
    option.setAttribute('id', 'noneBarber');
    option.setAttribute('selected', 'selected');
    option.textContent = 'не выбран';

    barbers.append(option);

    for (let i = 0; i < barbersList.length; i++) {
        option = document.createElement('option');
        option.setAttribute('class', 'select__option');
        option.setAttribute('id', barbersList[i]._email);
        option.textContent = `${barbersList[i]._firstName} ${barbersList[i]._lastName}, ${barbersList[i]._email}`;

        for (let j = 0; j < tempRecords.length; j++) {
            if (dateTime === tempRecords[j]._dateTime) {
                if (barbersList[i]._email === tempRecords[j]._barber) {
                    option.setAttribute('style', 'display: none;');
                    break;
                }
            }
        }

        barbers.append(option);
    }
};

const setFreeDaysByBarber = () => {
    const time = document.getElementById('time').value;
    const barber = document.getElementById('select');
    const date = document.getElementById('date');
    const tempRecords = this._recordsModel.getRecords();

    let option;

    if (barber.value !== 'не выбран') {
        date.removeAttribute('onchange');
    } else {
        date.setAttribute('onchange', 'setFreeBarbersByDay()');
    }

    date.innerHTML = '';

    option = document.createElement('option');
    option.setAttribute('class', 'select__option');
    option.setAttribute('id', 'noneDate');
    option.setAttribute('selected', 'selected');
    option.textContent = 'не выбрана';

    date.append(option);

    let dateArray = [], dateObject;

    for (let i = 0; i < 7; i++) {
        dateObject = {
            day: new Date().getDate() + i,
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
        };

        dateArray.push(new Date(dateObject.year, dateObject.month, dateObject.day).toDateString().split(' '));
    }

    if (new Date().getHours() + 2 >= 20) {
        dateArray.push(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7).toDateString().split(' '));
        dateArray.shift();
    }

    let tempMonth;

    for (let i = 0; i < 7; i++) {
        option = document.createElement('option');
        option.setAttribute('class', 'select__option');
        option.setAttribute('id', dateArray[i].join(''));

        switch (dateArray[i][1]) {
            case 'Jan':
                tempMonth = 1;
                break;
            case 'Feb':
                tempMonth = 2;
                break;
            case 'Mar':
                tempMonth = 3;
                break;
            case 'Apr':
                tempMonth = 4;
                break;
            case 'May':
                tempMonth = 5;
                break;
            case 'Jun':
                tempMonth = 6;
                break;
            case 'Jul':
                tempMonth = 7;
                break;
            case 'Aug':
                tempMonth = 8;
                break;
            case 'Sep':
                tempMonth = 9;
                break;
            case 'Out':
                tempMonth = 10;
                break;
            case 'Nov':
                tempMonth = 11;
                break;
            case 'Dec':
                tempMonth = 12;
                break;
        }

        if (Number(time.slice(0, 2)) < new Date().getHours() + 2 && Number(dateArray[i][2]) === new Date().getDate()) {
            option.setAttribute('style', 'display: none;');
        }

        option.textContent = `${dateArray[i][2]}.${tempMonth}.${dateArray[i][3]}`;

        date.append(option);
    }
};

const setOnChangeFreeDaysAndBarbers = () => {
    const time = document.getElementById('time').value;
    const date = document.getElementById('date');
    const barber = document.getElementById('select');

    if (time !== 'не выбрано') {
        date.setAttribute('onchange', 'setFreeBarbersByDay()');
        barber.setAttribute('onchange', 'setFreeDaysByBarber()');
    } else {
        date.setAttribute('onchange', 'setOnChangeBarbersAndHours()');
        barber.setAttribute('onchange', 'setOnChangeFreeDaysAndHours()');
    }

    date.innerHTML = '';

    let option;

    let dateArray = [], dateObject = {};

    for (let i = 0; i < 7; i++) {
        dateObject = {
            day: new Date().getDate() + i,
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
        };

        dateArray.push(new Date(dateObject.year, dateObject.month, dateObject.day).toDateString().split(' '));
    }

    if (new Date().getHours() >= 20) {
        dateArray.push(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7).toDateString().split(' '));
        dateArray.shift();
    }

    option = document.createElement('option');
    option.setAttribute('class', 'select__option');
    option.setAttribute('id', 'noneDate');

    option.setAttribute('selected', 'selected');

    option.textContent = 'не выбрана';

    date.append(option);

    let tempMonth;

    let amountDays = 0;

    for (let i = 0; i < 7; i++) {
        option = document.createElement('option');
        option.setAttribute('class', 'select__option');
        option.setAttribute('id', dateArray[i].join(''));

        switch (dateArray[i][1]) {
            case 'Jan':
                tempMonth = 1;
                break;
            case 'Feb':
                tempMonth = 2;
                break;
            case 'Mar':
                tempMonth = 3;
                break;
            case 'Apr':
                tempMonth = 4;
                break;
            case 'May':
                tempMonth = 5;
                break;
            case 'Jun':
                tempMonth = 6;
                break;
            case 'Jul':
                tempMonth = 7;
                break;
            case 'Aug':
                tempMonth = 8;
                break;
            case 'Sep':
                tempMonth = 9;
                break;
            case 'Out':
                tempMonth = 10;
                break;
            case 'Nov':
                tempMonth = 11;
                break;
            case 'Dec':
                tempMonth = 12;
                break;
        }

        if (Number(time.slice(0, 2)) < new Date().getHours() + 2 && Number(dateArray[i][2]) === new Date().getDate()) {
            option.setAttribute('style', 'display: none;');
        } else {
            amountDays++;
        }

        option.textContent = `${dateArray[i][2]}.${tempMonth}.${dateArray[i][3]}`;

        date.append(option);
    }

    barber.innerHTML = '';

    const barbersList = this._barbersModel.getBarbers();

    option = document.createElement('option');
    option.setAttribute('class', 'select__option');
    option.setAttribute('id', 'noneBarber');
    option.setAttribute('selected', 'selected');
    option.textContent = 'не выбран';

    barber.append(option);

    let arrayNotFreeBarbers = [];

    for (let i = 0; i < barbersList.length; i++) {
        option = document.createElement('option');
        option.setAttribute('class', 'select__option');
        option.setAttribute('id', barbersList[i]._email);
        option.textContent = `${barbersList[i]._firstName} ${barbersList[i]._lastName}, ${barbersList[i]._email}`;

        arrayNotFreeBarbers[i] = 0;

        for (let j = 0; j < this._recordsModel.getRecords().length; j++) {
            if (barbersList[i]._email === this._recordsModel.getRecords()[j]._barber && this._recordsModel.getRecords()[j]._dateTime.slice(11) === time) {
                arrayNotFreeBarbers[i]++;
            }
        }

        if (arrayNotFreeBarbers[i] === amountDays) {
            option.setAttribute('style', 'display: none;');
        }

        barber.append(option);
    }
};

const setFreeHoursByDay = () => {
    const tempRecords = this._recordsModel.getRecords();

    const barber = document.getElementById('select');

    const time = document.getElementById('time');

    const date = document.getElementById('date');

    if (date.value !== 'не выбрана') {
        time.removeAttribute('onchange');
    } else {
        time.setAttribute('onchange', 'setFreeDaysByHour()');
    }

    time.innerText = '';

    let option;
    const currentDay = new Date().toDateString().split(' ')[2];
    const selectedDay = date.value.slice(0, 2);

    option = document.createElement('option');
    option.setAttribute('class', 'select__option');
    option.setAttribute('id', 'noneTime');
    option.setAttribute('selected', 'selected');
    option.textContent = 'не выбрано';

    time.append(option);

    for (let i = (currentDay === selectedDay) && (new Date().getHours() <= 20 || new Date().getHours() > 9) ? new Date().getHours() + 2 : 10; i < 21; i++) {
        option = document.createElement('option');
        option.setAttribute('class', 'select__option');
        option.setAttribute('id', `${i}:00`);
        option.textContent = `${i}:00`;

        for (let j = 0; j < tempRecords.length; j++) {
            if (`${date.value}.${i}:00` === tempRecords[j]._dateTime && barber.value.split(' ')[2] === tempRecords[j]._barber) {
                option.setAttribute('style', 'display: none;');
            }
        }

        time.append(option);
    }
};

const setFreeDaysByHour = () => {
    const tempRecords = this._recordsModel.getRecords();

    const barber = document.getElementById('select');

    const time = document.getElementById('time');

    const date = document.getElementById('date');

    if (time.value !== 'не выбрано') {
        date.removeAttribute('onchange');
    } else {
        date.setAttribute('onchange', 'setFreeDaysByHour()');
    }

    date.innerText = '';

    let option;

    let dateArray = [], dateObject = {};

    for (let i = 0; i < 7; i++) {
        dateObject = {
            day: new Date().getDate() + i,
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
        };

        dateArray.push(new Date(dateObject.year, dateObject.month, dateObject.day).toDateString().split(' '));
    }

    if (new Date().getHours() + 2 >= 20) {
        dateArray.push(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7).toDateString().split(' '));
        dateArray.shift();
    }

    option = document.createElement('option');
    option.setAttribute('class', 'select__option');
    option.setAttribute('id', 'noneDate');

    option.setAttribute('selected', 'selected');

    option.textContent = 'не выбрана';

    date.append(option);

    let tempMonth;

    let amountNotFreeHoursDay = [];

    for (let i = 0; i < 7; i++) {
        option = document.createElement('option');
        option.setAttribute('class', 'select__option');
        option.setAttribute('id', dateArray[i].join(''));

        switch (dateArray[i][1]) {
            case 'Jan':
                tempMonth = 1;
                break;
            case 'Feb':
                tempMonth = 2;
                break;
            case 'Mar':
                tempMonth = 3;
                break;
            case 'Apr':
                tempMonth = 4;
                break;
            case 'May':
                tempMonth = 5;
                break;
            case 'Jun':
                tempMonth = 6;
                break;
            case 'Jul':
                tempMonth = 7;
                break;
            case 'Aug':
                tempMonth = 8;
                break;
            case 'Sep':
                tempMonth = 9;
                break;
            case 'Out':
                tempMonth = 10;
                break;
            case 'Nov':
                tempMonth = 11;
                break;
            case 'Dec':
                tempMonth = 12;
                break;
        }

        amountNotFreeHoursDay[i] = 0;

        for (let j = 0; j < tempRecords.length; j++) {
            if (`${dateArray[i][2]}.${tempMonth}.${dateArray[i][3]}.${time.value}` === tempRecords[j]._dateTime && barber.value.split(' ')[2] === tempRecords[j]._barber) {
                option.setAttribute('style', 'display: none;');
            }
        }

        option.textContent = `${dateArray[i][2]}.${tempMonth}.${dateArray[i][3]}`;

        date.append(option);
    }
};

const setOnChangeFreeDaysAndHours = () => {
    const barber = document.getElementById('select').value;
    const date = document.getElementById('date');
    const time = document.getElementById('time');

    if (barber !== 'не выбран') {
        date.setAttribute('onchange', 'setFreeHoursByDay()');
        time.setAttribute('onchange', 'setFreeDaysByHour()');
    } else {
        date.setAttribute('onchange', 'setOnChangeBarbersAndHours()');
        time.setAttribute('onchange', 'setOnChangeFreeDaysAndBarbers()');
    }

    date.innerHTML = '';

    let option;

    let dateArray = [], dateObject = {};

    for (let i = 0; i < 7; i++) {
        dateObject = {
            day: new Date().getDate() + i,
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
        };

        dateArray.push(new Date(dateObject.year, dateObject.month, dateObject.day).toDateString().split(' '));
    }

    if (new Date().getHours() + 2 >= 20) {
        dateArray.push(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7).toDateString().split(' '));
        dateArray.shift();
    }

    option = document.createElement('option');
    option.setAttribute('class', 'select__option');
    option.setAttribute('id', 'noneDate');

    option.setAttribute('selected', 'selected');

    option.textContent = 'не выбрана';

    date.append(option);

    let tempMonth;

    let amountNotFreeHoursDay = [];

    for (let i = 0; i < 7; i++) {
        option = document.createElement('option');
        option.setAttribute('class', 'select__option');
        option.setAttribute('id', dateArray[i].join(''));

        switch (dateArray[i][1]) {
            case 'Jan':
                tempMonth = 1;
                break;
            case 'Feb':
                tempMonth = 2;
                break;
            case 'Mar':
                tempMonth = 3;
                break;
            case 'Apr':
                tempMonth = 4;
                break;
            case 'May':
                tempMonth = 5;
                break;
            case 'Jun':
                tempMonth = 6;
                break;
            case 'Jul':
                tempMonth = 7;
                break;
            case 'Aug':
                tempMonth = 8;
                break;
            case 'Sep':
                tempMonth = 9;
                break;
            case 'Out':
                tempMonth = 10;
                break;
            case 'Nov':
                tempMonth = 11;
                break;
            case 'Dec':
                tempMonth = 12;
                break;
        }

        amountNotFreeHoursDay[i] = 0;

        for (let j = 0; j < this._recordsModel.getRecords().length; j++) {
            if (dateArray[i][2] === this._recordsModel.getRecords()[j]._dateTime.slice(0, 2) && barber.split(' ')[2] === this._recordsModel.getRecords()[j]._barber) {
                amountNotFreeHoursDay[i]++;
            }
        }

        if (amountNotFreeHoursDay[i] === 11) {
            option.setAttribute('style', 'display: none;');
        }

        option.textContent = `${dateArray[i][2]}.${tempMonth}.${dateArray[i][3]}`;

        date.append(option);
    }

    time.innerHTML = '';

    const currentDay = new Date().toDateString().split(' ')[2];
    const selectedDay = date.value.slice(0, 2);

    option = document.createElement('option');
    option.setAttribute('class', 'select__option');
    option.setAttribute('id', 'noneTime');
    option.setAttribute('selected', 'selected');
    option.textContent = 'не выбрано';

    time.append(option);

    let arrayNotFreeDays = [];

    for (let i = (currentDay === selectedDay) && (new Date().getHours() <= 20 || new Date().getHours() > 9) ? new Date().getHours() + 2 : 10; i < 21; i++) {
        option = document.createElement('option');
        option.setAttribute('class', 'select__option');
        option.setAttribute('id', `${i}:00`);
        option.textContent = `${i}:00`;

        arrayNotFreeDays[i] = 0;

        for (let j = 0; j < this._recordsModel.getRecords().length; j++) {
            if (barber.split(' ')[2] === this._recordsModel.getRecords()[j]._barber && `${i}:00` === this._recordsModel.getRecords()[j]._dateTime.slice(11)) {
                arrayNotFreeDays[i]++;
            }
        }

        if (arrayNotFreeDays[i] === 7) {
            option.setAttribute('style', 'display: none;');
        }


        time.append(option);
    }
};

const clickRecord = async () => {
    let users = await sendAjaxRequest('/getUsersDataFromDB');
    let user = null;

    this._usersModel = new Model()._users;

    for (let i = 0; i < users.length; i++) {
        user = new User(users[i]._firstName, users[i]._lastName, users[i]._date, users[i]._email, users[i]._password, users[i]._userType);
        this._usersModel.setUser(user);
    }

    let barbers = await sendAjaxRequest('/getBarbersDataFromDB');
    let barber = null;

    this._barbersModel = new Model()._barbers;

    for (let i = 0; i < barbers.length; i++) {
        if (barbers[i]._fired === '-') {
            barber = new Barber(barbers[i]._firstName, barbers[i]._lastName, barbers[i]._email, barbers[i]._age, barbers[i]._experience, barbers[i]._salary, barbers[i]._rating, barbers[i]._fired);
            this._barbersModel.setBarber(barber);
        }
    }

    let services = await sendAjaxRequest('/getServicesDataFromDB');
    let service = null;

    this._servicesModel = new Model()._services;

    for (let i = 0; i < services.length; i++) {
        service = new Service(services[i]._type, services[i]._price);
        this._servicesModel.setService(service);
    }

    let records = await sendAjaxRequest('/getRecordsDataFromDB');
    let record = null;

    this._recordsModel = new Model()._records;

    for (let i = 0; i < records.length; i++) {
        record = new Record(records[i]._firstName, records[i]._lastName, records[i]._email, records[i]._dateTime, records[i]._service, records[i]._barber);
        this._recordsModel.setRecord(record);
    }

    drawRecordContent(this._servicesModel.getServices(), this._barbersModel.getBarbers(), this._view._defaultBarber, this._view._defaultService, this._currentUser, this._recordsModel.getRecords());
    clearCurrentHeaderItem();
    clearCurrentHeaderFunc();

    document.getElementById('record').classList.add('currentHeaderItem');

    this._view._setRecord = document.getElementById('buttonRecord');
    this._view._setRecord.onclick = clickSetRecord;
};

const clickScrollDown = () => {
    drawScrollDown();
    clearCurrentHeaderItem();

    this._view._goToServices = document.getElementById('goToServices');
    this._view._goToBarbers = document.getElementById('goToBarbers');
    this._view._goToStore = document.getElementById('goToStore');

    this._view._goToServices.onclick = clickServices;
    this._view._goToBarbers.onclick = clickBarbers;
    this._view._goToStore.onclick = clickStore;
};

const controller = new Controller();
controller.init();