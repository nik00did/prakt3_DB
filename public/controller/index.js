function Controller() {
    this._view = null;
    this._usersModel = null;
    this._barbersModel = null;
    this._servicesModel = null;

    this._sendData = null;

    this._usersValidator = null;
    this._barbersValidator = null;
    this._servicesValidator = null;
}

Controller.prototype.init = () => {
    this._usersModel = new Model()._users;
    this._barbersModel = new Model()._barbers;
    this._servicesModel = new Model()._services;

    this._sendData = new SendToServer();

    this._sendData.postRequest('/getUsersDataFromDB', {x: 10},data => {
        console.log('0000000000000000000000000000000000000000000000000');
        console.log(data, 'users from server db');
        const users = JSON.parse(data);
        let user = null;

        for (let i = 0; i < users.length; i++) {
            user = new User(users[i]._firstName, users[i]._lastName, users[i]._date, users[i]._email, users[i]._password, users[i]._userType);
            this._usersModel.setUser(user);
        }
        console.log(this._usersModel.getUsers(),'client model!!!!!!!');
        console.log(data, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    });

    this._usersValidator = new Validator(this._usersModel.getUsers());
    // this._barbersValidator = new Validator(this._barbersModel._barbers);
    // this._servicesValidator = new Validator(this._servicesModel._services);

    this._view = new View();
    this._view.getAllIdMenu();

    this._view._home.onclick = clickHome;
    this._view._service.onclick = clickServices;
    this._view._barbers.onclick = clickBarbers;
    this._view._logIn.onclick = clickLogIn;

    this._sendData.postRequest('/pushAdminToServer', new User('Nikita', 'Didenko', '02.03.00', '02.nik.03.did.00', '123456789', 'admin'), async data => {
        const temp = await JSON.parse(data);
        const admin = new User(temp._firstName, temp._lastName, temp._date, temp._email, temp._password, temp._userType);
        this._usersModel.setUser(admin);
        console.log(this._usersModel.getUsers(), 'client model!!!!!!!!!!!!1');
        this._usersValidator = new Validator(this._usersModel.getUsers());
    });
};

const clickHome = () => {
    drawHomeContent();
};

const clickServices = () => {
    drawServicesContent();
};

const clickBarbers = () => {
    drawBarbersContent();
};


const clickLogIn = () => {
    drawLogInContent();

    this._view._submitLogIn = document.getElementById('submitLogIn');
    this._view._submitLogIn.onclick = clickSubmitLogIn;

    this._view._submitSignUp = document.getElementById('submitSignUp');
    this._view._submitSignUp.onclick = clickSubmitSignUp;

    // this._sendData.postRequest('/pushAdminToServer', new User('Nikita', 'Didenko', '02.03.00', '02.nik.03.did.00', '123456789', 'admin'), async data => {
    //     const temp = await JSON.parse(data);
    //     const admin = new User(temp._firstName, temp._lastName, temp._date, temp._email, temp._password, temp._userType);
    //     this._usersModel.setUser(admin);
    //     console.log(this._usersModel.getUsers(), 'client model!!!!!!!!!!!!1');
    //     this._usersValidator = new Validator(this._usersModel.getUsers());
    // });
};


const clickLogOut = () => {
    drawHomePage();

    this._view = new View();
    this._view.getAllIdMenu();

    this._view._home.onclick = clickHome;
    this._view._service.onclick = clickServices;
    this._view._barbers.onclick = clickBarbers;
    this._view._logIn.onclick = clickLogIn;
};

const clickSubmitLogIn = () => {
    this._view._email = document.getElementById('email');
    this._view._password = document.getElementById('password');

    const data = {
        email: this._view._email.value,
        password: this._view._password.value,
    };

    let url = '/logIn';

    if (this._usersValidator.isValidLogIn(data.email, data.password)) {
        console.log('OK! All input!');
        console.log(this._usersModel.getUsers());
        console.log(this._usersValidator._array);
        if (this._usersValidator.isSignedUp(data.email)) {
            console.log('Found match!');

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
                }
            }

            switch (userType) {
                case 'admin':
                    drawAdminPage();
                    drawHomeContent();
                    this._view._usersAdmin = document.getElementById('users');
                    this._view._usersAdmin.onclick = clickUsersAdmin;
                    break;
                case 'user':
                    //drawUserPage();
                    drawHomeContent();
                    break;
                case 'barber':
                    //drawBarberPage();
                    drawHomeContent();
                    break;
            }

            this._view._logOut = document.getElementById('logOut');
            this._view._logOut.onclick = clickLogOut;
        } else {
            alert('Not found email!');
        }
    } else {
        alert('Wrong input data!');
    }
};

const clickUsersAdmin = () => {
    drawSignedUpUsersContent();

    const users = this._usersModel.getUsers();

    for (let i = 0; i < users.length; i++) {
        if (users[i]._userType === 'user') {
            addTableRow(i , users[i]._firstName, users[i]._lastName, users[i]._date, users[i]._email);
        }
    }
};

const clickSubmitSignUp = () => {
    drawSingUpContent();

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
        console.log('OK! All input!');

        if (!this._usersValidator.isSignedUp(data.email)) {
            console.log('Uniq email!');

            if (this._usersValidator.isValidPassword(data.password, data.config)) {
                console.log('Match password!');

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

const controller = new Controller();
controller.init();