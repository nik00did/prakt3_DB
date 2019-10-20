function drawHomeContent() {
    document.getElementById("main").innerHTML = '';

    const main = document.getElementById('main');

    let div = document.createElement('div');
    div.setAttribute('class', 'main__img');

    let img = document.createElement('img');
    img.setAttribute('alt', 'Hear style');
    img.setAttribute('src', './view/image/icon2.jpg');

    div.append(img);

    main.append(div);

    div = document.createElement('div');
    div.setAttribute('class', 'main__item');

    img = document.createElement('img');
    img.setAttribute('alt', 'Hear style');
    img.setAttribute('src', './view/image/icon.png');

    div.append(img);

    main.append(div);

    div = document.createElement('div');
    div.setAttribute('class', 'main__img');

    img = document.createElement('img');
    img.setAttribute('alt', 'Hear style');
    img.setAttribute('src', './view/image/icon4.jpg');

    div.append(img);

    main.append(div);
}

function addTableRow(number, firstName, lastName, age, experience) {
    const tbody = document.getElementById('tbody');

    const tr = document.createElement('tr');
    tr.setAttribute('class','table__row');

    let td = null, p = null;

    for (let i = 0; i < arguments.length; i++) {
        td = document.createElement('td');
        td.setAttribute('class','table__cell');

        p = document.createElement('p');
        p.textContent = arguments[i];

        td.append(p);

        tr.append(td);
    }

    tbody.append(tr)
}

function drawBarbersContent() {
    document.getElementById("main").innerHTML = '';

    const main = document.getElementById("main");


    const table = document.createElement('table');
    table.setAttribute('class','table');

    const thead = document.createElement('thead');

    const mainTr = document.createElement('tr');
    mainTr.setAttribute('style','height: 50px;');
    mainTr.setAttribute('class','table__row table__row_main');

    let th = null, p = null;
    const array = ['№', 'Имя', 'Фамилия', 'Возраст','Стаж'];

    for (let i = 0; i < array.length; i++) {
        th = document.createElement('th');
        th.setAttribute('class','table__cell');

        p = document.createElement('p');
        p.textContent = array[i];

        th.append(p);

        mainTr.append(th);
    }

    thead.append(mainTr);

    table.append(thead);

    const tbody = document.createElement('tbody');
    tbody.setAttribute('id','tbody');

    table.append(tbody);

    main.append(table);
}

function addServiceItem(type, price) {
    const list = document.getElementById('list');

    const li = document.createElement('li');
    li.setAttribute('class','list__item');

    const div = document.createElement('div');
    div.setAttribute('class','list__item_block');

    let p = document.createElement('p');
    p.textContent = type;

    div.append(p);

    p = document.createElement('p');
    p.textContent = price;

    div.append(p);

    li.append(div);

    list.append(li);
}

function drawServicesContent() {
    document.getElementById('main').innerHTML = '';

    const main = document.getElementById('main');

    const mainItemList = document.createElement('div');
    mainItemList.setAttribute('class','main__item-list');

    const headerText = document.createElement('h1');
    headerText.textContent = 'Услуги';

    mainItemList.append(headerText);

    const mainListsBlock = document.createElement('div');
    mainListsBlock.setAttribute('class','main__lists-block');

    const ul = document.createElement('ul');
    ul.setAttribute('class','list');
    ul.setAttribute('id','list');

    const mainLi = document.createElement('li');
    mainLi.setAttribute('class','list__item');

    const listItemBlock = document.createElement('div');
    listItemBlock.setAttribute('class','list__item_block');

    let p = document.createElement('p');
    p.textContent = 'Вид стрижки';

    listItemBlock.append(p);

    p = document.createElement('p');
    p.textContent = 'Цена';

    listItemBlock.append(p);

    mainLi.append(listItemBlock);

    ul.append(mainLi);
    //
    // for (let i = 0; i < 10; i++) {
    //     addServiceItem('стрижка', 300);
    // }

    mainListsBlock.append(ul);

    mainItemList.append(mainListsBlock);

    main.append(mainItemList);
}

