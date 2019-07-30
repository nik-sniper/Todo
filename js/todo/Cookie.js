class Cookie {
    constructor(options) {
        this.cookieName = options.name;
        this.cookieValue = "";
    }

    get_cookie() {
        let name = this.cookieName + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return null;
    }

    set_cookie(minutes) {
        let path = arguments.length <= 3 || arguments[3] === undefined ? "/" : arguments[3];

        let expires = "";
        if (minutes) {
            let date = new Date();
            date.setTime(date.getTime() + minutes * 60 * 1000);
            expires = "; expires=" + date.toGMTString();
        }
        document.cookie = this.cookieName + "=" + JSON.stringify(this.cookieValue) + expires + "; path=" + path;
    }

    remove_cookie(name) {
        this.set_cookie(name, "", -100);
    }

    exists_cookie(name) {
        return typeof this.get_cookie(name) !== "undefined";
    }
}