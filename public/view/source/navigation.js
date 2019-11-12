function drawHomeContent(person) {
    document.getElementById("main").innerHTML = '';

    const main = document.getElementById('main');

    const h1 = document.createElement('h1');
    h1.setAttribute('class', 'main__title');
    h1.textContent = `${!person ? 'Добро пожаловать!' :
        person._userType === 'user' ? 'Добро пожаловать, ' + person._firstName.toUpperCase() + '!' :
            person._userType === 'blackList' ? 'Ваш аккаунт временно находится в черном списке. Напишите на почту администратора чтоб узнать причину.' :
            'Администратор'}`;

    if (person && person._userType === 'blackList') {
        h1.setAttribute('style', 'color: red');
    } else {
        h1.removeAttribute('style');
    }

    main.append(h1);

    if (!person || person._userType === 'user') {
        const buttonRecord = document.createElement('button');
        buttonRecord.setAttribute('id', 'recording');
        buttonRecord.textContent = 'Записаться';

        main.append(buttonRecord);
    } else if (person._userType === 'blackList') {
        const buttonRecord = document.createElement('button');
        buttonRecord.setAttribute('id', 'recording');
        buttonRecord.setAttribute('onclick', `openModalForSendEmailAdmin('${person._email}')`);
        buttonRecord.textContent = 'Написать';

        main.append(buttonRecord);
    }

    const div = document.createElement('div');
    div.setAttribute('class', 'main__icon');

    const img = document.createElement('img');
    img.setAttribute('alt', 'Hear style');
    img.setAttribute('src', './view/image/icon.png');

    div.append(img);

    main.append(div);

    const buttonScroll = document.createElement('button');
    buttonScroll.setAttribute('id', 'scroll');
    buttonScroll.setAttribute('class', 'button');
    buttonScroll.innerHTML = '&#8595';

    main.append(buttonScroll);

    if (person && person._userType === 'blackList') {
        let modalDiv = document.createElement('div');
        modalDiv.setAttribute('class', 'modal__back');
        modalDiv.setAttribute('id', 'modal__back_sendEmailToAdmin');

        let window = document.createElement('div');
        window.setAttribute('class', 'modal__window_sendEmailToAdmin');

        let formContent = document.createElement('div');
        formContent.setAttribute('class', 'form_content');

        let inputEmail = document.createElement('input');
        inputEmail.setAttribute('placeholder', 'Your email');
        inputEmail.setAttribute('value', person._email);
        inputEmail.setAttribute('id', 'inputEmail');
        inputEmail.setAttribute('class', 'inputSendEmail');

        formContent.append(inputEmail);

        let textArea = document.createElement('textarea');
        textArea.setAttribute('placeholder', 'Your message');
        textArea.setAttribute('rows', '10');
        textArea.setAttribute('id', 'textArea');

        formContent.append(textArea);

        window.append(formContent);

        let divButtons = document.createElement('div');
        divButtons.setAttribute('class', 'formDivButtons');

        let buttonLogIn = document.createElement('button');
        buttonLogIn.setAttribute('id', 'cancelSendEmailToAdmin');
        buttonLogIn.setAttribute('class', 'form__item_button-modal');
        buttonLogIn.setAttribute('type', 'button');
        buttonLogIn.textContent = 'Отмена';

        divButtons.append(buttonLogIn);

        let buttonSignUp = document.createElement('button');
        buttonSignUp.setAttribute('id', 'confirmSendEmailToAdmin');
        buttonSignUp.setAttribute('class', 'form__item_button-modal');
        buttonSignUp.setAttribute('type', 'button');
        buttonSignUp.textContent = 'Отправить';

        divButtons.append(buttonSignUp);

        window.append(divButtons);

        modalDiv.append(window);

        main.append(modalDiv);
    }
}

function openModalForSendEmailAdmin(email) {
    document.getElementById('modal__back_sendEmailToAdmin').setAttribute('style', 'visibility: visible')
}

function drawScrollDown() {
    document.getElementById("main").innerHTML = '';

    const main = document.getElementById('main');

    const div = document.createElement('div');
    div.setAttribute('class', 'main__sections');

    let section = document.createElement('section');
    section.setAttribute('class', 'section');

    let h3 = document.createElement('h3');
    h3.setAttribute('class', 'section__title');
    h3.textContent = 'Предлагаемые услуги';

    section.append(h3);

    let sectionDiv = document.createElement('div');
    sectionDiv.setAttribute('class', 'section__content');

    let sectionServices = document.createElement('div');
    sectionServices.setAttribute('class', 'section__content_services');

    let serviceDiv = document.createElement('div');
    serviceDiv.setAttribute('class', 'service__item');

    let serviceDivHeader = document.createElement('div');
    serviceDivHeader.setAttribute('class', 'service__item_header');

    let serviceDivTitle = document.createElement('h3');
    serviceDivTitle.setAttribute('class', 'service__item_title');
    serviceDivTitle.textContent = 'Мужская стрижка';

    serviceDivHeader.append(serviceDivTitle);

    serviceDiv.append(serviceDivHeader);

    let serviceDivImage = document.createElement('div');
    serviceDivImage.setAttribute('class', 'service__item_image');
    serviceDivImage.setAttribute('style', 'background-image: url("./view/image/title/icon1.jpg")');

    serviceDiv.append(serviceDivImage);

    sectionServices.append(serviceDiv);

    serviceDiv = document.createElement('div');
    serviceDiv.setAttribute('class', 'service__item');

    serviceDivHeader = document.createElement('div');
    serviceDivHeader.setAttribute('class', 'service__item_header');

    serviceDivTitle = document.createElement('h3');
    serviceDivTitle.setAttribute('class', 'service__item_title');
    serviceDivTitle.textContent = 'Стрижка бороды';

    serviceDivHeader.append(serviceDivTitle);
    serviceDiv.append(serviceDivHeader);

    serviceDivImage = document.createElement('div');
    serviceDivImage.setAttribute('class', 'service__item_image');
    serviceDivImage.setAttribute('style', 'background-image: url("./view/image/title/icon2.jpg")');

    serviceDiv.append(serviceDivImage);

    sectionServices.append(serviceDiv);

    serviceDiv = document.createElement('div');
    serviceDiv.setAttribute('class', 'service__item');

    serviceDivHeader = document.createElement('div');
    serviceDivHeader.setAttribute('class', 'service__item_header');

    serviceDivTitle = document.createElement('h3');
    serviceDivTitle.setAttribute('class', 'service__item_title');
    serviceDivTitle.textContent = 'Укладка';

    serviceDivHeader.append(serviceDivTitle);
    serviceDiv.append(serviceDivHeader);

    serviceDivImage = document.createElement('div');
    serviceDivImage.setAttribute('class', 'service__item_image');
    serviceDivImage.setAttribute('style', 'background-image: url("./view/image/title/icon3.jpg")');

    serviceDiv.append(serviceDivImage);

    sectionServices.append(serviceDiv);

    sectionDiv.append(sectionServices);

    let sectionButton = document.createElement('button');
    sectionButton.setAttribute('class', 'section__button');
    sectionButton.setAttribute('id', 'goToServices');
    sectionButton.textContent = 'Подробнее';

    sectionDiv.append(sectionButton);

    section.append(sectionDiv);

    div.append(section);

    section = document.createElement('section');
    section.setAttribute('class', 'section');

    h3 = document.createElement('h3');
    h3.setAttribute('class', 'section__title');
    h3.textContent = 'Наши барберы';

    section.append(h3);

    sectionDiv = document.createElement('div');
    sectionDiv.setAttribute('class', 'section__content');

    sectionButton = document.createElement('button');
    sectionButton.setAttribute('class', 'section__button');
    sectionButton.setAttribute('id', 'goToBarbers');
    sectionButton.textContent = 'Подробнее';

    sectionDiv.append(sectionButton);

    let sectionBarbers = document.createElement('div');
    sectionBarbers.setAttribute('class', 'section__content_services');

    let barberDiv = document.createElement('div');
    barberDiv.setAttribute('class', 'service__item');

    let barberDivImage = document.createElement('div');
    barberDivImage.setAttribute('class', 'service__item_image');
    barberDivImage.setAttribute('style', 'background-image: url("./view/image/barbers/icon1.jpg")');

    barberDiv.append(barberDivImage);

    let barberDivHeader = document.createElement('div');
    barberDivHeader.setAttribute('class', 'service__item_header');

    let barberDivTitle = document.createElement('h3');
    barberDivTitle.setAttribute('class', 'service__item_title');
    barberDivTitle.textContent = 'Барбер 1';

    barberDivHeader.append(barberDivTitle);

    barberDiv.append(barberDivHeader);

    sectionBarbers.append(barberDiv);

    barberDiv = document.createElement('div');
    barberDiv.setAttribute('class', 'service__item');

    barberDivImage = document.createElement('div');
    barberDivImage.setAttribute('class', 'service__item_image');
    barberDivImage.setAttribute('style', 'background-image: url("./view/image/barbers/icon2.jpg")');

    barberDiv.append(barberDivImage);

    barberDivHeader = document.createElement('div');
    barberDivHeader.setAttribute('class', 'service__item_header');

    barberDivTitle = document.createElement('h3');
    barberDivTitle.setAttribute('class', 'service__item_title');
    barberDivTitle.textContent = 'Барбер 2';

    barberDivHeader.append(barberDivTitle);
    barberDiv.append(barberDivHeader);

    sectionBarbers.append(barberDiv);

    barberDiv = document.createElement('div');
    barberDiv.setAttribute('class', 'service__item');

    barberDivImage = document.createElement('div');
    barberDivImage.setAttribute('class', 'service__item_image');
    barberDivImage.setAttribute('style', 'background-image: url("./view/image/barbers/icon3.jpg")');

    barberDiv.append(barberDivImage);

    barberDivHeader = document.createElement('div');
    barberDivHeader.setAttribute('class', 'service__item_header');

    barberDivTitle = document.createElement('h3');
    barberDivTitle.setAttribute('class', 'service__item_title');
    barberDivTitle.textContent = 'Барбер 3';

    barberDivHeader.append(barberDivTitle);
    barberDiv.append(barberDivHeader);

    sectionBarbers.append(barberDiv);

    sectionDiv.append(sectionBarbers);

    section.append(sectionDiv);

    div.append(section);

    section = document.createElement('section');
    section.setAttribute('class', 'section');

    h3 = document.createElement('h3');
    h3.setAttribute('class', 'section__title');
    h3.textContent = 'Товары';

    section.append(h3);

    sectionDiv = document.createElement('div');
    sectionDiv.setAttribute('class', 'section__content');

    let sectionStore = document.createElement('div');
    sectionStore.setAttribute('class', 'section__content_services');

    let storeDiv = document.createElement('div');
    storeDiv.setAttribute('class', 'service__item');

    let storeDivHeader = document.createElement('div');
    storeDivHeader.setAttribute('class', 'service__item_header');

    let storeDivTitle = document.createElement('h3');
    storeDivTitle.setAttribute('class', 'service__item_title');
    storeDivTitle.textContent = 'Товар 1';

    storeDivHeader.append(storeDivTitle);

    storeDiv.append(storeDivHeader);

    let storeDivImage = document.createElement('div');
    storeDivImage.setAttribute('class', 'service__item_image');
    storeDivImage.setAttribute('style', 'background-image: url("./view/image/store/icon1.jpg")');

    storeDiv.append(storeDivImage);

    sectionStore.append(storeDiv);

    storeDiv = document.createElement('div');
    storeDiv.setAttribute('class', 'service__item');

    storeDivHeader = document.createElement('div');
    storeDivHeader.setAttribute('class', 'service__item_header');

    storeDivTitle = document.createElement('h3');
    storeDivTitle.setAttribute('class', 'service__item_title');
    storeDivTitle.textContent = 'Товар 2';

    storeDivHeader.append(storeDivTitle);

    storeDiv.append(storeDivHeader);

    storeDivImage = document.createElement('div');
    storeDivImage.setAttribute('class', 'service__item_image');
    storeDivImage.setAttribute('style', 'background-image: url("./view/image/store/icon2.jpg")');

    storeDiv.append(storeDivImage);

    sectionStore.append(storeDiv);

    storeDiv = document.createElement('div');
    storeDiv.setAttribute('class', 'service__item');

    storeDivHeader = document.createElement('div');
    storeDivHeader.setAttribute('class', 'service__item_header');

    storeDivTitle = document.createElement('h3');
    storeDivTitle.setAttribute('class', 'service__item_title');
    storeDivTitle.textContent = 'Товар 3';

    storeDivHeader.append(storeDivTitle);

    storeDiv.append(storeDivHeader);

    storeDivImage = document.createElement('div');
    storeDivImage.setAttribute('class', 'service__item_image');
    storeDivImage.setAttribute('style', 'background-image: url("./view/image/store/icon3.jpg")');

    storeDiv.append(storeDivImage);

    sectionStore.append(storeDiv);

    sectionDiv.append(sectionStore);

    sectionButton = document.createElement('button');
    sectionButton.setAttribute('class', 'section__button');
    sectionButton.setAttribute('id', 'goToStore');
    sectionButton.textContent = 'Подробнее';

    sectionDiv.append(sectionButton);

    section.append(sectionDiv);

    div.append(section);

    // section = document.createElement('section');
    // section.setAttribute('class', 'section');
    //
    // h3 = document.createElement('h3');
    // h3.setAttribute('class', 'section__title');
    // h3.textContent = 'Регистрация личного акаунта';
    //
    // section.append(h3);
    //
    // sectionDiv = document.createElement('div');
    // sectionDiv.setAttribute('class', 'section__content');
    //
    // p = document.createElement('p');
    // p.setAttribute('class', 'section__content_p');
    // p.textContent = '1111111111 22288888888 99999991111111111 2222222222 333333333 4444444 555555555555 666666666666 777777777 888888888 9999999';
    //
    // sectionDiv.append(p);
    //
    // image = document.createElement('div');
    // // image.setAttribute('background', 'url("./view/image/icon3.jpg")');
    // image.setAttribute('class', 'section__content_image');
    //
    // sectionDiv.append(image);
    //
    // section.append(sectionDiv);
    //
    // div.append(section);

    main.append(div);
}

