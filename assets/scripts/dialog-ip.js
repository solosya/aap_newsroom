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
                    //MFAT
                    "14.128.4.201",
                    "14.128.5.201",
                    "14.128.6.198",
                    "14.128.7.198",
                    //Auck CC
                    "202.14.82.0",
                    "202.36.248.0",
                    "202.36.252.0",
                    "202.37.64.0",
                    "203.167.221.164",
                    "203.97.83.133",
                    // Tainui Group Holdings Limited
                    "103.232.108.234",

                    //fonterra
                    "202.50.184.0",
                    "202.50.186.0",
                    "202.175.128.101",
                    "202.175.128.62",
                    "202.171.128.64",
                    "185.46.212.0",
                    "165.225.88.0",
                    "165.225.64.0",
                    "165.225.72.0",
                    "165.225.80.0",
                    "89.167.129.0",
                    "165.225.86.0",
                    "165.225.66.0",
                    "213.52.102.0",
                    "165.225.76.0",
                    "165.225.68.0",
                    "94.188.139.64",
                    "165.225.84.0",
                    "185.46.214.0",
                    "124.248.141.0",
                    "211.144.19.0",
                    "165.225.104.0",
                    "165.225.96.0",
                    "165.225.116.0",
                    "165.225.98.0",
                    "165.225.106.0",
                    "1.234.57.0",
                    "58.220.95.0",
                    "165.225.112.0",
                    "175.45.116.0",
                    "165.225.114.0",
                    "165.225.102.0",
                    "221.122.91.0",
                    "165.225.100.0",
                    "165.225.110.0",
                    "196.23.154.96",
                    "196.23.147.96",
                    "197.98.201.0",
                    "197.156.245.192",
                    "64.215.22.0",
                    // Bell Gully Auckland full list.
                    "203.97.14.1-203.97.14.15",
                    // Wellington (+ CHCH) 
                    "210.54.7.194",
                    // Auckland 
                    "210.55.180.235",
                    // Business NZ
                    "210.54.89.198",
                    // NZ Super Fund
                    "222.152.49.189",
                    "116.50.62.180",
                    // APC
                    "202.8.13.71",
                    //AAP:
                    "203.4.189.121",
                    //jasper
                    "118.209.72.58",
                    //lee 
                    "199.116.118.249",

                ];

                var userAccount = false;
                var userIPInt = dot2num(json.ip);

                for (var i = 0 ; i < IPAdresses.length ; i++) {
                    // if (IPAdresses[i].indexOf('//') === 0 ) {
                    //     continue;
                    // }
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
