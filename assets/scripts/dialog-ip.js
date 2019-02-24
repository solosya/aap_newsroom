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

        if (!token) {
            console.log('got-token');
            $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
            function(json) {

                // can accept '*' and range like:
                // "203.4.*.*" or "203.4.189.*"
                // "202.22.30.101-202.22.30.240" 
                var IPAdresses = [
                    "202.22.30.101",
                    "203.97.232.81",
                    "202.22.18.245",
                    "202.22.18.242",
                    "203.97.41.137",
                    "202.55.102.220",
                    "103.23.18.91",
                    //Ministry of Education:
                    "202.037.032.*",
                    "202.037.036.*",
                    //NZQA:
                    "163.7.134.132",
                    "202.020.005.166",
                    //TEC:
                    "203.217.142.241",
                    "203.217.142.242",
                    //ERO:
                    "131.203.224.86",
                    //PWC:
                    "203.97.65.97",
                    "203.97.65.100",
                    //Treasury and DPMC IP addresses below - 
                    "202.36.172.0-202.36.172.255",
                    "202.36.173.0-202.36.173.255",
                    "202.36.47.0-202.36.47.255",
                    //MBIE - 
                    "116.89.224.153",
                    "203.144.40.153",
                    //AAP:
                    "203.4.189.121",
                ];

                var userAccount = false;
                var userIPInt = dot2num(json.ip);

                for (var i = 0 ; i < IPAdresses.length ; i++) {
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