function drawUser(number, user) {
    const container = document.getElementById('main__section');

    const section = document.createElement('section');
    section.setAttribute('class', 'section__user');

    let div = document.createElement('div');
    div.setAttribute('class', 'section__service_item');

    const { _firstName, _lastName, _email, _date } = user;
    const array = [number, _firstName, _lastName, _email, _date];

    let item;

    for (let i = 0; i < array.length; i++) {
        item = document.createElement('div');

        if (i === 0) {
            item.setAttribute('class', 'section__store_item-cell_number');
        } else if (i === 3 || i === 4) {
            item.setAttribute('class', 'section__barber_item-cell_email');
        } else {
            item.setAttribute('class', 'section__barber_item-cell_name');
        }

        item.textContent = array[i];

        div.append(item);
    }

    section.append(div);

    const button = document.createElement('button');
    button.setAttribute('class', 'removeService');
    button.setAttribute('id', `removeUser${user._email}`);
    button.setAttribute('onclick', `clickDeleteUser('${user._email}')`);
    button.textContent = user._userType === 'user' ? 'В черный список' : 'Вернуть';

    section.append(button);

    container.append(section);
}

function getNumberOfImage(email, array) {
    for (let i = 0; i < array.length; i++) {
        if (String(email) === String(array[i][0])) {
            return array[i][1];
        }
    }
}

function drawPublicBarbers(barberList, currentUser, object) {
    document.getElementById('barbersDiv').innerHTML = '';

    const div = document.getElementById('barbersDiv');

    const tempDivForItemBarbers = document.createElement('div');
    tempDivForItemBarbers.setAttribute('id', 'tempDivForItemBarbers');

    let section, barberDiv, barberImage, barberInfo, barberData, arrayValues, recordButton;
    let arrayFields = ['Имя', 'Фамилия', 'Возраст(в годах)', 'Стаж(в годах)', 'Рейтинг(10/10)'];

    for (let i = 0; i < barberList.length; i++) {
        if (i % 3 === 0) {
            section = document.createElement('section');
            section.setAttribute('class', 'barbers-container__section');
        }

        const {_firstName, _lastName, _age, _experience, _rating} = barberList[i];
        arrayValues = [_firstName, _lastName, _age, _experience, _rating];

        barberDiv = document.createElement('div');
        barberDiv.setAttribute('class', 'barbers-container__section_item');

        barberImage = document.createElement('div');
        barberImage.setAttribute('class', 'barberImage');

        if (!object.counterStart) {
            object.imagesArray.push([barberList[i]._email, i + 1]);
            barberImage.setAttribute('style', `background-image: url("./view/image/barbers/icon${i + 1}.jpg")`);
        } else {
            barberImage.setAttribute('style', `background-image: url("./view/image/barbers/icon${getNumberOfImage(barberList[i]._email, object.imagesArray)}.jpg")`);
        }

        barberDiv.append(barberImage);

        barberInfo = document.createElement('div');
        barberInfo.setAttribute('class', 'barberInfo');

        for (let j = 0; j < arrayValues.length; j++) {
            barberData = document.createElement('p');
            barberData.setAttribute('class', 'barberData');
            barberData.textContent = `${arrayFields[j]}: ${arrayValues[j]}`;

            barberInfo.append(barberData);
        }

        barberDiv.append(barberInfo);

        if (!currentUser || currentUser._userType !== 'admin') {
            recordButton = document.createElement('button');
            recordButton.setAttribute('class', 'section__button_barber');
            recordButton.setAttribute('onclick', `goToRecordPage('${barberList[i]._email}')`);
            recordButton.textContent = 'Записаться';

            barberDiv.append(recordButton);
        }

        section.append(barberDiv);

        if (i % 3 === 0) {
            tempDivForItemBarbers.append(section);
        }
    }

    object.counterStart++;
    div.append(tempDivForItemBarbers);
}

function drawBarbersContent() {
    document.getElementById("main").innerHTML = '';

    const main = document.getElementById("main");

    const div = document.createElement('div');
    div.setAttribute('id', 'sectionsBarberDiv');

    const headerBarber = document.createElement('h1');
    headerBarber.setAttribute('class', 'service__title');
    headerBarber.setAttribute('style', 'background-color: #3c1803a6;');
    headerBarber.textContent = 'Наши барберы';

    div.append(headerBarber);

    const toggleRequestsMenuButton = document.createElement('button');
    toggleRequestsMenuButton.setAttribute('id', 'toggleRequestsMenuButton');

    div.append(toggleRequestsMenuButton);

    const barbersDiv = document.createElement('div');
    barbersDiv.setAttribute('id', 'barbersDiv');

    div.append(barbersDiv);

    const blockForParamsBarber = document.createElement('div');
    blockForParamsBarber.setAttribute('class', 'blockForParams');
    blockForParamsBarber.setAttribute('id', 'blockForParamsBarber');

    const blockDivParamsWindow = document.createElement('div');
    blockDivParamsWindow.setAttribute('class', 'blockDivParamsWindow');

    let containerForSearch = document.createElement('div');
    containerForSearch.setAttribute('class', 'containerForSearch');

    let buttonForSearch = document.createElement('button');
    buttonForSearch.setAttribute('class', 'buttonForSearch');
    buttonForSearch.setAttribute('id', 'buttonForSearchRating');
    buttonForSearch.textContent = 'Выдать';

    containerForSearch.append(buttonForSearch);

    let p = document.createElement('p');
    p.setAttribute('class', 'textContainer');
    p.textContent = 'барберов по рейтингу';

    containerForSearch.append(p);

    blockDivParamsWindow.append(containerForSearch);

    blockForParamsBarber.append(blockDivParamsWindow);

    let divContainerForSearch = document.createElement('div');
    divContainerForSearch.setAttribute('class', 'divContainerForSearch');

    containerForSearch = document.createElement('div');
    containerForSearch.setAttribute('class', 'containerForSearch');

    p = document.createElement('p');
    p.setAttribute('class', 'textContainer');
    p.textContent = 'Свободные барберы по дате';

    containerForSearch.append(p);

    let option;

    let searchDate = document.createElement('select');
    searchDate.setAttribute('id', 'date');

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

    option = document.createElement('option');
    option.setAttribute('class', 'select__option');
    option.setAttribute('id', 'noneDate');
    option.setAttribute('selected', 'selected');

    option.textContent = 'не выбрана';

    searchDate.append(option);

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

        option.textContent = `${dateArray[i][2]}.${tempMonth}.${dateArray[i][3]}`;

        searchDate.append(option);
    }

    containerForSearch.append(searchDate);

    divContainerForSearch.append(containerForSearch);

    containerForSearch = document.createElement('div');
    containerForSearch.setAttribute('class', 'containerForSearch');

    p = document.createElement('p');
    p.setAttribute('class', 'textContainer');
    p.textContent = 'Свободные барберы по времени';

    containerForSearch.append(p);

    searchDate = document.createElement('select');
    searchDate.setAttribute('id', 'time');

    option = document.createElement('option');
    option.setAttribute('class', 'select__option');
    option.setAttribute('id', 'noneTime');
    option.setAttribute('selected', 'selected');
    option.textContent = 'не выбрано';

    searchDate.append(option);

    for (let i = 10; i < 21; i++) {
        option = document.createElement('option');
        option.setAttribute('class', 'select__option');
        option.setAttribute('id', `${i}:00`);

        option.textContent = `${i}:00`;

        searchDate.append(option);
    }

    containerForSearch.append(searchDate);

    divContainerForSearch.append(containerForSearch);

    buttonForSearch = document.createElement('button');
    buttonForSearch.setAttribute('class', 'buttonForSearch');
    buttonForSearch.setAttribute('id', 'buttonForSearchDate');
    buttonForSearch.textContent = 'Выдать';

    divContainerForSearch.append(buttonForSearch);

    blockDivParamsWindow.append(divContainerForSearch);

    buttonForSearch = document.createElement('button');
    buttonForSearch.setAttribute('id', 'buttonForReset');
    buttonForSearch.setAttribute('class', 'buttonForReset');
    buttonForSearch.setAttribute('style', 'margin-top: 10px;');

    buttonForSearch.textContent = 'Сбросить';

    blockDivParamsWindow.append(buttonForSearch);

    blockForParamsBarber.append(blockDivParamsWindow);

    div.append(blockForParamsBarber);

    main.append(div);
}

function drawService(number, service) {
    const container = document.getElementById('main__section');

    const section = document.createElement('section');
    section.setAttribute('class', 'section__service');

    let div = document.createElement('div');
    div.setAttribute('class', 'section__service_item');

    const {_type, _price} = service;
    const array = [number, _type, _price];

    let item;

    for (let i = 0; i < array.length; i++) {
        item = document.createElement('div');

        if (i === 1) {
            item.setAttribute('class', 'section__service_item-cell_email');
        } else {
            item.setAttribute('class', 'section__service_item-cell_number');
        }

        if (i === 2) {
            item.setAttribute('onmouseover', `showButtonMouseOverPrice('${number - 1}', '${_type}')`);
            item.setAttribute('onmouseout', `hideButtonMouseOverPrice('${number - 1}', '${_price}', '${_type}')`);
        }

        item.textContent = array[i];

        div.append(item);
    }

    section.append(div);

    const button = document.createElement('button');
    button.setAttribute('class', 'removeService');
    button.setAttribute('id', `removeService${service._type}`);
    button.setAttribute('onclick', `clickDeleteService('${service._type}')`);
    button.textContent = 'Удалить';

    section.append(button);

    container.append(section);
}

