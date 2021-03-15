Acme.DonateModal = function(template, parent, layouts, handler) {
    this.template = template;
    this.parentCont = parent;
    this.layouts = layouts;
    this.parent = Acme.modal.prototype;
    this.handler = handler;
};
Acme.DonateModal.prototype = new Acme.modal();
Acme.DonateModal.constructor = Acme.DonateModal;
Acme.DonateModal.prototype.errorMsg = function(msg) {
    $('.message').removeClass('u-hide');
};
Acme.modal.prototype.events = function() 
{
    var self = this;
    $('#'+this.parentCont).on("click", function(e) {
        // console.log(self.handler);
        self.handle(e);
    });
};

Acme.DonateModal.prototype.handle = function(e) {
    var $elem = this.parent.handle.call(this, e);
    this.handler.call(Acme.donations, e);
};











console.log('loading donations code');
Acme.Donations = function(Stripe, params) {
    this.pricing = {};
    this.container = document.getElementById(params.container);
    this.active = {};
    this.selected = {};
    this.products = [];
    this.stripe_key = params.stripe_key;
    this.Stripe = Stripe;
    this.priceRequests = [];
    this.pages = [];
    this.guest = params.guest || true;
    this.validEmail = null;
    this.user = {};
    this.emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    self.next = "email-check";

    if (this.guest !== "1") {
        this.fetchUser().done(function(r) {
            if (r.success === 1)
                this.user = r.self;
        });
    }
    this.modal = new Acme.DonateModal('donate_modal', 'donate-modal', {
        "donate"        : 'donations',
        "spinner"       : 'spinnerTmpl',
        "register"      : 'registerTmpl',
        "signin"        : 'donateSignupForm',
        "register"      : 'registerTmpl',
        "reset-success" : 'donateResetPassword',
    }, this.handler );

    this.events();
};

Acme.Donations.prototype.load = function(force) {
    var self = this;

    if (Object.keys(self.pricing).length > 0) {
        self.renderPrices();
        return;
    }

    self.pricing = {};
    console.log('loading...');
    // self.renderLayout('donate', {});
    // return;
    this.fetchProducts().done( function(r) {

        for (let i = 0; i < r.data.length; i++) {
            if (r.data[i].active) {
                self.products.push(r.data[i]);
            }
        }

        self.fetchPrices().done(function(r) {
            // console.log(r);
            var args = Array.prototype.slice.call(arguments);
            if (args[1] === 'success') {
                args = [args];
            }
            args.forEach(function(priceData) {
                var data = priceData[0].data;
                var productId  = priceData[2].productId;       
    
                var correctProduct = self.products.filter(function(p) {
                    return p.id == productId;
                })[0]; 
                
                correctProduct['prices'] = data;
            });
            self.parsePrices();
            self.renderPrices();
        });
    });
}

Acme.Donations.prototype.fetchProducts = function()
{   
    return Acme.server.fetch('/api/paywall/stripe-products', {});
};

Acme.Donations.prototype.fetchPrices = function() {
    var self = this;

    for (var i=0; i<this.products.length; i++) {
        if (typeof this.products[i].metadata.active !== 'undefined' && this.products[i].metadata.active !== "true") {
            continue;
        }
        this.products[i].prices = [];
        this.priceRequests.push( this.fetchPrice(this.products[i]) );
    }
    return $.when.apply(undefined, this.priceRequests);
}


Acme.Donations.prototype.fetchPrice = function(product)
{ 
    var req = Acme.server.fetch('/api/paywall/stripe-product-prices', {
        "product" : product.id
    });

    req.productId = product.id;

    return req;
};


Acme.Donations.prototype.parsePrices = function(r) {

    for (product in this.products) {
        product = this.products[product];
        
        if (typeof product.metadata.active === 'undefined' || product.metadata.active !== 'true') {
            continue;
        }

         
        var order = ["month", "year", "one_time"];
        if (typeof product.metadata.order !== 'undefined') {
            order = product.metadata.order.split(',');
        }

        this.active[product.id] = order[0];

        this.pricing[product.id] = {
            id: product.id,
            name: product.name,
            description: product.description,
            prices: [], 
            intervals: []
        }
        var pricesByInterval = {};
        for (price in product.prices) {
            var price = product.prices[price];
    
            var interval = null;
            if (price.type === "one_time") {
                interval = price.type;
            } else {
                interval = price.recurring.interval;
            }
            
            this.selected.interval = interval;

            if (typeof pricesByInterval[interval] === 'undefined') {
                pricesByInterval[interval] = [];
            }
            // this.pricing[product.id].intervals.push(interval);
            pricesByInterval[interval].push({
                "unit_amount": price.unit_amount,
                "price" : price.unit_amount / 100,
                "id" : price.id,
                "product": price.product,
                "currency" : price.currency
            });
        }

        for (var i = 0; i < order.length; i++) {
            if (typeof pricesByInterval[order[i]] === 'undefined') {
                continue;
            }
            this.pricing[product.id].prices.push({
                [order[i]] : pricesByInterval[order[i]]
            });
        }

    }
    console.log(this.pricing);
}