function drawLogInContent() {
    document.getElementById('main').innerHTML = '';

    const main = document.getElementById('main');

    const mainForm = document.createElement('div');
    mainForm.setAttribute('class','main__form');

    const form = document.createElement('form');
    form.setAttribute('class', 'form form__item_menu');
    form.setAttribute('id', 'form');

    const h1 = document.createElement('h1');
    h1.textContent = 'Вход';

    form.append(h1);

    const div = document.createElement('div');

    let formItem = document.createElement('div');
    formItem.setAttribute('class', 'form__item');

    let label = document.createElement('label');
    label.setAttribute('for','email');
    label.textContent = 'Email:';

    formItem.append(label);

    let input = document.createElement('input');
    input.setAttribute('id','email');
    input.setAttribute('type', 'email');

    formItem.append(input);

    div.append(formItem);

    formItem = document.createElement('div');
    formItem.setAttribute('class','form__item');

    label = document.createElement('label');
    label.setAttribute('for','password');
    label.textContent = 'Password:';

    formItem.append(label);

    input = document.createElement('input');
    input.setAttribute('id','password');
    input.setAttribute('type', 'password');

    formItem.append(input);

    div.append(formItem);

    form.append(div);

    const divButtons = document.createElement('div');
    divButtons.setAttribute('class','formDivButtons');

    const buttonLogIn = document.createElement('button');
    buttonLogIn.setAttribute('id', 'submitLogIn');
    buttonLogIn.setAttribute('class', 'form__item form__item_button');
    buttonLogIn.setAttribute('type', 'button');
    buttonLogIn.textContent = 'Вход';

    divButtons.append(buttonLogIn);

    const buttonSignUp = document.createElement('button');
    buttonSignUp.setAttribute('id', 'submitSignUp');
    buttonSignUp.setAttribute('class', 'form__item form__item_button');
    buttonSignUp.setAttribute('type', 'button');
    buttonSignUp.textContent = 'Регистрация';

    divButtons.append(buttonSignUp);

    form.append(divButtons);

    mainForm.append(form);

    main.append(mainForm);
}

function drawSingUpContent() {
    document.getElementById('form').innerHTML = '';

    const form = document.getElementById('form');

    const h1 = document.createElement('h1');
    h1.textContent = 'Регистрация';

    form.append(h1);

    const div = document.createElement('div');

    let formItem = document.createElement('div');
    formItem.setAttribute('class', 'form__item');

    let label = document.createElement('label');
    label.setAttribute('for','firstName');
    label.textContent = 'Имя:';

    formItem.append(label);

    let input = document.createElement('input');
    input.setAttribute('id','firstName');
    input.setAttribute('type', 'text');

    formItem.append(input);

    div.append(formItem);

    formItem = document.createElement('div');
    formItem.setAttribute('class', 'form__item');

    label = document.createElement('label');
    label.setAttribute('for','lastName');
    label.textContent = 'Фамилия:';

    formItem.append(label);

    input = document.createElement('input');
    input.setAttribute('id','lastName');
    input.setAttribute('type', 'text');

    formItem.append(input);

    div.append(formItem);

    formItem = document.createElement('div');
    formItem.setAttribute('class', 'form__item');

    label = document.createElement('label');
    label.setAttribute('for','date');
    label.textContent = 'Дата рождения:';

    formItem.append(label);
    //три инпута надо дописать
    input = document.createElement('input');
    input.setAttribute('id','date');
    input.setAttribute('type', 'text');

    formItem.append(input);

    div.append(formItem);

    formItem = document.createElement('div');
    formItem.setAttribute('class', 'form__item');


    label = document.createElement('label');
    label.setAttribute('for','email');
    label.textContent = 'Почта:';

    formItem.append(label);

    input = document.createElement('input');
    input.setAttribute('id','email');
    input.setAttribute('type', 'email');

    formItem.append(input);

    div.append(formItem);

    formItem = document.createElement('div');
    formItem.setAttribute('class','form__item');

    label = document.createElement('label');
    label.setAttribute('for','password');
    label.textContent = 'Пароль:';

    formItem.append(label);

    input = document.createElement('input');
    input.setAttribute('id','password');
    input.setAttribute('type', 'password');

    formItem.append(input);

    div.append(formItem);

    formItem = document.createElement('div');
    formItem.setAttribute('class', 'form__item');

    label = document.createElement('label');
    label.setAttribute('for','config');
    label.textContent = 'Повтор пароля:';

    formItem.append(label);

    input = document.createElement('input');
    input.setAttribute('id','config');
    input.setAttribute('type', 'password');

    formItem.append(input);

    div.append(formItem);

    form.append(div);

    const buttonOkSignUp = document.createElement('button');
    buttonOkSignUp.setAttribute('class','form__item form__item_button');
    buttonOkSignUp.setAttribute('id','buttonOkSignUp');
    buttonOkSignUp.setAttribute('type','button');
    buttonOkSignUp.textContent = 'OK';

    form.append(buttonOkSignUp);
}