function drawServicesInfo() {
    document.getElementById('main').innerHTML = '';

    const main = document.getElementById('main');

    const div = document.createElement('div');
    div.setAttribute('class', 'main__sections adminData');

    const divTitle = document.createElement('h1');
    divTitle.setAttribute('class', 'service__title');
    divTitle.textContent = 'Информация об услугах';

    div.append(divTitle);

    const addBarberButton = document.createElement('button');
    addBarberButton.setAttribute('id', 'addServiceButton');
    addBarberButton.setAttribute('style', 'background-image: url("./view/image/barbers/icons/icon1.png")');

    div.append(addBarberButton);

    const sectionContainer = document.createElement('div');
    sectionContainer.setAttribute('class', 'section__container_service');
    sectionContainer.setAttribute('id', 'main__section');

    const headerSection = document.createElement('section');
    headerSection.setAttribute('class', 'section__main_service');

    let headerSectionItem = document.createElement('div');
    headerSectionItem.setAttribute('class', 'section__barber_item');

    const array = ['№', 'Тип', 'Цена'];

    let item;

    for (let i = 0; i < array.length; i++) {
        item = document.createElement('div');

        if (array[i] === 'Тип') {
            item.setAttribute('class', 'section__service_item-cell_email');
        } else {
            item.setAttribute('class', 'section__service_item-cell_number');
        }

        item.textContent = array[i];

        headerSectionItem.append(item);
    }

    headerSection.append(headerSectionItem);

    sectionContainer.append(headerSection);

    div.append(sectionContainer);

    main.append(div);

    let arrayTextContent = ['Тип:', 'Цена:'];
    let arrayValues = ['type', 'price'];

    let modalDiv = document.createElement('div');
    modalDiv.setAttribute('class', 'modal__back');
    modalDiv.setAttribute('id', 'modal__back_service');

    let window = document.createElement('div');
    window.setAttribute('class', 'modal__window_addService');

    let headerModalWindow = document.createElement('h1');
    headerModalWindow.textContent = 'Новая услуга';

    window.append(headerModalWindow);

    let formContent = document.createElement('div');
    formContent.setAttribute('class', 'form_content');

    let formItem, label, input;

    for (let i = 0; i < arrayTextContent.length; i++) {
        formItem = document.createElement('div');
        formItem.setAttribute('class', 'form__item');

        label = document.createElement('label');
        label.setAttribute('for', arrayValues[i]);
        label.textContent = arrayTextContent[i];

        formItem.append(label);

        input = document.createElement('input');
        input.setAttribute('id', arrayValues[i]);
        input.setAttribute('type', 'text');

        formItem.append(input);

        formContent.append(formItem);
    }

    window.append(formContent);

    let divButtons = document.createElement('div');
    divButtons.setAttribute('class', 'formDivButtons');

    let buttonLogIn = document.createElement('button');
    buttonLogIn.setAttribute('id', 'cancelAddService');
    buttonLogIn.setAttribute('class', 'form__item_button-modal');
    buttonLogIn.setAttribute('type', 'button');
    buttonLogIn.textContent = 'Отмена';

    divButtons.append(buttonLogIn);

    let buttonSignUp = document.createElement('button');
    buttonSignUp.setAttribute('id', 'configAddService');
    buttonSignUp.setAttribute('class', 'form__item_button-modal');
    buttonSignUp.setAttribute('type', 'button');
    buttonSignUp.textContent = 'Добавить';

    divButtons.append(buttonSignUp);

    window.append(divButtons);

    modalDiv.append(window);

    main.append(modalDiv);

    modalDiv = document.createElement('div');
    modalDiv.setAttribute('class', 'modal__back');
    modalDiv.setAttribute('id', 'modal__back_confirmDeleteService');

    window = document.createElement('div');
    window.setAttribute('class', 'modal__window_delete');

    headerModalWindow = document.createElement('h1');
    headerModalWindow.textContent = 'Вы уверены что хотите удалить эту услугу?';

    window.append(headerModalWindow);

    formContent = document.createElement('div');
    formContent.setAttribute('class', 'form_content');

    let span;

    arrayTextContent = ['Тип:', 'Цена:'];
    arrayValues = ['typeDelete', 'priceDelete'];

    for (let i = 0; i < arrayTextContent.length; i++) {
        formItem = document.createElement('div');
        formItem.setAttribute('class', 'form__item');

        span = document.createElement('span');
        span.textContent = arrayTextContent[i];

        formItem.append(span);

        span = document.createElement('span');
        span.setAttribute('id', arrayValues[i]);

        formItem.append(span);

        formContent.append(formItem);
    }

    window.append(formContent);

    divButtons = document.createElement('div');
    divButtons.setAttribute('class', 'formDivButtons');

    buttonLogIn = document.createElement('button');
    buttonLogIn.setAttribute('id', 'cancelDeleteService');
    buttonLogIn.setAttribute('class', 'form__item_button-modal');
    buttonLogIn.setAttribute('type', 'button');
    buttonLogIn.textContent = 'Нет';

    divButtons.append(buttonLogIn);

    buttonSignUp = document.createElement('button');
    buttonSignUp.setAttribute('id', 'confirmDeleteService');
    buttonSignUp.setAttribute('class', 'form__item_button-modal');
    buttonSignUp.setAttribute('type', 'button');
    buttonSignUp.textContent = 'Да';

    divButtons.append(buttonSignUp);

    window.append(divButtons);

    modalDiv.append(window);

    main.append(modalDiv);

    modalDiv = document.createElement('div');
    modalDiv.setAttribute('class', 'modal__back');
    modalDiv.setAttribute('id', 'modal__back_changeSalary');

    window = document.createElement('div');
    window.setAttribute('class', 'modal__window_change');

    headerModalWindow = document.createElement('h1');
    headerModalWindow.textContent = 'Изменение цены';

    window.append(headerModalWindow);

    formContent = document.createElement('div');
    formContent.setAttribute('class', 'form_content');

    arrayTextContent = ['Тип:', 'Текущая цена:'];
    arrayValues = ['typeChange', 'priceChange'];

    for (let i = 0; i < arrayTextContent.length; i++) {
        formItem = document.createElement('div');
        formItem.setAttribute('class', 'form__item');

        span = document.createElement('span');
        span.textContent = arrayTextContent[i];

        formItem.append(span);

        span = document.createElement('span');
        span.setAttribute('id', arrayValues[i]);

        formItem.append(span);

        formContent.append(formItem);
    }

    formItem = document.createElement('div');
    formItem.setAttribute('class', 'form__item');

    label = document.createElement('label');
    label.setAttribute('for', 'newPrice');
    label.textContent = 'Новая цена:';

    formItem.append(label);

    input = document.createElement('input');
    input.setAttribute('id', 'newPrice');
    input.setAttribute('type', 'text');

    formItem.append(input);

    formContent.append(formItem);

    window.append(formContent);

    divButtons = document.createElement('div');
    divButtons.setAttribute('class', 'formDivButtons');

    buttonLogIn = document.createElement('button');
    buttonLogIn.setAttribute('id', 'cancelChangeServicePrice');
    buttonLogIn.setAttribute('class', 'form__item_button-modal');
    buttonLogIn.setAttribute('type', 'button');
    buttonLogIn.textContent = 'Отмена';

    divButtons.append(buttonLogIn);

    buttonSignUp = document.createElement('button');
    buttonSignUp.setAttribute('id', 'confirmChangeServicePrice');
    buttonSignUp.setAttribute('class', 'form__item_button-modal');
    buttonSignUp.setAttribute('type', 'button');
    buttonSignUp.textContent = 'Изменить';

    divButtons.append(buttonSignUp);

    window.append(divButtons);

    modalDiv.append(window);

    main.append(modalDiv);
}

function drawPublicServices(serviceList, currentUser, object) {
    document.getElementById('servicesDiv').innerHTML = '';

    const div = document.getElementById('servicesDiv');

    const tempDivForItemServices = document.createElement('div');
    tempDivForItemServices.setAttribute('id', 'tempDivForItemServices');

    let section, serviceDiv, headerContainer, h3, image, controlBlock, arrayValues, recordButton;
    for (let i = 0; i < serviceList.length; i++) {
        if (i % 3 === 0) {
            section = document.createElement('section');
            section.setAttribute('class', 'service__content_section');
        }

        serviceDiv = document.createElement('div');
        serviceDiv.setAttribute('class', 'service__item');

        headerContainer = document.createElement('div');
        headerContainer.setAttribute('class', 'store__item_header');

        h3 = document.createElement('h3');
        h3.setAttribute('class', 'service__item_title');
        h3.textContent = serviceList[i]._type;

        headerContainer.append(h3);

        serviceDiv.append(headerContainer);

        const {_type, _price} = serviceList[i];
        arrayValues = [_type, _price];

        image = document.createElement('div');
        image.setAttribute('class', 'service__item_image');

        if (!object.counterStart) {
            object.imagesArray.push([serviceList[i]._type, i + 1]);
            image.setAttribute('style', `background-image: url("./view/image/services/icon${i + 1}.jpg")`);
        } else {
            image.setAttribute('style', `background-image: url("./view/image/services/icon${getNumberOfImage(serviceList[i]._type, object.imagesArray)}.jpg")`);
        }

        serviceDiv.append(image);

        controlBlock = document.createElement('div');

        let priceDiv = document.createElement('div');
        priceDiv.setAttribute('class', 'service__item_price');
        priceDiv.textContent = `Цена: ${serviceList[i]._price} грн`;

        controlBlock.append(priceDiv);

        if (!currentUser || currentUser._userType !== 'admin') {
            recordButton = document.createElement('button');
            recordButton.setAttribute('class', 'section__button_barber');
            recordButton.setAttribute('onclick', `goToRecordPageFromServices('${serviceList[i]._type}')`);
            recordButton.textContent = 'Записаться';

            controlBlock.append(recordButton);
        }

        serviceDiv.append(controlBlock);

        section.append(serviceDiv);

        if (i % 3 === 0) {
            tempDivForItemServices.append(section);
        }
    }

    object.counterStart++;
    div.append(tempDivForItemServices);
}

function drawServicesContent() {
    document.getElementById('main').innerHTML = '';

    const main = document.getElementById('main');

    const mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'main__sections');

    const headerText = document.createElement('h1');
    headerText.setAttribute('class', 'service__title');
    headerText.textContent = 'Наши услуги';

    mainDiv.append(headerText);

    const toggleRequestsMenuButton = document.createElement('button');
    toggleRequestsMenuButton.setAttribute('id', 'toggleRequestsMenuButton');

    mainDiv.append(toggleRequestsMenuButton);

    const servicesDiv = document.createElement('div');
    servicesDiv.setAttribute('id', 'servicesDiv');

    mainDiv.append(servicesDiv);

    const blockForParamsBarber = document.createElement('div');
    blockForParamsBarber.setAttribute('class', 'blockForParams');
    blockForParamsBarber.setAttribute('id', 'blockForParamsService');

    const blockDivParamsWindow = document.createElement('div');
    blockDivParamsWindow.setAttribute('class', 'blockDivParamsWindow');

    let containerForSearch = document.createElement('div');
    containerForSearch.setAttribute('class', 'containerForSearch');

    let buttonForSearch = document.createElement('button');
    buttonForSearch.setAttribute('class', 'buttonForSearch');
    buttonForSearch.setAttribute('id', 'buttonForSearchPrices');
    buttonForSearch.textContent = 'Выдать';

    containerForSearch.append(buttonForSearch);

    let p = document.createElement('p');
    p.setAttribute('class', 'textContainer');
    p.textContent = 'услуги по убывающей цене';

    containerForSearch.append(p);

    blockDivParamsWindow.append(containerForSearch);

    blockForParamsBarber.append(blockDivParamsWindow);

    buttonForSearch = document.createElement('button');
    buttonForSearch.setAttribute('id', 'buttonForReset');
    buttonForSearch.setAttribute('class', 'buttonForReset');
    buttonForSearch.setAttribute('style', 'margin-top: 10px;');

    buttonForSearch.textContent = 'Сбросить';

    blockDivParamsWindow.append(buttonForSearch);

    blockForParamsBarber.append(blockDivParamsWindow);

    mainDiv.append(blockForParamsBarber);

    main.append(mainDiv);
}

function drawPublicStoreItem(storeList, object)  {
    document.getElementById('servicesDiv').innerHTML = '';

    const div = document.getElementById('servicesDiv');

    const tempDivForItemServices = document.createElement('div');
    tempDivForItemServices.setAttribute('id', 'tempDivForItemStore');

    let section, storeItemDiv, headerContainer, h3, image, controlBlock, arrayValues;

    for (let i = 0; i < storeList.length; i++) {
        if (i % 3 === 0) {
            section = document.createElement('section');
            section.setAttribute('class', 'service__content_section');
        }

        storeItemDiv = document.createElement('div');
        storeItemDiv.setAttribute('class', 'service__item');

        headerContainer = document.createElement('div');
        headerContainer.setAttribute('class', 'store__item_header');

        h3 = document.createElement('h3');
        h3.setAttribute('class', 'service__item_title');
        h3.textContent = storeList[i]._type;

        headerContainer.append(h3);

        storeItemDiv.append(headerContainer);

        const {_type, _price} = storeList[i];
        arrayValues = [_type, _price];

        image = document.createElement('div');
        image.setAttribute('class', 'service__item_image');

        if (!object.counterStart) {
            object.imagesArray.push([storeList[i]._type, i + 1]);
            image.setAttribute('style', `background-image: url("./view/image/store/icon${i + 1}.jpg")`);
        } else {
            image.setAttribute('style', `background-image: url("./view/image/store/icon${getNumberOfImage(storeList[i]._type, object.imagesArray)}.jpg")`);
        }

        storeItemDiv.append(image);

        controlBlock = document.createElement('div');

        let priceDiv = document.createElement('div');
        priceDiv.setAttribute('class', 'service__item_price');
        priceDiv.textContent = `Цена: ${storeList[i]._price} грн`;

        controlBlock.append(priceDiv);

        let mark = document.createElement('div');
        mark.setAttribute('class', 'service__item_price');
        mark.textContent = `Марка: ${storeList[i]._mark}`;

        controlBlock.append(mark);

        storeItemDiv.append(controlBlock);

        section.append(storeItemDiv);

        if (i % 3 === 0) {
            tempDivForItemServices.append(section);
        }
    }

    object.counterStart++;
    div.append(tempDivForItemServices);
}

