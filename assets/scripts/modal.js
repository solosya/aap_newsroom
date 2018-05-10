(function ($) {


Acme.videoPopup = function(template, parent, layouts, data) {
    this.template = template;
    this.parentCont = parent;
    this.layouts = layouts;
    this.data = data || {};
    this.parent = Acme.modal.prototype;

	this.hasLocal	= typeof localStorage != "undefined" ? true : false;
	this.keyName 	= "videoCampaign";
	this.date 		= new Date();
	this.token 		= {};


    this.run();
};
Acme.videoPopup.prototype = new Acme.modal();
Acme.videoPopup.constructor = Acme.videoPopup;
Acme.videoPopup.prototype.errorMsg = function(msg) {
    $('.message').removeClass('hide');
};
Acme.videoPopup.prototype.rendered = function(msg) {
    setTimeout(function() {
        $('.acme-modal__close').removeClass('u-invisible');
    }, 5000);

};
Acme.videoPopup.prototype.handle = function(e) {
    var self = this;
    var $elem = this.parent.handle.call(this, e);

    if ($elem.data('behaviour') == 'close') {
        e.preventDefault();
        self.updateToken('closed', true);
    }
};


Acme.videoPopup.prototype.run = function()
{
	this.token = this.getToken();

	if ( !this.token || this.isExpired() ) {
		this.refreshToken();
		this.setToken();
	}

	if ( this.token.registered || this.token.closed ) {
		return;
	}
    this.render("video", "", this.data);

};

Acme.videoPopup.prototype.getDateString = function() 
{
	return [
		this.date.getFullYear(),
		this.date.getMonth() + 1, 
		this.date.getDate()
	].join('-');
};

Acme.videoPopup.prototype.isExpired = function() 
{
	var sameDay = this.token.seen === this.getDateString();
	if (!sameDay) {
		return true;
	}

	return false;
};
Acme.videoPopup.prototype.refreshToken = function() 
{
	this.token = {
		"seen" 			: this.getDateString(),
		"closed" 		: false,
		"registered" 	: false
	};
};

Acme.videoPopup.prototype.updateToken = function(key, value) 
{
	this.token[key] = value;
	this.setToken();
};


Acme.videoPopup.prototype.getToken = function() 
{
	if ( this.hasLocal ) {
	    this.token = localStorage.getItem(this.keyName);
	    return this.token && JSON.parse(this.token);

	} else {
	    // var c_start = document.cookie.indexOf(this.keyName + "=");
	    // if ( document.cookie.length > 0 ) {
	    //     if (c_start !== -1) {
	    //         return getCookieSubstring(c_start, this.keyName);
	    //     }
	    // }
	    return null;
	}
};
Acme.videoPopup.prototype.setToken = function() 
{
	if ( this.hasLocal ) {
	    localStorage.setItem(this.keyName, JSON.stringify(this.token));
	} else {
	    // document.cookie = this.keyName + "=" + escape(value) +
	    // ((expiredays === null) ? "" : ";expires=" + exdate.toUTCString());
	}
};
Acme.videoPopup.prototype.removeToken = function() 
{	
	if ( this.hasLocal ) {
	    return localStorage.removeItem(this.keyName);
	}
};



}(jQuery));