function drawAdminPage() {
    document.getElementById('headerFunc').innerHTML = '';
    const headerFunc = document.getElementById('headerFunc');

    let button = document.createElement('button');
    button.setAttribute('id', 'users');
    button.setAttribute('class', 'header__item');
    button.textContent = 'Пользователи';

    headerFunc.append(button);

    button = document.createElement('button');
    button.setAttribute('id', 'logOut');
    button.setAttribute('class', 'header__item');
    button.textContent = 'Выход';

    headerFunc.append(button);
}

function drawSignedUpUsersContent() {
    document.getElementById('main').innerHTML = '';

    const main = document.getElementById('main');

    const table = document.createElement('table');
    table.setAttribute('class','table');

    const thead = document.createElement('thead');

    const mainTr = document.createElement('tr');
    mainTr.setAttribute('style','height: 50px;');
    mainTr.setAttribute('class','table__row table__row_main');

    let th = null, p = null;
    const array = ['№', 'Имя', 'Фамилия', 'Дата рождения','Почта'];

    for (let i = 0; i < array.length; i++) {
        th = document.createElement('th');
        th.setAttribute('class','table__cell');

        p = document.createElement('p');
        p.textContent = array[i];

        th.append(p);

        mainTr.append(th);
    }

    thead.append(mainTr);

    table.append(thead);

    const tbody = document.createElement('tbody');
    tbody.setAttribute('id','tbody');

    table.append(tbody);

    main.append(table);
}

function drawUsersPage() {}

function drawBarberPage() {}

function drawHomePage() {
    document.getElementById('headerItems').innerHTML = '';

    const headerItems = document.getElementById('headerItems');

    let button = document.createElement('button');
    button.setAttribute('id', 'home');
    button.setAttribute('class', 'header__item');
    button.textContent = 'Домой';

    headerItems.append(button);

    button = document.createElement('button');
    button.setAttribute('id', 'services');
    button.setAttribute('class', 'header__item');
    button.textContent = 'Услуги';

    headerItems.append(button);

    button = document.createElement('button');
    button.setAttribute('id', 'barbers');
    button.setAttribute('class', 'header__item');
    button.textContent = 'Барберы';

    headerItems.append(button);

    button = document.createElement('button');
    button.setAttribute('id', 'store');
    button.setAttribute('class', 'header__item');
    button.textContent = 'Магазин';

    headerItems.append(button);

    button = document.createElement('button');
    button.setAttribute('id', 'about');
    button.setAttribute('class', 'header__item');
    button.textContent = 'О нас';

    headerItems.append(button);

    document.getElementById('headerFunc').innerHTML = '';

    const headerFunc = document.getElementById('headerFunc');

    button = document.createElement('button');
    button.setAttribute('id', 'signIn');
    button.setAttribute('class', 'header__item');
    button.textContent = 'Записаться';

    headerFunc.append(button);

    button = document.createElement('button');
    button.setAttribute('id', 'logIn');
    button.setAttribute('class', 'header__item');
    button.textContent = 'Вход';

    headerFunc.append(button);

    document.getElementById('main').innerHTML = '';

    const main = document.getElementById('main');

    let div = document.createElement('div');
    div.setAttribute('class', 'main__img');

    let img = document.createElement('img');
    img.setAttribute('alt', 'Hear style');
    img.setAttribute('src', './view/image/icon2.jpg');

    div.append(img);

    main.append(div);

    div = document.createElement('div');
    div.setAttribute('class', 'main__item');

    img = document.createElement('img');
    img.setAttribute('alt', 'Hear style');
    img.setAttribute('src', './view/image/icon.png');

    div.append(img);

    main.append(div);

    div = document.createElement('div');
    div.setAttribute('class', 'main__img');

    img = document.createElement('img');
    img.setAttribute('alt', 'Hear style');
    img.setAttribute('src', './view/image/icon4.jpg');

    div.append(img);

    main.append(div);
}