function drawStoreContent(storeList) {
    document.getElementById('main').innerHTML = '';

    const main = document.getElementById('main');

    const mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'main__sections');

    const headerText = document.createElement('h1');
    headerText.setAttribute('class', 'service__title');
    headerText.textContent = 'Наши товары';

    mainDiv.append(headerText);

    const toggleRequestsMenuButton = document.createElement('button');
    toggleRequestsMenuButton.setAttribute('id', 'toggleRequestsMenuButton');

    mainDiv.append(toggleRequestsMenuButton);

    const servicesDiv = document.createElement('div');
    servicesDiv.setAttribute('id', 'servicesDiv');

    mainDiv.append(servicesDiv);

    const blockForParamsBarber = document.createElement('div');
    blockForParamsBarber.setAttribute('class', 'blockForParams');
    blockForParamsBarber.setAttribute('id', 'blockForParamsService');

    const blockDivParamsWindow = document.createElement('div');
    blockDivParamsWindow.setAttribute('class', 'blockDivParamsWindow');

    let containerForSearch = document.createElement('div');
    containerForSearch.setAttribute('class', 'containerForSearch');

    let buttonForSearch = document.createElement('button');
    buttonForSearch.setAttribute('class', 'buttonForSearch');
    buttonForSearch.setAttribute('id', 'buttonForSearchPrices');
    buttonForSearch.textContent = 'Выдать';

    containerForSearch.append(buttonForSearch);

    let p = document.createElement('p');
    p.setAttribute('class', 'textContainer');
    p.textContent = 'товар по убывающей цене';

    containerForSearch.append(p);

    blockDivParamsWindow.append(containerForSearch);

    containerForSearch = document.createElement('div');
    containerForSearch.setAttribute('class', 'containerForSearch');

    buttonForSearch = document.createElement('button');
    buttonForSearch.setAttribute('class', 'buttonForSearch');
    buttonForSearch.setAttribute('id', 'buttonForSearchMark');
    buttonForSearch.textContent = 'Выдать';

    containerForSearch.append(buttonForSearch);

    p = document.createElement('p');
    p.setAttribute('class', 'textContainer');
    p.textContent = 'товары по марке';

    containerForSearch.append(p);

    let searchDate = document.createElement('select');
    searchDate.setAttribute('id', 'mark');

    let option = document.createElement('option');
    option.setAttribute('class', 'select__option');
    option.setAttribute('id', 'noneMark');
    option.setAttribute('selected', 'selected');
    option.textContent = 'не выбрана';

    searchDate.append(option);

    for (let i = 0; i < storeList.length; i++) {
        option = document.createElement('option');
        option.setAttribute('class', 'select__option');
        option.setAttribute('id', `${i}:00`);

        option.textContent = `${storeList[i]._mark}`;

        searchDate.append(option);
    }

    containerForSearch.append(searchDate);

    blockDivParamsWindow.append(containerForSearch);

    blockForParamsBarber.append(blockDivParamsWindow);

    buttonForSearch = document.createElement('button');
    buttonForSearch.setAttribute('id', 'buttonForReset');
    buttonForSearch.setAttribute('class', 'buttonForReset');
    buttonForSearch.setAttribute('style', 'margin-top: 10px;');

    buttonForSearch.textContent = 'Сбросить';

    blockDivParamsWindow.append(buttonForSearch);

    blockForParamsBarber.append(blockDivParamsWindow);

    mainDiv.append(blockForParamsBarber);

    main.append(mainDiv);
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
    div.setAttribute('class', 'form_content');

    let formItem = document.createElement('div');
    formItem.setAttribute('class', 'form__item');

    let label = document.createElement('label');
    label.setAttribute('for','email');
    label.textContent = 'Email:';

    formItem.append(label);

    let input = document.createElement('input');
    input.setAttribute('id','email');
    input.setAttribute('type', 'email');
    input.setAttribute('onblur', 'validateInput("email", "wrongInputDataInfoEmail")');
    input.setAttribute('onfocus', 'removeInvalid("email", "wrongInputDataInfoEmail")');
    input.setAttribute('placeholder', '<...>@gmail.com');

    formItem.append(input);

    div.append(formItem);

    let blockWrongData = document.createElement('div');
    blockWrongData.setAttribute('class', 'wrongInputDataInfo');
    blockWrongData.setAttribute('id', 'wrongInputDataInfoEmail');

    div.append(blockWrongData);

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

    blockWrongData = document.createElement('div');
    blockWrongData.setAttribute('class', 'wrongInputDataInfo');

    div.append(blockWrongData);

    form.append(div);

    const divButtons = document.createElement('div');
    divButtons.setAttribute('class','formDivButtons');

    const buttonLogIn = document.createElement('button');
    buttonLogIn.setAttribute('id', 'submitLogIn');
    buttonLogIn.setAttribute('class', 'form__item_button');
    buttonLogIn.setAttribute('type', 'button');
    buttonLogIn.textContent = 'Вход';

    divButtons.append(buttonLogIn);

    const buttonSignUp = document.createElement('button');
    buttonSignUp.setAttribute('id', 'submitSignUp');
    buttonSignUp.setAttribute('class', 'form__item_button');
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
    input.setAttribute('type', 'date');

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
    buttonOkSignUp.setAttribute('class', 'form__item_button');
    buttonOkSignUp.setAttribute('id','buttonOkSignUp');
    buttonOkSignUp.setAttribute('type','button');
    buttonOkSignUp.textContent = 'OK';

    form.append(buttonOkSignUp);
}

function drawRecordContent(servicesList, barbersList, defaultBarber, defaultService, currentUser, recordsList) {
    document.getElementById('main').innerHTML = '';

    const main = document.getElementById('main');

    const mainOrder = document.createElement('div');
    mainOrder.setAttribute('class', 'main__form');

    const form = document.createElement('form');
    form.setAttribute('class', 'form-record form__item_menu');
    form.setAttribute('id', 'form');

    const h1 = document.createElement('h1');
    h1.textContent = 'Запись';

    form.append(h1);

    const div = document.createElement('div');
    div.setAttribute('class', 'form_content');

    let formItem = document.createElement('div');
    formItem.setAttribute('class', 'form__item');

    let label = document.createElement('label');
    label.setAttribute('for', 'email');
    label.textContent = 'Почта:';

    formItem.append(label);

    let input, p, select;

    if (!currentUser) {
        input = document.createElement('input');
        input.setAttribute('id', 'email');
        input.setAttribute('type', 'email');

        formItem.append(input);
    } else {
        p = document.createElement('p');
        p.setAttribute('id', 'email');
        p.setAttribute('class', 'fieldForUsersData');
        p.textContent = currentUser._email;

        formItem.append(p);
    }

    div.append(formItem);

    formItem = document.createElement('div');
    formItem.setAttribute('class', 'form__item');

    label = document.createElement('label');
    label.setAttribute('for', 'firstName');
    label.textContent = 'Имя:';

    formItem.append(label);

    if (!currentUser) {
        input = document.createElement('input');
        input.setAttribute('id', 'firstName');
        input.setAttribute('type', 'text');

        formItem.append(input);
    } else {
        p = document.createElement('p');
        p.setAttribute('id', 'firstName');
        p.setAttribute('class', 'fieldForUsersData');
        p.textContent = currentUser._firstName;

        formItem.append(p);
    }

    div.append(formItem);

    formItem = document.createElement('div');
    formItem.setAttribute('class', 'form__item');

    label = document.createElement('label');
    label.setAttribute('for', 'lastName');
    label.textContent = 'Фамилия:';

    formItem.append(label);

    if (!currentUser) {
        input = document.createElement('input');
        input.setAttribute('id', 'lastName');
        input.setAttribute('type', 'text');

        formItem.append(input);
    } else {
        p = document.createElement('p');
        p.setAttribute('id', 'lastName');
        p.setAttribute('class', 'fieldForUsersData');
        p.textContent = currentUser._lastName;

        formItem.append(p);
    }

    div.append(formItem);

    formItem = document.createElement('div');
    formItem.setAttribute('class', 'form__item_hard-date-time');

    label = document.createElement('label');
    label.setAttribute('for', 'date');
    label.textContent = 'Дата стрижки:';

    formItem.append(label);

    let option;
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

    select = document.createElement('select');
    select.setAttribute('id', 'date');
    select.setAttribute('class', 'hardItemFiends inputDataSelect');

    if (defaultBarber) {
        select.setAttribute('onchange', `setFreeHoursByDay()`);
    } else {
        select.setAttribute('onchange', `setOnChangeBarbersAndHours()`);
    }

    option = document.createElement('option');
    option.setAttribute('class', 'select__option');
    option.setAttribute('id', 'noneDate');
    option.setAttribute('selected', 'selected');


    option.textContent = 'не выбрана';

    select.append(option);

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

        option.textContent = `${dateArray[i][2]}.${tempMonth}.${dateArray[i][3]}`;

        select.append(option);
    }

    formItem.append(select);

    div.append(formItem);

    formItem = document.createElement('div');
    formItem.setAttribute('class', 'form__item_hard-date-time');

    label = document.createElement('label');
    label.setAttribute('for', 'time');
    label.textContent = 'Время стрижки:';

    formItem.append(label);

    select = document.createElement('select');
    select.setAttribute('id', 'time');
    select.setAttribute('class', 'hardItemFiends inputDataSelect');

    if (defaultBarber) {
        select.setAttribute('onchange', `setFreeDaysByHour()`);
    } else {
        select.setAttribute('onchange', `setOnChangeFreeDaysAndBarbers()`);
    }

    option = document.createElement('option');
    option.setAttribute('class', 'select__option');
    option.setAttribute('id', 'noneTime');
    option.setAttribute('selected', 'selected');
    option.textContent = 'не выбрано';

    select.append(option);


    for (let i = 10; i < 21; i++) {
        option = document.createElement('option');
        option.setAttribute('class', 'select__option');
        option.setAttribute('id', `${i}:00`);

        option.textContent = `${i}:00`;

        select.append(option);
    }

    formItem.append(select);

    div.append(formItem);

    formItem = document.createElement('div');
    formItem.setAttribute('class', 'form__item_hard');

    let span = document.createElement('span');
    span.textContent = 'Ваш барбер';

    formItem.append(span);

    select = document.createElement('select');
    select.setAttribute('id', 'select');
    select.setAttribute('class', 'hardItemFiends');
    select.setAttribute('onchange', `setOnChangeFreeDaysAndHours()`);

    option = document.createElement('option');
    option.setAttribute('class', 'select__option');
    option.setAttribute('id', 'noneBarber');
    option.setAttribute('selected', 'selected');
    option.textContent = 'не выбран';

    select.append(option);

    for (let i = 0; i < barbersList.length; i++) {
        option = document.createElement('option');
        option.setAttribute('class', 'select__option');
        option.setAttribute('id', barbersList[i]._email);

        if (defaultBarber && String(defaultBarber._email) === String(barbersList[i]._email)) {
            option.setAttribute('selected', 'selected');
        }

        option.textContent = `${barbersList[i]._firstName} ${barbersList[i]._lastName}, ${barbersList[i]._email}`;

        select.append(option);
    }

    formItem.append(select);

    div.append(formItem);

    formItem = document.createElement('div');
    formItem.setAttribute('class', 'form__item_hard');

    span = document.createElement('span');
    span.textContent = 'Услуга';

    formItem.append(span);

    select = document.createElement('select');
    select.setAttribute('id', 'selectService');
    select.setAttribute('class', 'hardItemFiends');

    option = document.createElement('option');
    option.setAttribute('class', 'select__option');
    option.setAttribute('id', 'noneService');
    option.setAttribute('selected', 'selected');

    option.textContent = 'не выбрана';

    select.append(option);

    for (let i = 0; i < servicesList.length; i++) {
        option = document.createElement('option');
        option.setAttribute('class', 'select__option');
        option.setAttribute('id', servicesList[i]._type);

        if (defaultService && String(defaultService._type) === String(servicesList[i]._type)) {
            option.setAttribute('selected', 'selected');
        }

        option.textContent = `${servicesList[i]._type}, ${servicesList[i]._price} (грн)`;

        select.append(option);
    }

    formItem.append(select);

    div.append(formItem);

    form.append(div);

    const buttonRecord = document.createElement('button');
    buttonRecord.setAttribute('class', 'form__item form__item_button');
    buttonRecord.setAttribute('id', 'buttonRecord');
    buttonRecord.setAttribute('type', 'button');
    buttonRecord.textContent = 'Оформить';

    form.append(buttonRecord);

    mainOrder.append(form);

    main.append(mainOrder);

    let modalDiv = document.createElement('div');
    modalDiv.setAttribute('class', 'modal__back');
    modalDiv.setAttribute('id', 'modal__back_record');

    let window = document.createElement('div');
    window.setAttribute('class', 'modal__window_record');

    let headerModalWindow = document.createElement('h1');
    headerModalWindow.textContent = 'Запись прошла успешно!';

    window.append(headerModalWindow);

    let formContent = document.createElement('div');
    formContent.setAttribute('class', 'form_content');

    formItem = document.createElement('div');
    formItem.setAttribute('class', 'form__item');

    label = document.createElement('p');
    label.textContent = 'Вы записаны успешно. Информация так же придет к вам на почту!';

    formItem.append(label);

    formContent.append(formItem);

    window.append(formContent);

    let buttonSignUp = document.createElement('button');
    buttonSignUp.setAttribute('id', 'configAddRecord');
    buttonSignUp.setAttribute('class', 'form__item_button-modal');
    buttonSignUp.setAttribute('type', 'button');
    buttonSignUp.setAttribute('onclick', 'closeModalSuccessRecorder()');
    buttonSignUp.textContent = 'ОК';

    window.append(buttonSignUp);

    modalDiv.append(window);

    main.append(modalDiv);
}

