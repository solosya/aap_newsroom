Acme.Token = function(tokenName) 
{
	this.hasLocal	= typeof localStorage != "undefined" ? true : false;
	this.keyName 	= tokenName;
	this.token 		= {};
	var self 		= this;

};

Acme.Token.prototype.getToken = function() 
{
	if ( this.hasLocal ) {
	    this.token = localStorage.getItem(this.keyName);
	    return this.token && JSON.parse(this.token);

	} 
};
Acme.Token.prototype.setToken = function(value) 
{
	if ( this.hasLocal ) {
	    localStorage.setItem(this.keyName, value);
	}
};
Acme.Token.prototype.removeToken = function() 
{	
	if ( this.hasLocal ) {
	    return localStorage.removeItem(this.keyName);
	}
};