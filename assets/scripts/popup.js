
Acme.registerPopUp = function() {
	console.log('this.rendering');
	this.render();
};

Acme.registerPopUp.prototype.render = function() {
	console.log('rendering the popup');
};