function drawAdminPage() {
    document.getElementById('headerFunc').innerHTML = '';
    const headerFunc = document.getElementById('headerFunc');

    let button = document.createElement('button');
    button.setAttribute('id', 'data');
    button.setAttribute('class', 'header__item');
    button.textContent = 'Данные';

    headerFunc.append(button);

    button = document.createElement('button');
    button.setAttribute('id', 'logOut');
    button.setAttribute('class', 'header__item');
    button.textContent = 'Выход';

    headerFunc.append(button);
}

function drawAdminDataContent() {
    document.getElementById('main').innerHTML = '';

    const main = document.getElementById('main');

    const div = document.createElement('div');
    div.setAttribute('class', 'main__sections adminData');

    const divTitle = document.createElement('h1');
    divTitle.setAttribute('class', 'service__title');
    divTitle.textContent = 'Данные';

    div.append(divTitle);

    let sectionStore = document.createElement('section');
    sectionStore.setAttribute('class', 'store__section');

    let sectionStoreItem = document.createElement('div');
    sectionStoreItem.setAttribute('class', 'store__section_item');

    let sectionStoreItemHeader = document.createElement('div');
    sectionStoreItemHeader.setAttribute('class', 'store__item_header');

    let sectionStoreItemTitle = document.createElement('h3');
    sectionStoreItemTitle.setAttribute('class', 'service__item_title');
    sectionStoreItemTitle.textContent = 'Пользователи';

    sectionStoreItemHeader.append(sectionStoreItemTitle);

    sectionStoreItem.append(sectionStoreItemHeader);

    let sectionStoreItemImage = document.createElement('div');
    sectionStoreItemImage.setAttribute('class', 'service__item_image');
    sectionStoreItemImage.setAttribute('style', 'background-image: url("./view/image/data/icon1.jpg")');

    sectionStoreItem.append(sectionStoreItemImage);

    let sectionStoreItemButton = document.createElement('button');
    sectionStoreItemButton.setAttribute('class', 'data__button');
    sectionStoreItemButton.setAttribute('id', 'watchSignedUsers');
    sectionStoreItemButton.textContent = 'Посмотреть';

    sectionStoreItem.append(sectionStoreItemButton);

    sectionStore.append(sectionStoreItem);

    sectionStoreItem = document.createElement('div');
    sectionStoreItem.setAttribute('class', 'store__section_item');

    sectionStoreItemHeader = document.createElement('div');
    sectionStoreItemHeader.setAttribute('class', 'store__item_header');

    sectionStoreItemTitle = document.createElement('h3');
    sectionStoreItemTitle.setAttribute('class', 'service__item_title');
    sectionStoreItemTitle.textContent = 'Черный список';

    sectionStoreItemHeader.append(sectionStoreItemTitle);

    sectionStoreItem.append(sectionStoreItemHeader);

    sectionStoreItemImage = document.createElement('div');
    sectionStoreItemImage.setAttribute('class', 'service__item_image');
    sectionStoreItemImage.setAttribute('style', 'background-image: url("./view/image/data/icon2.jpg")');

    sectionStoreItem.append(sectionStoreItemImage);

    sectionStoreItemButton = document.createElement('button');
    sectionStoreItemButton.setAttribute('class', 'data__button');
    sectionStoreItemButton.setAttribute('id', 'watchBlackListUsers');
    sectionStoreItemButton.textContent = 'Посмотреть';

    sectionStoreItem.append(sectionStoreItemButton);

    sectionStore.append(sectionStoreItem);

    sectionStoreItem = document.createElement('div');
    sectionStoreItem.setAttribute('class', 'store__section_item');

    sectionStoreItemHeader = document.createElement('div');
    sectionStoreItemHeader.setAttribute('class', 'store__item_header');

    sectionStoreItemTitle = document.createElement('h3');
    sectionStoreItemTitle.setAttribute('class', 'service__item_title');
    sectionStoreItemTitle.textContent = 'Товары';

    sectionStoreItemHeader.append(sectionStoreItemTitle);

    sectionStoreItem.append(sectionStoreItemHeader);

    sectionStoreItemImage = document.createElement('div');
    sectionStoreItemImage.setAttribute('class', 'service__item_image');
    sectionStoreItemImage.setAttribute('style', 'background-image: url("./view/image/data/icon5.jpg")');

    sectionStoreItem.append(sectionStoreItemImage);

    sectionStoreItemButton = document.createElement('button');
    sectionStoreItemButton.setAttribute('class', 'data__button');
    sectionStoreItemButton.setAttribute('id', 'watchStore');
    sectionStoreItemButton.textContent = 'Посмотреть';

    sectionStoreItem.append(sectionStoreItemButton);

    sectionStore.append(sectionStoreItem);

    div.append(sectionStore);

    sectionStore = document.createElement('section');
    sectionStore.setAttribute('class', 'store__section');

    sectionStoreItem = document.createElement('div');
    sectionStoreItem.setAttribute('class', 'store__section_item');

    sectionStoreItemHeader = document.createElement('div');
    sectionStoreItemHeader.setAttribute('class', 'store__item_header');

    sectionStoreItemTitle = document.createElement('h3');
    sectionStoreItemTitle.setAttribute('class', 'service__item_title');
    sectionStoreItemTitle.textContent = 'Барберы';

    sectionStoreItemHeader.append(sectionStoreItemTitle);

    sectionStoreItem.append(sectionStoreItemHeader);

    sectionStoreItemImage = document.createElement('div');
    sectionStoreItemImage.setAttribute('class', 'service__item_image');
    sectionStoreItemImage.setAttribute('style', 'background-image: url("./view/image/data/icon4.jpg")');

    sectionStoreItem.append(sectionStoreItemImage);

    sectionStoreItemButton = document.createElement('button');
    sectionStoreItemButton.setAttribute('class', 'data__button');
    sectionStoreItemButton.setAttribute('id', 'watchBarbers');
    sectionStoreItemButton.textContent = 'Посмотреть';

    sectionStoreItem.append(sectionStoreItemButton);

    sectionStore.append(sectionStoreItem);

    sectionStoreItem = document.createElement('div');
    sectionStoreItem.setAttribute('class', 'store__section_item');

    sectionStoreItemHeader = document.createElement('div');
    sectionStoreItemHeader.setAttribute('class', 'store__item_header');

    sectionStoreItemTitle = document.createElement('h3');
    sectionStoreItemTitle.setAttribute('class', 'service__item_title');
    sectionStoreItemTitle.textContent = 'Услуги';

    sectionStoreItemHeader.append(sectionStoreItemTitle);

    sectionStoreItem.append(sectionStoreItemHeader);

    sectionStoreItemImage = document.createElement('div');
    sectionStoreItemImage.setAttribute('class', 'service__item_image');
    sectionStoreItemImage.setAttribute('style', 'background-image: url("./view/image/data/icon6.jpg")');

    sectionStoreItem.append(sectionStoreItemImage);

    sectionStoreItemButton = document.createElement('button');
    sectionStoreItemButton.setAttribute('class', 'data__button');
    sectionStoreItemButton.setAttribute('id', 'watchServices');
    sectionStoreItemButton.textContent = 'Посмотреть';

    sectionStoreItem.append(sectionStoreItemButton);

    sectionStore.append(sectionStoreItem);

    sectionStoreItem = document.createElement('div');
    sectionStoreItem.setAttribute('class', 'store__section_item');

    sectionStoreItemHeader = document.createElement('div');
    sectionStoreItemHeader.setAttribute('class', 'store__item_header');

    sectionStoreItemTitle = document.createElement('h3');
    sectionStoreItemTitle.setAttribute('class', 'service__item_title');
    sectionStoreItemTitle.textContent = 'Записи';

    sectionStoreItemHeader.append(sectionStoreItemTitle);

    sectionStoreItem.append(sectionStoreItemHeader);

    sectionStoreItemImage = document.createElement('div');
    sectionStoreItemImage.setAttribute('class', 'service__item_image');
    sectionStoreItemImage.setAttribute('style', 'background-image: url("./view/image/data/icon7.jpg")');

    sectionStoreItem.append(sectionStoreItemImage);

    sectionStoreItemButton = document.createElement('button');
    sectionStoreItemButton.setAttribute('class', 'data__button');
    sectionStoreItemButton.setAttribute('id', 'watchRecords');
    sectionStoreItemButton.textContent = 'Посмотреть';

    sectionStoreItem.append(sectionStoreItemButton);

    sectionStore.append(sectionStoreItem);

    div.append(sectionStore);

    main.append(div);
}

function drawRecord(number, record) {
    const container = document.getElementById('main__section');

    const section = document.createElement('section');
    section.setAttribute('class', 'section__record');

    let div = document.createElement('div');
    div.setAttribute('class', 'section__record_item');

    // console.log(record);
    const { _firstName, _lastName, _email, _dateTime, _service, _barber } = record;
    const array = [number, _firstName, _lastName, _email, _dateTime, _service, _barber];

    let item;

    for (let i = 0; i < array.length; i++) {
        item = document.createElement('div');

        if (i === 3 || i === 4 || i === 6) {
            item.setAttribute('class', 'section__service_item-cell_email');
        } else {
            item.setAttribute('class', 'section__service_item-cell_number');
        }

        item.textContent = array[i];

        div.append(item);
    }

    section.append(div);

    container.append(section);
}

function drawRecordsInfo() {
    document.getElementById('main').innerHTML = '';

    const main = document.getElementById('main');

    const div = document.createElement('div');
    div.setAttribute('class', 'main__sections adminData');

    const divTitle = document.createElement('h1');
    divTitle.setAttribute('class', 'service__title');
    divTitle.textContent = 'Список записей';

    div.append(divTitle);

    const sectionContainer = document.createElement('div');
    sectionContainer.setAttribute('class', 'section__container_service');
    sectionContainer.setAttribute('id', 'main__section');

    const headerSection = document.createElement('section');
    headerSection.setAttribute('class', 'section__main_record');

    let headerSectionItem = document.createElement('div');
    headerSectionItem.setAttribute('class', 'section__barber_item');

    const array = ['№', 'Имя', 'Фамилия', 'Почта', 'Дата', 'Услуга', 'Барбер'];

    let item;

    for (let i = 0; i < array.length; i++) {
        item = document.createElement('div');

        if (array[i] === 'Почта' || array[i] === 'Дата') {
            item.setAttribute('class', 'section__service_item-cell_email');
        } else {
            item.setAttribute('class', 'section__service_item-cell_number');
        }

        item.textContent = array[i];

        headerSectionItem.append(item);
    }

    headerSection.append(headerSectionItem);

    sectionContainer.append(headerSection);

    div.append(sectionContainer);

    main.append(div);
}

function hideButtonMouseOverSalary(number, salary, email) {
    const section = document.getElementsByClassName('section__barber_item')[number].children;

    section[6].setAttribute('class', 'section__barber_item-cell_number');
    section[6].removeAttribute('onclick');
    section[6].setAttribute('onmouseover', `showButtonMouseOverSalary('${number}', '${email}')`);
    section[6].textContent = salary;
}

function showButtonMouseOverSalary(number, email) {
    const section = document.getElementsByClassName('section__barber_item')[number].children;

    section[6].setAttribute('class', 'section__button_barber-changeSalary');
    section[6].setAttribute('onclick', `openModalChangeSalary('${email}')`);
    section[6].textContent = 'Изменить';
}

function showButtonMouseOverPrice(number, type) {
    const section = document.getElementsByClassName('section__service_item')[number].children;

    section[2].setAttribute('class', 'section__button_service-changePrice');
    section[2].setAttribute('onclick', `openModalChangePrice('${type}')`);
    section[2].textContent = 'Изменить';
}

