Acme.registerPopUp = function(tokenName) 
{
	this.hasLocal	= typeof localStorage != "undefined" ? true : false;
	this.keyName 	= tokenName;
	this.date 		= new Date();
	this.token 		= {};
	var self 		= this;

	setTimeout(function() {
		self.run();
		self.events();
	}, 5000);
};

Acme.registerPopUp.prototype.run = function()
{
	this.token = this.getToken();

	if ( !this.token || this.isPopUpExpired() ) {
		this.refreshToken();
		this.setToken();
	}

	if ( this.token.registered || this.token.closed ) {
		return;
	}

	this.render();
};

Acme.registerPopUp.prototype.getDateString = function() 
{
	return [
		this.date.getFullYear(),
		this.date.getMonth() + 1, 
		this.date.getDate()
	].join('-');
};

Acme.registerPopUp.prototype.isPopUpExpired = function() 
{

	if (this.token.registered) {
		return false;
	}

	var sameDay = this.token.seen === this.getDateString();
	if (!sameDay) {
		return true;
	}

	return false;
};
Acme.registerPopUp.prototype.refreshToken = function() 
{
	this.token = {
		"seen" 			: this.getDateString(),
		"closed" 		: false,
		"registered" 	: false
	};
};

Acme.registerPopUp.prototype.updateToken = function(key, value) 
{
	this.token[key] = value;
	this.setToken();
};


Acme.registerPopUp.prototype.getToken = function() 
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
Acme.registerPopUp.prototype.setToken = function() 
{
	if ( this.hasLocal ) {
	    localStorage.setItem(this.keyName, JSON.stringify(this.token));
	} else {
	    // document.cookie = this.keyName + "=" + escape(value) +
	    // ((expiredays === null) ? "" : ";expires=" + exdate.toUTCString());
	}
};
Acme.registerPopUp.prototype.removeToken = function() 
{	
	if ( this.hasLocal ) {
	    return localStorage.removeItem(this.keyName);
	}
};


Acme.registerPopUp.prototype.render = function() 
{
	var html = Handlebars.compile(Acme.templates.registerPopup);

	$('body').append(html({path: _appJsConfig.templatePath}));
	$('#register-popup').animate({bottom: "0px"}, 500);
};

Acme.registerPopUp.prototype.close = function() 
{
	$('#register-popup').animate({bottom: "-150px"}, 500, function() {
		$('#register-popup').remove();
	});
};

Acme.registerPopUp.prototype.events = function() 
{
	var self = this;

	$('#register-popup').on('click', function(e) {
		var elem = $(e.target);
		if (elem.hasClass("register-popup__close") 		|| 
			elem.hasClass("register-popup__close-icon") ) {
			self.updateToken('closed', true);
			self.close();
		}
	});

	$('#mc-embedded-subscribe-form-popup').on('submit', function(e) {
		self.updateToken('registered', true);
		self.close();
	});

	$('#register-popup-subscriber').on('click', function(e) {
		self.updateToken('registered', true);
		self.close();
	});

};