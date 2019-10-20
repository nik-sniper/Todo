export default {
    install(Vue, options) {
        Vue.prototype.$cookie = {
            get_cookie(name) {
                let nameCookie = this.cookieName + "-" + name + "=";
                let ca = document.cookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }if (c.indexOf(nameCookie) == 0) return c.substring(nameCookie.length, c.length);
                }
                return null;
            },
            set_cookie(name, value, minutes) {
                let nameCookie = this.cookieName + "-" + name;
                let path = arguments.length <= 2 || arguments[2] === undefined ? "/" : arguments[2];

                let expires = "";
                if (minutes) {
                    let date = new Date();
                    date.setTime(date.getTime() + minutes * 60 * 1000);
                    expires = "; expires=" + date.toGMTString();
                }
                document.cookie = nameCookie + "=" + JSON.stringify(value) + expires + "; path=" + path;
            },
            remove_cookie(name) {
                this.set_cookie(name, "", -100);
            },
            exists_cookie(name) {
                return typeof this.get_cookie(name) !== "undefined";
            }
        }
    }
}