function hideButtonMouseOverPrice(number, price, type) {
    const section = document.getElementsByClassName('section__service_item')[number].children;

    section[2].setAttribute('class', 'section__service_item-cell_number');
    section[2].removeAttribute('onclick');
    section[2].setAttribute('onmouseover', `showButtonMouseOverPrice('${number}', '${type}')`);
    section[2].textContent = price;
}

function showButtonMouseOverPriceStoreItem(number, type) {
    const section = document.getElementsByClassName('section__service_item')[number].children;

    section[2].setAttribute('class', 'section__button_storeItem-changePrice');
    section[2].setAttribute('onclick', `openModalChangePriceStoreItem('${type}')`);
    section[2].textContent = 'Изменить';
}

function hideButtonMouseOverPriceStoreItem(number, price, type) {
    const section = document.getElementsByClassName('section__service_item')[number].children;

    section[2].setAttribute('class', 'section__store_item-cell_number');
    section[2].removeAttribute('onclick');
    section[2].setAttribute('onmouseover', `showButtonMouseOverPriceStoreItem('${number}', '${type}')`);
    section[2].textContent = price;
}

function drawStoreItem(number, store) {
    const container = document.getElementById('main__section');

    const section = document.createElement('section');
    section.setAttribute('class', 'section__storeItem');

    let div = document.createElement('div');
    div.setAttribute('class', 'section__service_item');

    const {_type, _price, _mark} = store;
    const array = [number, _type, _price, _mark ];
    const arrayNames = ['№', 'Тип', 'Цена', 'Марка'];

    let item;

    for (let i = 0; i < array.length; i++) {
        item = document.createElement('div');

        if (arrayNames[i] === '№' || arrayNames[i] === 'Цена') {
            item.setAttribute('class', 'section__store_item-cell_number');
        } else if (arrayNames[i] === 'Тип' || arrayNames[i] === 'Марка') {
            item.setAttribute('class', 'section__barber_item-cell_email');
        } else {
            item.setAttribute('class', 'section__barber_item-cell_name');
        }

        if (i === 2) {
            item.setAttribute('onmouseover', `showButtonMouseOverPriceStoreItem('${number - 1}', '${_type}')`);
            item.setAttribute('onmouseout', `hideButtonMouseOverPriceStoreItem('${number - 1}', '${_price}', '${_type}')`);
        }

        item.textContent = array[i];

        div.append(item);
    }

    section.append(div);

    const button = document.createElement('button');
    button.setAttribute('class', 'removeService');
    button.setAttribute('id', `removeService${store._type}`);
    button.setAttribute('onclick', `clickDeleteStoreItem('${store._type}')`);
    button.textContent = 'Удалить';

    section.append(button);

    container.append(section);
}

function drawStoreInfo() {
    document.getElementById('main').innerHTML = '';

    const main = document.getElementById('main');

    const div = document.createElement('div');
    div.setAttribute('class', 'main__sections adminData');

    const divTitle = document.createElement('h1');
    divTitle.setAttribute('class', 'service__title');
    divTitle.textContent = 'Информация о товарах';

    div.append(divTitle);

    const addStoreItemButton = document.createElement('button');
    addStoreItemButton.setAttribute('id', 'addStoreItemButton');
    addStoreItemButton.setAttribute('style', 'background-image: url("./view/image/barbers/icons/icon1.png")');

    div.append(addStoreItemButton);

    const sectionContainer = document.createElement('div');
    sectionContainer.setAttribute('class', 'section__container');
    sectionContainer.setAttribute('id', 'main__section');

    const headerSection = document.createElement('section');
    headerSection.setAttribute('class', 'section__main');

    let headerSectionItem = document.createElement('div');
    headerSectionItem.setAttribute('class', 'section__barber_item');

    const array = ['№', 'Тип', 'Цена', 'Марка'];

    let item;

    for (let i = 0; i < array.length; i++) {
        item = document.createElement('div');

        if (array[i] === '№' || array[i] === 'Цена') {
            item.setAttribute('class', 'section__store_item-cell_number');
        } else if (array[i] === 'Описание' || array[i] === 'Тип' || array[i] === 'Срок годности' || array[i] === 'Марка') {
            item.setAttribute('class', 'section__barber_item-cell_email');
        } else {
            item.setAttribute('class', 'section__barber_item-cell_name');
        }

        item.textContent = array[i];

        headerSectionItem.append(item);
    }

    headerSection.append(headerSectionItem);

    sectionContainer.append(headerSection);

    div.append(sectionContainer);

    main.append(div);

    let arrayTextContent = ['Тип', 'Цена', 'Марка'];
    let arrayValues = ['type', 'price', 'mark'];

    let modalDiv = document.createElement('div');
    modalDiv.setAttribute('class', 'modal__back');
    modalDiv.setAttribute('id', 'modal__back_store');

    let window = document.createElement('div');
    window.setAttribute('class', 'modal__window');

    let headerModalWindow = document.createElement('h1');
    headerModalWindow.textContent = 'Новый товар';

    window.append(headerModalWindow);

    let formContent = document.createElement('div');
    formContent.setAttribute('class', 'form_content');

    let formItem, label, input;

    for (let i = 0; i < arrayTextContent.length; i++) {
        formItem = document.createElement('div');
        formItem.setAttribute('class', 'form__item');

        label = document.createElement('label');
        label.setAttribute('for', arrayValues[i]);
        label.textContent = arrayTextContent[i];

        formItem.append(label);

        input = document.createElement('input');
        input.setAttribute('id', arrayValues[i]);
        input.setAttribute('type', 'text');

        formItem.append(input);

        formContent.append(formItem);
    }

    window.append(formContent);

    let divButtons = document.createElement('div');
    divButtons.setAttribute('class', 'formDivButtons');

    let buttonLogIn = document.createElement('button');
    buttonLogIn.setAttribute('id', 'cancelAddStoreItem');
    buttonLogIn.setAttribute('class', 'form__item_button-modal');
    buttonLogIn.setAttribute('type', 'button');
    buttonLogIn.textContent = 'Отмена';

    divButtons.append(buttonLogIn);

    let buttonSignUp = document.createElement('button');
    buttonSignUp.setAttribute('id', 'configAddStoreItem');
    buttonSignUp.setAttribute('class', 'form__item_button-modal');
    buttonSignUp.setAttribute('type', 'button');
    buttonSignUp.textContent = 'Добавить';

    divButtons.append(buttonSignUp);

    window.append(divButtons);

    modalDiv.append(window);

    main.append(modalDiv);

    modalDiv = document.createElement('div');
    modalDiv.setAttribute('class', 'modal__back');
    modalDiv.setAttribute('id', 'modal__back_confirmDeleteStoreItem');

    window = document.createElement('div');
    window.setAttribute('class', 'modal__window_delete');

    headerModalWindow = document.createElement('h1');
    headerModalWindow.textContent = 'Вы уверены что хотите удалить этот товар из списка продаж?';

    window.append(headerModalWindow);

    formContent = document.createElement('div');
    formContent.setAttribute('class', 'form_content');

    let span;

    arrayTextContent = ['Тип', 'Цена', 'Марка'];
    arrayValues = ['typeDeleteStoreItem', 'priceDeleteStoreItem', 'markDeleteStoreItem'];

    for (let i = 0; i < arrayTextContent.length; i++) {
        formItem = document.createElement('div');
        formItem.setAttribute('class', 'form__item');

        span = document.createElement('span');
        span.textContent = arrayTextContent[i];

        formItem.append(span);

        span = document.createElement('span');
        span.setAttribute('id', arrayValues[i]);

        formItem.append(span);

        formContent.append(formItem);
    }

    window.append(formContent);

    divButtons = document.createElement('div');
    divButtons.setAttribute('class', 'formDivButtons');

    buttonLogIn = document.createElement('button');
    buttonLogIn.setAttribute('id', 'cancelDeleteStoreItem');
    buttonLogIn.setAttribute('class', 'form__item_button-modal');
    buttonLogIn.setAttribute('type', 'button');
    buttonLogIn.textContent = 'Нет';

    divButtons.append(buttonLogIn);

    buttonSignUp = document.createElement('button');
    buttonSignUp.setAttribute('id', 'confirmDeleteStoreItem');
    buttonSignUp.setAttribute('class', 'form__item_button-modal');
    buttonSignUp.setAttribute('type', 'button');
    buttonSignUp.textContent = 'Да';

    divButtons.append(buttonSignUp);

    window.append(divButtons);

    modalDiv.append(window);

    main.append(modalDiv);


    modalDiv = document.createElement('div');
    modalDiv.setAttribute('class', 'modal__back');
    modalDiv.setAttribute('id', 'modal__back_changeStoreItem');

    window = document.createElement('div');
    window.setAttribute('class', 'modal__window_change');

    headerModalWindow = document.createElement('h1');
    headerModalWindow.textContent = 'Изменение цены товара';

    window.append(headerModalWindow);

    formContent = document.createElement('div');
    formContent.setAttribute('class', 'form_content');

    arrayTextContent = ['Тип', 'Цена', 'Марка'];
    arrayValues = ['typeChange', 'priceChange', 'markChange'];

    for (let i = 0; i < 2; i++) {
        formItem = document.createElement('div');
        formItem.setAttribute('class', 'form__item');

        span = document.createElement('span');
        span.textContent = arrayTextContent[i];

        formItem.append(span);

        span = document.createElement('span');
        span.setAttribute('id', arrayValues[i]);

        formItem.append(span);

        formContent.append(formItem);
    }

    formItem = document.createElement('div');
    formItem.setAttribute('class', 'form__item');

    label = document.createElement('label');
    label.setAttribute('for', 'newPriceStoreItem');
    label.textContent = 'Новая цена:';

    formItem.append(label);

    input = document.createElement('input');
    input.setAttribute('id', 'newPriceStoreItem');
    input.setAttribute('type', 'text');

    formItem.append(input);

    formContent.append(formItem);

    window.append(formContent);

    divButtons = document.createElement('div');
    divButtons.setAttribute('class', 'formDivButtons');

    buttonLogIn = document.createElement('button');
    buttonLogIn.setAttribute('id', 'cancelChangeStoreItemPrice');
    buttonLogIn.setAttribute('class', 'form__item_button-modal');
    buttonLogIn.setAttribute('type', 'button');
    buttonLogIn.textContent = 'Отмена';

    divButtons.append(buttonLogIn);

    buttonSignUp = document.createElement('button');
    buttonSignUp.setAttribute('id', 'confirmChangeStoreItemPrice');
    buttonSignUp.setAttribute('class', 'form__item_button-modal');
    buttonSignUp.setAttribute('type', 'button');
    buttonSignUp.textContent = 'Изменить';

    divButtons.append(buttonSignUp);

    window.append(divButtons);

    modalDiv.append(window);

    main.append(modalDiv);
}

function drawBarber(number, barber) {
    const container = document.getElementById('main__section');

    const section = document.createElement('section');
    section.setAttribute('class', 'section__barber');

    let div = document.createElement('div');
    div.setAttribute('class', 'section__barber_item');

    const {_firstName, _lastName, _email, _age, _experience, _salary, _rating, _fired } = barber;
    const array = [number, _firstName, _lastName, _email, _age, _experience, _salary, _rating];

    let item;

    for (let i = 0; i < array.length; i++) {
        item = document.createElement('div');

        if (i === 3) {
            item.setAttribute('class', 'section__barber_item-cell_email');
        } else if (i === 1 || i === 2) {
            item.setAttribute('class', 'section__barber_item-cell_name');
        } else {
            item.setAttribute('class', 'section__barber_item-cell_number');
        }

        if (i === 6 && _fired === '-') {
            item.setAttribute('onmouseover', `showButtonMouseOverSalary('${number}', '${_email}')`);
            item.setAttribute('onmouseout', `hideButtonMouseOverSalary('${number}', '${_salary}', '${_email}')`);
        }

        item.textContent = array[i];

        div.append(item);
    }

    section.append(div);

    if (_fired === '-') {
        const button = document.createElement('button');
        button.setAttribute('class', 'removeBarber');
        button.setAttribute('id', `removeBarber${barber._email}`);
        button.setAttribute('onclick', `clickDeleteBarber('${barber._email}')`);
        button.textContent = 'Уволить';

        section.append(button);
    } else {
        const div = document.createElement('div');
        div.setAttribute('class', 'removedBarber');
        div.textContent = 'Уволeн';
        div.setAttribute('title', _fired);

        section.append(div);
    }

    container.append(section);
}

