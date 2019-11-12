function View() {
    this._home = null;
    this._service = null;
    this._barbers = null;
    this._store = null;
    this._about = null;
    this._setOrder = null;
    this._logIn = null;
    this._submitLogIn = null;
    this._submitSignUp = null;
    this._submitOkSignUp = null;
    this._firstName = null;
    this._lastName = null;
    this._date = null;
    this._email = null;
    this._password = null;
    this._config = null;
    this._logOut = null;
    this._usersAdmin = null;
    this._record = null;
    this._setRecord = null;
    this._scrollDown = null;
    this._recording = null;
    this._goToServices = null;
    this._goToBarbers = null;
    this._goToStore = null;
    this._adminData = null;
    this._blackListUsers = null;
    this._orders = null;
    this._watchBarbers = null;
    this._addBarber = null;
    this._cancelAddBarber = null;
    this._configAddBarber = null;
    this._confirmDeleteBarber = null;
    this._cancelDeleteBarber = null;
    this._currentBarbersEmailForDelete = null;
    this._defaultBarber = null;
    this._configChangeSalaryBarber = null;
    this._cancelChangeSalaryBarber = null;
    this._currentSalaryBeforeChange = null;
    this._openBlockForParamsBarber = null;
    this._closeBlockForParamsBarber = null;
    this._toggleCurrentValue = false;
    this._getSortedBarbers = null;
    this._buttonResetBarbers = null;
    this._imagesObject = {
        imagesArray: [],
        counterStart: 0,
    };
    this._watchServices = null;
    this._addService = null;
    this.__configAddService = null;
    this._type = null;
    this._price = null;
    this._confirmDeleteService = null;
    this._currentServiceTypeforDelete = null;
    this._confirmDeleteService = null;
    this._cancelDeleteService = null;
    this._imagesServicesObject = {
        imagesArray: [],
        counterStart: 0,
    };
    this._defaultService = null;
    this._openBlockForParamsService = null;
    this._getSortedService = null;
    this._buttonResetService = null;
    this._buttonForSearchDate = null;
    this._sortedDate = null;
    this._sortedTime = null;
    this._watchStore = null;
    this._addStoreItem = null;
    this._configAddStoreItem = null;
    this._cancelAddStoreItem = null;
    this._imagesStoreObject = {
        imagesArray: [],
        counterStart: 0,
    };
    this._toggleCurrentValueStore = false;
    this._currentMark = null;

    this.getAllIdMenu = () => {
        this._home = document.getElementById('home');
        this._service = document.getElementById('services');
        this._barbers = document.getElementById('barbers');
        this._store = document.getElementById('store');
        // this._about = document.getElementById('about');
        this._logIn = document.getElementById('logIn');
        this._record = document.getElementById('record');
        this._scrollDown = document.getElementById('scroll');
        this._recording = document.getElementById('recording');
    };
}