Acme.Donations.prototype.renderPrices = function(r) {
    for (pricing in this.pricing) {
        data = this.pricing[pricing];
        data.active = this.active[data.id];
        data.selected = this.selected;
        this.renderLayout("donate", data);
    }
}


Acme.Donations.prototype.renderLayout = function(layout, data) {
    console.log('rendering layout');
    if (typeof data === "undefined" || !data || Object.keys(data).length < 1) {
        data= {};
    }

    this.pages.push(layout);
    // if (layout === "signin") {
    data["class-prefix"] = "donate-";
    data["logo"] = _appJsConfig.templatePath + "/static/images/newsroom-logo.svg";
    data['user'] = this.user;
    data['guest'] = this.guest;
    data['validEmail'] = this.validEmail;

    // }
    this.modal.renderLayout(layout, data);
    this.layoutEvents();
}


Acme.Donations.prototype.renderBack = function() {
    this.pages.pop();
    var data = {};
    var layout = this.pages[this.pages.length - 1];
    console.log("rendering layout");
    console.log(layout);

    if (layout === "donate") {
        this.renderPrices();
        return;
    }

    this.modal.renderLayout(layout, data);
}


Acme.Donations.prototype.layoutEvents = function() {
    var self = this;
    console.log(self);
    // self.next = "email-check";

    var componentPrefix = "donate-login-form";
    var amountInput = document.querySelector('.j-donate-input');
    var usernameInput = document.querySelector('.j-register-username');
    var passwordInput = document.querySelector('.j-signin-password');
    var hide = 'u-display-none';
    var spinner = document.getElementById("email_spinner");
    var retryButton = document.querySelector('.j-retry');
    var proceed = document.querySelector('.j-continue');


    if (amountInput) {
        amountInput.oninput = function(e) {
            var product = e.target.dataset.product;
            if (e.target.value.length > 0) {
                delete self.selected.price_id;
                self.selected.amount = e.target.value;
                self.selected.product_id = product;
                self.selected.currency = 'aud';
            } else {
                delete self.selected.amount;
            }
        };
    }



    if (passwordInput) {
        passwordInput.oninput = function(e) {
            self.user.password = e.target.value;
        };
    }




    if (usernameInput) {
        usernameInput.focus();
        usernameInput.oninput = function(e) {
            var email = e.target.value
            self.user['username'] = email;

            if ( email != "" ) {
                e.target.classList.add("shrink");
            } else {
                e.target.classList.remove("shrink");
            }
            if (self.emailRegex.test(email)) {
                proceed.classList.add(componentPrefix + '__button--active')
            } else {
                proceed.classList.remove(componentPrefix + '__button--active');
            }
        };
    }




    if (proceed) {
        proceed.addEventListener('click', function(e) {
            console.log(self.next);
            e.target.innerText = "";
            spinner.classList.remove(hide);

            
            if (typeof self.next === "undefined" || self.next === null) {
    
                self.checkEmail(self.user.username).done(function(r) {
                    console.log(r);
                    self.validEmail = null;
    
                    // USER IS A GUEST
                    if (r.exists === false) {
                        self.validEmail = false;
                        self.next = "signin";
        
                    // USER EXISTS
                    } else if (r.exists === true) {
                        self.validEmail = true;
                        self.next = "signin";
                    }
                    self.renderLayout('signin');
                });
            }
    
    
            if (self.next === 'signin') {
                self.signin(e.target);
            }

        });


        if (retryButton) {
            retryButton.addEventListener('click', function(e) {
                e.target.classList.add(hide);
                self.user.username = "";
                self.next = null;
                self.validEmail = null;
                self.renderLayout('signin');
            });
        }



    }


}
Acme.Donations.prototype.handler = function(e) {
    // console.log(e);
    var self = this;
    e.preventDefault();
    if (typeof e.target.dataset.elem === "undefined") {
        return;
    }

    var elem = e.target.dataset.elem;
    var layout = e.target.dataset.layout;
    var behaviour = e.target.dataset.behaviour;

    if (behaviour === "forgot") {
        var text = document.querySelector('.j-email-text');
        text.classList.remove('highlight');

        if (!self.user.username) {
            text.classList.add('highlight');
            return false;
        }
    
        self.forgot().done(function(r) {
            console.log(r);
            if (r.success === 1) {
                text.innerHTML = "<strong>A password reset link has been sent to your email.</strong> <br />After reset, enter your new password to continue.";
            } else {
                return {
                    "success": r.success,
                    "error": r.error.email
                };
            }
    
        }).fail(function(r) { console.log(r);});
        return;
    }

    if (layout) {
        console.log(layout);
        self.renderLayout(layout);
        return;
    }


    if (elem === "signin") {
        self.signin(e.target);
        return;
    }

    if (elem === "period") {
        var period = e.target.dataset.period;
        var product = e.target.dataset.product;
        self.selected.interval = period;
        self.active[product] = period;
        self.renderPrices();
        return;
    }

    if (elem === "price") {
        self.selected['price_id'] = e.target.dataset.price_id;
        self.selected['product_id'] = e.target.dataset.product;
        delete self.selected.price;
        self.renderPrices();
        return;
    }


    if (elem === "checkout") {
        if ( self.guest === "1" ) {
            self.renderLayout("signin");
            return;
        }
    
        this.checkout();
        return;
    }
    console.log("reached the bottom of handler");


};