function drawBarbersInfo() {
    document.getElementById('main').innerHTML = '';

    const main = document.getElementById('main');

    const div = document.createElement('div');
    div.setAttribute('class', 'main__sections adminData');

    const divTitle = document.createElement('h1');
    divTitle.setAttribute('class', 'service__title');
    divTitle.textContent = 'Информация о барберах';

    div.append(divTitle);

    const addBarberButton = document.createElement('button');
    addBarberButton.setAttribute('id', 'addBarberButton');
    addBarberButton.setAttribute('style', 'background-image: url("./view/image/barbers/icons/icon1.png")');

    div.append(addBarberButton);

    const sectionContainer = document.createElement('div');
    sectionContainer.setAttribute('class', 'section__container');
    sectionContainer.setAttribute('id', 'main__section');

    const headerSection = document.createElement('section');
    headerSection.setAttribute('class', 'section__main');

    let headerSectionItem = document.createElement('div');
    headerSectionItem.setAttribute('class', 'section__barber_item');

    const array = ['№', 'Имя', 'Фамилия', 'Почта', 'Возраст', 'Стаж', 'Зарплата', 'Рейтинг'];

    let item;

    for (let i = 0; i < array.length; i++) {
        item = document.createElement('div');

        if (array[i] === 'Почта') {
            item.setAttribute('class', 'section__barber_item-cell_email');
        } else if (array[i] === 'Имя' || array[i] === 'Фамилия') {
            item.setAttribute('class', 'section__barber_item-cell_name');
        } else {
            item.setAttribute('class', 'section__barber_item-cell_number');
        }

        item.textContent = array[i];

        headerSectionItem.append(item);
    }

    headerSection.append(headerSectionItem);

    sectionContainer.append(headerSection);

    div.append(sectionContainer);

    main.append(div);

    let arrayTextContent = ['Имя:', 'Фамилия:', 'Возраст:', 'Стаж:', 'Зарплата(грн):', 'Рейтинг(10/10):'];
    let arrayValues = ['firstName', 'lastName', 'age', 'experience', 'salary', 'rating'];

    let modalDiv = document.createElement('div');
    modalDiv.setAttribute('class', 'modal__back');
    modalDiv.setAttribute('id', 'modal__back');

    let window = document.createElement('div');
    window.setAttribute('class', 'modal__window');

    let headerModalWindow = document.createElement('h1');
    headerModalWindow.textContent = 'Новый барбер';

    window.append(headerModalWindow);

    let formContent = document.createElement('div');
    formContent.setAttribute('class', 'form_content');

    let formItem, label, input;

    for (let i = 0; i < arrayTextContent.length; i++) {
        formItem = document.createElement('div');
        formItem.setAttribute('class', 'form__item');

        label = document.createElement('label');
        label.setAttribute('for', arrayValues[i]);
        label.textContent = arrayTextContent[i];

        formItem.append(label);

        input = document.createElement('input');
        input.setAttribute('id', arrayValues[i]);
        input.setAttribute('type', 'text');

        formItem.append(input);

        formContent.append(formItem);
    }

    formItem = document.createElement('div');
    formItem.setAttribute('class', 'form__item');

    label = document.createElement('label');
    label.setAttribute('for', 'email');
    label.textContent = 'Почта:';

    formItem.append(label);

    input = document.createElement('input');
    input.setAttribute('id', 'email');
    input.setAttribute('type', 'email');

    formItem.append(input);

    formContent.append(formItem);

    window.append(formContent);

    let divButtons = document.createElement('div');
    divButtons.setAttribute('class', 'formDivButtons');

    let buttonLogIn = document.createElement('button');
    buttonLogIn.setAttribute('id', 'cancel');
    buttonLogIn.setAttribute('class', 'form__item_button-modal');
    buttonLogIn.setAttribute('type', 'button');
    buttonLogIn.textContent = 'Отмена';

    divButtons.append(buttonLogIn);

    let buttonSignUp = document.createElement('button');
    buttonSignUp.setAttribute('id', 'configAddBarber');
    buttonSignUp.setAttribute('class', 'form__item_button-modal');
    buttonSignUp.setAttribute('type', 'button');
    buttonSignUp.textContent = 'Добавить';

    divButtons.append(buttonSignUp);

    window.append(divButtons);

    modalDiv.append(window);

    main.append(modalDiv);

    modalDiv = document.createElement('div');
    modalDiv.setAttribute('class', 'modal__back');
    modalDiv.setAttribute('id', 'modal__back_confirm');

    window = document.createElement('div');
    window.setAttribute('class', 'modal__window_delete');

    headerModalWindow = document.createElement('h1');
    headerModalWindow.textContent = 'Вы уверены что хотите уволить этого барбера?';

    window.append(headerModalWindow);

    formContent = document.createElement('div');
    formContent.setAttribute('class', 'form_content');

    let span;

    arrayTextContent = ['Имя:', 'Фамилия:', 'Возраст:', 'Стаж:', 'Зарплата(грн):', 'Рейтинг(10/10):', 'Почта:'];
    arrayValues = ['firstNameDelete', 'lastNameDelete', 'ageDelete', 'experienceDelete', 'salaryDelete', 'ratingDelete', 'emailDelete'];

    for (let i = 0; i < arrayTextContent.length; i++) {
        formItem = document.createElement('div');
        formItem.setAttribute('class', 'form__item');

        span = document.createElement('span');
        span.textContent = arrayTextContent[i];

        formItem.append(span);

        span = document.createElement('span');
        span.setAttribute('id', arrayValues[i]);

        formItem.append(span);

        formContent.append(formItem);
    }

    window.append(formContent);

    divButtons = document.createElement('div');
    divButtons.setAttribute('class', 'formDivButtons');

    buttonLogIn = document.createElement('button');
    buttonLogIn.setAttribute('id', 'cancelDeleteBarber');
    buttonLogIn.setAttribute('class', 'form__item_button-modal');
    buttonLogIn.setAttribute('type', 'button');
    buttonLogIn.textContent = 'Нет';

    divButtons.append(buttonLogIn);

    buttonSignUp = document.createElement('button');
    buttonSignUp.setAttribute('id', 'confirmDeleteBarber');
    buttonSignUp.setAttribute('class', 'form__item_button-modal');
    buttonSignUp.setAttribute('type', 'button');
    buttonSignUp.textContent = 'Да';

    divButtons.append(buttonSignUp);

    window.append(divButtons);

    modalDiv.append(window);

    main.append(modalDiv);

    modalDiv = document.createElement('div');
    modalDiv.setAttribute('class', 'modal__back');
    modalDiv.setAttribute('id', 'modal__back_changeSalary');

    window = document.createElement('div');
    window.setAttribute('class', 'modal__window_change');

    headerModalWindow = document.createElement('h1');
    headerModalWindow.textContent = 'Изменение зарплаты';

    window.append(headerModalWindow);

    formContent = document.createElement('div');
    formContent.setAttribute('class', 'form_content');

    arrayTextContent = ['Имя:', 'Фамилия:', 'Почта:', 'Текущая зарплата:'];
    arrayValues = ['firstNameChange', 'lastNameChange', 'emailChange', 'currentSalaryChange'];

    for (let i = 0; i < arrayTextContent.length; i++) {
        formItem = document.createElement('div');
        formItem.setAttribute('class', 'form__item');

        span = document.createElement('span');
        span.textContent = arrayTextContent[i];

        formItem.append(span);

        span = document.createElement('span');
        span.setAttribute('id', arrayValues[i]);

        formItem.append(span);

        formContent.append(formItem);
    }

    formItem = document.createElement('div');
    formItem.setAttribute('class', 'form__item');

    label = document.createElement('label');
    label.setAttribute('for', 'newSalary');
    label.textContent = 'Новая зарплата:';

    formItem.append(label);

    input = document.createElement('input');
    input.setAttribute('id', 'newSalary');
    input.setAttribute('type', 'text');

    formItem.append(input);

    formContent.append(formItem);

    window.append(formContent);

    divButtons = document.createElement('div');
    divButtons.setAttribute('class', 'formDivButtons');

    buttonLogIn = document.createElement('button');
    buttonLogIn.setAttribute('id', 'cancelChangeBarberSalary');
    buttonLogIn.setAttribute('class', 'form__item_button-modal');
    buttonLogIn.setAttribute('type', 'button');
    buttonLogIn.textContent = 'Отмена';

    divButtons.append(buttonLogIn);

    buttonSignUp = document.createElement('button');
    buttonSignUp.setAttribute('id', 'confirmChangeBarberSalary');
    buttonSignUp.setAttribute('class', 'form__item_button-modal');
    buttonSignUp.setAttribute('type', 'button');
    buttonSignUp.textContent = 'Изменить';

    divButtons.append(buttonSignUp);

    window.append(divButtons);

    modalDiv.append(window);

    main.append(modalDiv);
}

function drawBlackListUsers() {
    document.getElementById('main').innerHTML = '';

    const main = document.getElementById('main');

    const div = document.createElement('div');
    div.setAttribute('class', 'main__sections adminData');

    const divTitle = document.createElement('h1');
    divTitle.setAttribute('class', 'service__title');
    divTitle.textContent = 'Черный список пользователей';

    div.append(divTitle);

    const sectionContainer = document.createElement('div');
    sectionContainer.setAttribute('class', 'section__container');
    sectionContainer.setAttribute('id', 'main__section');

    const headerSection = document.createElement('section');
    headerSection.setAttribute('class', 'section__main');

    let headerSectionItem = document.createElement('div');
    headerSectionItem.setAttribute('class', 'section__barber_item');

    const array = ['№', 'Имя', 'Фамилия', 'Почта', 'Дата рождения'];

    let item;

    for (let i = 0; i < array.length; i++) {
        item = document.createElement('div');

        if (array[i] === '№') {
            item.setAttribute('class', 'section__store_item-cell_number');
        } else if (array[i] === 'Почта' || array[i] === 'Дата рождения') {
            item.setAttribute('class', 'section__barber_item-cell_email');
        } else {
            item.setAttribute('class', 'section__barber_item-cell_name');
        }

        item.textContent = array[i];

        headerSectionItem.append(item);
    }

    headerSection.append(headerSectionItem);

    sectionContainer.append(headerSection);

    div.append(sectionContainer);

    main.append(div);

    let modalDiv = document.createElement('div');
    modalDiv.setAttribute('class', 'modal__back');
    modalDiv.setAttribute('id', 'modal__back_confirmDeleteUser');

    let window = document.createElement('div');
    window.setAttribute('class', 'modal__window_delete');

    let headerModalWindow = document.createElement('h1');
    headerModalWindow.textContent = 'Вы уверены что хотите убрать этого пользователя из черного списка?';

    window.append(headerModalWindow);

    let formContent = document.createElement('div');
    formContent.setAttribute('class', 'form_content');

    let span,formItem;

    let arrayTextContent = ['Имя', 'Фамилия', 'Почта', 'Дата рождения'];
    let arrayValues = ['firstNameDeleteUser', 'lastNameDeleteUser', 'emailDeleteUser', 'dateDeleteUser'];

    for (let i = 0; i < arrayTextContent.length; i++) {
        formItem = document.createElement('div');
        formItem.setAttribute('class', 'form__item');

        span = document.createElement('span');
        span.textContent = arrayTextContent[i];

        formItem.append(span);

        span = document.createElement('span');
        span.setAttribute('id', arrayValues[i]);

        formItem.append(span);

        formContent.append(formItem);
    }

    window.append(formContent);

    let divButtons = document.createElement('div');
    divButtons.setAttribute('class', 'formDivButtons');

    let buttonLogIn = document.createElement('button');
    buttonLogIn.setAttribute('id', 'cancelDeleteUser');
    buttonLogIn.setAttribute('class', 'form__item_button-modal');
    buttonLogIn.setAttribute('type', 'button');
    buttonLogIn.textContent = 'Нет';

    divButtons.append(buttonLogIn);

    let buttonSignUp = document.createElement('button');
    buttonSignUp.setAttribute('id', 'confirmDeleteUser');
    buttonSignUp.setAttribute('class', 'form__item_button-modal');
    buttonSignUp.setAttribute('type', 'button');
    buttonSignUp.textContent = 'Да';

    divButtons.append(buttonSignUp);

    window.append(divButtons);

    modalDiv.append(window);

    main.append(modalDiv);
}

