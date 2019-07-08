/***                      ****
  Dialog Confirmation Box
***                       ****/

Acme.IPCheck = function() {

    function dot2num(dot) {
        var d = dot.split(".");
        return ((((((
               +d[0])   * 256 )
             +(+d[1]))  * 256 )
             +(+d[2]))  * 256 )
             +(+d[3]
        );
    }

    $(function() {

        Acme.IPToken = new Acme.Token("IP_ACCOUNT");
        var token = Acme.IPToken.getToken();
        var IPAdresses = [];
        if (!token) {

            Acme.server.fetch(_appJsConfig.appHostName + '/api/theme/get-config').done(function(r) {

                if (r.success === 1) {
                    IPAdresses = r.data.IPAdresses;
                    
                    $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
                    function(json) {
        
                        var userAccount = false;
                        var userIPInt = dot2num(json.ip);
                        console.log(userIPInt);
                        for (var i = 0 ; i < IPAdresses.length ; i++) {
                            if (IPAdresses[i].indexOf('//') === 0 ) {
                                continue;
                            }
        
                            var range = IPAdresses[i].split("-");
                            
                            // All IP addresses are converted to a range, however
                            // we can start by just listing one.  The second ip
                            // in the range will be added automtically
                            if (range.length < 2) {
        
                                // check for a wildcard character and replace with a zero
                                // for the first item in the range, and 255 for the second item in the range
                                if (range[0].indexOf("*") > -1) {
                                    var ip1 = range[0];
                                    range[0] = dot2num( ip1.replace(/\*/g, "0") );
                                    range.push( dot2num( ip1.replace(/\*/g, "255") ) );
                                } else {
                                    range[0] = dot2num ( range[0] );
                                    range.push( range[0] );
                                }
        
                            // if both ip addresses are specified no need to check for wildcard
                            } else {
                                range[0] = dot2num ( range[0] );
                                range[1] = dot2num ( range[1] );
                            }
        
                            if (userIPInt >= range[0] && userIPInt <= range[1]) {
                                userAccount = true;
                                break;
                            }
                        }
        
                        if ( userAccount ) {
                            Acme.IPNoticePopup = new Acme.IPNotice("modal", "ipdialog", {"main": "ipnotice"});
                            Acme.IPNoticePopup.render("main", "Did you know your employer is a subscriber to Newsroom Pro?");
                        }
                    });


                } else {
                    return;
                }
            }).fail(function(r) { console.log(r);return;});




        }
    });
}


Acme.IPNotice = function(template, parent, layouts) {

    this.template = template;
    this.parentCont = parent;
    this.layouts = layouts;
    this.parent = Acme.modal.prototype;
    this.data = {};
};
    Acme.IPNotice.prototype = new Acme.modal();
    Acme.IPNotice.constructor = Acme.IPNotice;
    Acme.IPNotice.prototype.errorMsg = function(msg) {
        $('.message').toggleClass('hide');
    };
    Acme.IPNotice.prototype.handle = function(e) {
        var self = this;
        this.parent.handle.call(this, e);
        var $elem = $(e.target);

        if ( $elem.is('a') || $elem.parent().is('a') ) {
            self.closeWindow();
            Acme.IPToken.setToken('true');
        }
        if ($elem.is('button')) {
            if ($elem.data('role') === 'close') {
                self.closeWindow();
            }
            Acme.IPToken.setToken('true');
        }
    };