Acme.Donations.prototype.checkout = function() {
    var self = this;

    if (typeof self.selected.product_id === "undefined") {
        return;
    }


    var data = {
        product_id : self.selected.product_id
    };
    if (typeof self.selected.price_id !== 'undefined') {
        data['price_id'] = self.selected.price_id;
    }
    if (typeof self.selected.amount !== 'undefined') {
        data['amount'] = self.selected.amount * 100;
    }

    if (typeof self.selected.interval !== 'undefined') {
        data['interval'] = self.selected.interval;
    }

    if (typeof self.selected.interval !== 'undefined') {
        data['currency'] = self.selected.currency;
    }

    if (typeof self.user.username !== 'undefined') {
        data['email'] = self.user.username;
    }
    if (typeof self.user.email !== 'undefined') {
        data['email'] = self.user.email;
    }

    data['success'] = _appJsConfig.appHostName + "/donation-thanks";
    data['cancel'] = _appJsConfig.appHostName;



    Acme.server.create('/api/paywall/checkout-session', data).done( function(r) {
        console.log(r);
        self.Stripe.redirectToCheckout({
            sessionId: r.sessionId
        }).then(function(r) {
                console.log(r);
        });
    });
}

Acme.Donations.prototype.signin = function(elem) {
    console.log('IN THE SIGNIN');
    var self = this;
    elem.innerText = "";

    var password = document.getElementById('loginPass');
    var errorText = document.querySelector('.j-error-text');
    var spinner = document.getElementById('email_spinner');
    var textElem = document.querySelector('.j-email-text');
    
    var text = "<strong>It looks like you have an account with us!</strong> <br />Please enter your password to continue.";
    textElem.innerText = "";
    
    spinner.classList.remove("u-display-none");
    errorText.classList.add("u-display-none");
    errorText.innerHTML = "";

    var loginData = {};
    var action = 'register';

    if (self.user.username && self.user.password) {
        action = 'signin';
    }

    if (action === 'signin') {
        loginData['username'] = self.user.username;
        loginData['password'] = self.user.password;
        loginData['rememberMe'] = 1;
        Acme.server.create('/api/auth/login', loginData).done(function(r) {
            console.log(r);
    
            if (r.success === 1) {
                self.fetchUser().done(function(r) {
                    if (r.success === 1) {
                        self.user = r.self;
                        self.guest = "0";
                    }
                    console.log(r);
                    self.checkout();
                });
        
            } else {

                elem.innerText = "Sign in";
                password.classList.remove("u-display-none");
                textElem.innerHTML = text;
                spinner.classList.add("u-display-none");
                errorText.innerHTML = r.error.password.join("<br />");
                errorText.classList.remove("u-display-none");
            }
        
        }).fail(function(r) { 
            elem.innerText = "Sign in";
            password.classList.remove("u-display-none");
            textElem.innerHTML = text;
            spinner.classList.add("u-display-none");
            errorText.innerHTML = r.error.password.join("<br />");
            errorText.classList.remove("u-display-none");
        });
    }

    if (action === 'register') {
        self.checkout();
        // self.register();
    }

}

Acme.Donations.prototype.forgot = function() {
    var self = this;
    return Acme.server.create('/api/auth/forgot-password', {"email": self.user.username});

}

Acme.Donations.prototype.register = function() {
    console.log('registering user');
    console.log(this);
    var self = this;
    var password = this.random(20);
    loginData = {
        'email' : this.user.username,
        'firstname' : "Anon",
        'lastname' : "Donor",
        'password' : password,
        'username' : this.random(10),
        'verifypassword': password,
        'captcha': "yes"
    };
    
    Acme.server.create('/api/auth/signup', loginData).done(function(r) {
        console.log(r);

        if (r.success === 1) {
            self.fetchUser().done(function(r) {
                if (r.success === 1) {
                    self.user = r.self;
                    self.guest = "0";
                }
                console.log(r);
                self.checkout();
            });
        }
});


}



Acme.Donations.prototype.random = function(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};



Acme.Donations.prototype.checkEmail = function(email) {
    return Acme.server.fetch('/api/user/check-email', {email:email});
}


Acme.Donations.prototype.fetchUser = function() {
    return Acme.server.fetch('/api/user/self');
}
Acme.Donations.prototype.events = function() {
    var self = this;
    self.pages.push("spinner");
    self.modal.render("spinner");

    self.load();

    $('#donations, .j-donation').on('click', function(e) {
        self.pages.push("spinner");
        self.modal.render("spinner");
        self.load();
    });
   
}







