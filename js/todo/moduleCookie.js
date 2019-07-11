let moduleCookie = (function () {

    class Cookie {

        constructor(options) {
            this.cookieName = options.name;
        }

        get_cookie()
        {
            let results = document.cookie.match ( '(^|;) ?' + this.cookieName + '=([^;]*)(;|$)' );

            if ( results )
                return ( unescape ( results[2] ) );
            else
                return null;
        }

        set_cookie (value, exp_y, exp_m, exp_d, path, domain, secure )
        {
            let cookie_string = this.cookieName + "=" + escape ( JSON.stringify(value) );

            if ( exp_y )
            {
                let expires = new Date ( exp_y, exp_m, exp_d );
                cookie_string += "; expires=" + expires.toGMTString();
            }

            if ( path )
                cookie_string += "; path=" + escape ( path );

            if ( domain )
                cookie_string += "; domain=" + escape ( domain );

            if ( secure )
                cookie_string += "; secure";

            document.cookie = cookie_string;
        }


        delete_cookie( cookie_name )
        {
            let cookie_date = new Date ( );  // Текущая дата и время
            cookie_date.setTime ( cookie_date.getTime() - 1 );
            document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
        }
    }

    return Cookie;
}());