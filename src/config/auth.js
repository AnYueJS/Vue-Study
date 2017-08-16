import setting from './token'

export default {
    login( t , s ){
        this.setCookie( setting.userToken , t , 3 );
        this.setCookie( setting.userSecret , s , 3 );
    },
    // authentication status
    authenticated(){
        let t = this.getCookie( setting.userToken );
        let s = this.getCookie( setting.userSecret );
        return t && t.length > 0 && s && s.length > 0;
    },
    getToken(){
        return this.getCookie( setting.userToken );
    },
    getSecret(){
        return this.getCookie( setting.userSecret );
    },
    logout(){
        this.clearCookie( setting.userToken );
        this.clearCookie( setting.userSecret );
    },

    //设置cookie
	setCookie(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + "; " + expires;
	},
	//获取cookie
	getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	    }
	    return "";
	},
	//清除cookie
	clearCookie(name) {
	    this.setCookie(name, "", -1);
	}


}