function drawUsersInfo() {
    document.getElementById('main').innerHTML = '';

    const main = document.getElementById('main');

    const div = document.createElement('div');
    div.setAttribute('class', 'main__sections adminData');

    const divTitle = document.createElement('h1');
    divTitle.setAttribute('class', 'service__title');
    divTitle.textContent = 'Информация о пользователях';

    div.append(divTitle);

    const sectionContainer = document.createElement('div');
    sectionContainer.setAttribute('class', 'section__container');
    sectionContainer.setAttribute('id', 'main__section');

    const headerSection = document.createElement('section');
    headerSection.setAttribute('class', 'section__main');

    let headerSectionItem = document.createElement('div');
    headerSectionItem.setAttribute('class', 'section__barber_item');

    const array = ['№', 'Имя', 'Фамилия', 'Почта', 'Дата рождения'];

    let item;

    for (let i = 0; i < array.length; i++) {
        item = document.createElement('div');

        if (array[i] === '№') {
            item.setAttribute('class', 'section__store_item-cell_number');
        } else if (array[i] === 'Почта' || array[i] === 'Дата рождения') {
            item.setAttribute('class', 'section__barber_item-cell_email');
        } else {
            item.setAttribute('class', 'section__barber_item-cell_name');
        }

        item.textContent = array[i];

        headerSectionItem.append(item);
    }

    headerSection.append(headerSectionItem);

    sectionContainer.append(headerSection);

    div.append(sectionContainer);

    main.append(div);

    let modalDiv = document.createElement('div');
    modalDiv.setAttribute('class', 'modal__back');
    modalDiv.setAttribute('id', 'modal__back_confirmDeleteUser');

    let window = document.createElement('div');
    window.setAttribute('class', 'modal__window_delete');

    let headerModalWindow = document.createElement('h1');
    headerModalWindow.textContent = 'Вы уверены что хотите добавить этого пользователя в черный список?';

    window.append(headerModalWindow);

    let formContent = document.createElement('div');
    formContent.setAttribute('class', 'form_content');

    let span,formItem;

    let arrayTextContent = ['Имя', 'Фамилия', 'Почта', 'Дата рождения'];
    let arrayValues = ['firstNameDeleteUser', 'lastNameDeleteUser', 'emailDeleteUser', 'dateDeleteUser'];

    for (let i = 0; i < arrayTextContent.length; i++) {
        formItem = document.createElement('div');
        formItem.setAttribute('class', 'form__item');

        span = document.createElement('span');
        span.textContent = arrayTextContent[i];

        formItem.append(span);

        span = document.createElement('span');
        span.setAttribute('id', arrayValues[i]);

        formItem.append(span);

        formContent.append(formItem);
    }

    window.append(formContent);

    let divButtons = document.createElement('div');
    divButtons.setAttribute('class', 'formDivButtons');

    let buttonLogIn = document.createElement('button');
    buttonLogIn.setAttribute('id', 'cancelDeleteUser');
    buttonLogIn.setAttribute('class', 'form__item_button-modal');
    buttonLogIn.setAttribute('type', 'button');
    buttonLogIn.textContent = 'Нет';

    divButtons.append(buttonLogIn);

    let buttonSignUp = document.createElement('button');
    buttonSignUp.setAttribute('id', 'confirmDeleteUser');
    buttonSignUp.setAttribute('class', 'form__item_button-modal');
    buttonSignUp.setAttribute('type', 'button');
    buttonSignUp.textContent = 'Да';

    divButtons.append(buttonSignUp);

    window.append(divButtons);

    modalDiv.append(window);

    main.append(modalDiv);
}

function drawUserPage(type) {
    const headerItems = document.getElementById('headerItems');

    let item;

    if (!type) {
        item = document.createElement('button');
        item.setAttribute('id', 'mine');
        item.setAttribute('class', 'header__item');
        item.textContent = 'Мое';

        headerItems.append(item);
    }

    const headerFunc = document.getElementById('headerFunc');

    const elem = document.getElementById("logIn");
    elem.remove();

    const button = document.createElement('button');
    button.setAttribute('id', 'logOut');
    button.setAttribute('class', 'header__item');
    button.textContent = 'Выход';

    headerFunc.append(button);
}

function drawHomePage(person) {
    document.getElementById('headerItems').innerHTML = '';

    const headerItems = document.getElementById('headerItems');

    let button = document.createElement('button');
    button.setAttribute('id', 'home');
    button.setAttribute('class', 'header__item');
    button.textContent = 'Главная';

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
    button.textContent = 'Товары';

    headerItems.append(button);

    // button = document.createElement('button');
    // button.setAttribute('id', 'about');
    // button.setAttribute('class', 'header__item');
    // button.textContent = 'О нас';
    //
    // headerItems.append(button);

    document.getElementById('headerFunc').innerHTML = '';

    const headerFunc = document.getElementById('headerFunc');

    button = document.createElement('button');
    button.setAttribute('id', 'record');
    button.setAttribute('class', 'header__item');
    button.textContent = 'Запись';

    headerFunc.append(button);

    button = document.createElement('button');
    button.setAttribute('id', 'logIn');
    button.setAttribute('class', 'header__item');
    button.textContent = 'Вход';

    headerFunc.append(button);

    document.getElementById('main').innerHTML = '';

    drawHomeContent(person);
}

function clearCurrentHeaderItem() {
    const headerItems = document.getElementById('headerItems').children;

    for (let i = 0; i < headerItems.length; i++) {
        headerItems[i].classList.remove('currentHeaderItem');
    }
}

function clearCurrentHeaderFunc() {
    const headerItems = document.getElementById('headerFunc').children;

    for (let i = 0; i < headerItems.length; i++) {
        headerItems[i].classList.remove('currentHeaderItem');
    }
}

function drawAboutContent() {
    document.getElementById('main').innerHTML = '';

    const main = document.getElementById('main');

    const mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'main__sections');

    const headerText = document.createElement('h1');
    headerText.setAttribute('class', 'service__title');
    headerText.textContent = 'О нас';

    mainDiv.append(headerText);

    const map = document.createElement('div');
    map.setAttribute('style', 'overflow:hidden;width: 800px;position: relative;');

    const iframe = document.createElement('iframe');
    iframe.setAttribute('width', '800');
    iframe.setAttribute('height', '440');
    iframe.setAttribute('src', 'https://maps.google.com/maps?width=800&amp;height=440&amp;hl=en&amp;q=%D0%94%D0%BD%D0%B5%D0%BF%D1%80%2C%20%D0%A3%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D0%B0+(%D0%9D%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)&amp;ie=UTF8&amp;t=&amp;z=16&amp;iwloc=B&amp;output=embed');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('marginheight', '0');
    iframe.setAttribute('marginwidth', '0');

    map.append(iframe);

    const div = document.createElement('div');
    div.setAttribute('style', 'position: absolute;width: 80%;bottom: 10px;left: 0;right: 0;margin-left: auto;margin-right: auto;color: #000;text-align: center;');

    const small = document.createElement('small');
    small.setAttribute('style', 'line-height: 1.8;font-size: 2px;background: #fff;');

    const a1 = document.createElement('a');
    a1.setAttribute('href', 'https://embedgooglemaps.com/en/');
    a1.textContent = 'https://embedgooglemaps.com/en/';

    const a2 = document.createElement('a');
    a2.setAttribute('href', 'https://iamsterdamcard.it');
    a2.textContent = 'iamsterdamcard.it';

    small.innerHTML = `Powered by ${a1}&${a2}`;

    div.append(small);

    map.append(div);

    const style = document.createElement('style');
    style.innerHTML = '#gmap_canvas img{max-width:none!important;background:none!important}';

    map.append(style);

    mainDiv.append(map);

    main.append(mainDiv);
    // <div style="overflow:hidden;width: 800px;position: relative;">
    //     <iframe width="800" height="440" src="" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
    //     <div style="">
    //         <small style="">Powered by
    //             <a href="https://embedgooglemaps.com/en/">https://embedgooglemaps.com/en/</a> &
    //             // <a href="https://iamsterdamcard.it">iamsterdamcard.it</a>
    // //      </small>
    // //  </div>
    // //  <style>#gmap_canvas img{max-width:none!important;background:none!important}</style>
    // </div><br />
}

function drawPersonalUserPage(person, records) {
    document.getElementById('main').innerHTML = '';

    const main = document.getElementById('main');

    const mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'main__sections');

    const headerText = document.createElement('h1');
    headerText.setAttribute('class', 'service__title');
    headerText.textContent = 'Личные данные';

    mainDiv.append(headerText);

    const divInfoPerson = document.createElement('div');
    divInfoPerson.setAttribute('class', 'divInfoPerson');

    const { _firstName, _lastName, _date, _email } = person;

    const arrayKeys = ['Имя', 'Фамилия', 'Дата рождения', 'Почта'];
    const arrayValues = [_firstName, _lastName, _date, _email];
    let dataItemDiv, item;

    for (let i = 0; i < arrayKeys.length; i++) {
        dataItemDiv = document.createElement('div');
        dataItemDiv.setAttribute('class', 'dataItemDiv');

        item = document.createElement('div');
        item.setAttribute('class', 'dataItemText');
        item.textContent = arrayKeys[i];

        dataItemDiv.append(item);

        item = document.createElement('div');
        item.setAttribute('class', 'dataItemText');
        item.textContent = arrayValues[i];

        dataItemDiv.append(item);

        divInfoPerson.append(dataItemDiv);
    }

    mainDiv.append(divInfoPerson);

    const recordsForFuture = document.createElement('div');
    recordsForFuture.setAttribute('class', 'recordsForFuture');

    let h2 = document.createElement('h2');
    h2.setAttribute('class', 'headerText2');
    h2.textContent = 'Мои записи';

    recordsForFuture.append(h2);

    let futureRecords = [], tempDay, tempMonth, tempYear, tempHour;

    for (let i = 0; i < records.length; i++) {
        tempDay = Number(records[i]._dateTime.slice(0, 2));
        tempMonth = Number(records[i]._dateTime.slice(3, 5));
        tempYear = Number(records[i]._dateTime.slice(6, 10));
        tempHour = Number(records[i]._dateTime.slice(11, 13));

        if (tempDay >= new Date().getDate() && tempMonth >= new Date().getMonth() && tempYear >= new Date().getFullYear() && tempHour >= (new Date().getHours() + 2 < 24 ? new Date().getHours() + 2 : (new Date().getHours() + 2) - 24)) {
            futureRecords.push(records[i]);
        }
    }

    if (futureRecords.length !== 0) {
        for (let i = 0; i < futureRecords.length; i++) {
            const section = document.createElement('section');
            section.setAttribute('class', 'section__record');

            let div = document.createElement('div');
            div.setAttribute('class', 'section__record_item');

            const {_firstName, _lastName, _email, _dateTime, _service, _barber} = futureRecords[i];
            const array = [i + 1, _firstName, _lastName, _email, _dateTime, _service, _barber];

            let item;

            for (let j = 0; j < array.length; j++) {
                item = document.createElement('div');

                if (j === 3 || j === 4 || j === 6) {
                    item.setAttribute('class', 'section__service_item-cell_email');
                } else {
                    item.setAttribute('class', 'section__service_item-cell_number');
                }

                item.textContent = array[j];

                div.append(item);
            }

            section.append(div);

            recordsForFuture.append(section);
        }
    } else {
        const empty = document.createElement('p');
        empty.setAttribute('class', 'text');
        empty.textContent = 'У вас нет записей на ближайшее время.';

        recordsForFuture.append(empty);
    }

    mainDiv.append(recordsForFuture);

    const recordsLast = document.createElement('div');
    recordsLast.setAttribute('class', 'recordsForFuture');

    h2 = document.createElement('h2');
    h2.setAttribute('class', 'headerText2');
    h2.textContent = 'История';

    recordsLast.append(h2);

    let lastRecords = [];

    for (let i = 0; i < records.length; i++) {
        tempDay = Number(records[i]._dateTime.slice(0, 2));
        tempMonth = Number(records[i]._dateTime.slice(3, 5));
        tempYear = Number(records[i]._dateTime.slice(6, 10));
        tempHour = Number(records[i]._dateTime.slice(11, 13));

        if (tempDay < new Date().getDate() && tempMonth < new Date().getMonth() && tempYear < new Date().getFullYear() && tempHour < (new Date().getHours() + 2 < 24 ? new Date().getHours() + 2 : (new Date().getHours() + 2) - 24)) {
            lastRecords.push(records[i]);
        }
    }

    if (lastRecords.length !== 0) {
        for (let i = 0; i < lastRecords.length; i++) {
            const section = document.createElement('section');
            section.setAttribute('class', 'section__record');

            let div = document.createElement('div');
            div.setAttribute('class', 'section__record_item');

            const {_firstName, _lastName, _email, _dateTime, _service, _barber} = lastRecords[i];
            const array = [i + 1, _firstName, _lastName, _email, _dateTime, _service, _barber];

            let item;

            for (let j = 0; j < array.length; j++) {
                item = document.createElement('div');

                if (j === 3 || j === 4 || j === 6) {
                    item.setAttribute('class', 'section__service_item-cell_email');
                } else {
                    item.setAttribute('class', 'section__service_item-cell_number');
                }

                item.textContent = array[j];

                div.append(item);
            }

            section.append(div);

            recordsLast.append(section);
        }
    } else {
        const empty = document.createElement('p');
        empty.setAttribute('class', 'text');
        empty.textContent = 'История отсутствует.';

        recordsLast.append(empty);
    }

    mainDiv.append(recordsLast);

    main.append(mainDiv);
}
