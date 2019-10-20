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

    this.getAllIdMenu = () => {
        this._home = document.getElementById('home');
        this._service = document.getElementById('services');
        this._barbers = document.getElementById('barbers');
        // this._store = document.getElementById('store');
        // this._about = document.getElementById('about');
        // this._setOrder = null;
        this._logIn = document.getElementById('logIn');
    };
}