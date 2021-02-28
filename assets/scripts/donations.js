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
    this.guest = params.guest || true;
    this.active = {};
    this.selected = {};
    this.products = [];
    this.stripe_key = params.stripe_key;
    this.Stripe = Stripe;
    this.priceRequests = [];
    this.pages = [];
    this.user = {};
    this.emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (this.guest !== "1") {
        this.fetchUser().done(function(r) {
            if (r.success === 1)
                this.user = r.self;
        });
    }
    this.modal = new Acme.DonateModal('modal', 'donate-modal', {
        "donate"    : 'donations',
        "spinner"   : 'spinnerTmpl',
        "register"  : 'registerTmpl',
        "signin"    : 'donateSignupForm',
        "register"  : 'registerTmpl',
        "forgot"    : 'forgotFormTmpl',
    }, this.handler );

    this.events();
};

Acme.Donations.prototype.load = function(force) {
    var self = this;
    console.log(Object.keys(self.pricing).length);
    console.log(self.pricing.constructor !== Object);
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
        console.log(this.products);
        if (typeof this.products[i].metadata.active !== 'undefined' && this.products[i].metadata.active !== "true") {
            continue;
        }
        this.products[i].prices = [];
        console.log('fetching prices');
        this.priceRequests.push( this.fetchPrice(this.products[i]) );
    }
    console.log(this.priceRequests);
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
    this.pages.push(layout);
    if (layout === "signin") {
        data = {"class-prefix": "donate-"}
    }
    console.log(layout);
    this.modal.renderLayout(layout, data);
    this.layoutEvents();
    console.log('run evetns');

}


Acme.Donations.prototype.renderBack = function() {
    console.log('rendering back');
    this.pages.pop();
    var data = {};
    var layout = this.pages[this.pages.length - 1];
    console.log(layout);

    if (layout === "donate") {
        this.renderPrices();
        return;
    }

    this.modal.renderLayout(layout, data);
}


Acme.Donations.prototype.layoutEvents = function() {
    var self = this;
    var amountInput = document.querySelector('.j-donate-input');
    var usernameInput = document.querySelector('.j-register-username');
    var passwordInput = document.querySelector('.j-signin-password');

    if (usernameInput) {
        var spinner = document.getElementById("email_spinner");
        var password = document.getElementById('loginPass');
        var shareText = document.querySelector('.j-email-text');
        var proceed = document.getElementById('modal-signinBtn');
        var hide = 'u-display-none';

        usernameInput.focus();
        usernameInput.oninput = function(e) {
            var email = e.target.value
            self.user['username'] = email;
            proceed.classList.add(hide);

            if (this.emailTimeout) {
                clearTimeout(this.emailTimeout);
            }

            if (self.emailRegex.test(email)) {
                this.emailTimeout = setTimeout( function() {
                    spinner.classList.remove(hide);
                    self.checkEmail(e.target.value).done(function(r) {
                        console.log(r);

                        // USER IS A GUEST
                        if (r.exists === false) {
                            shareText.innerText = "It looks like you don't have an account with us. Would you like to contine with this email address?";
                            spinner.classList.add(hide);
                            proceed.classList.remove(hide);


                        // USER EXISTS
                        } else if (r.exists === true) {
                            spinner.classList.add(hide);
                            shareText.innerText = "It looks like you have an account with us! Please enter your password to continue.";
                            password.classList.remove(hide);
                            password.focus();
                            proceed.innerText = "Sign in";
                            proceed.classList.remove(hide);

                        }

                    });
                }, 1000);

            } else {
                spinner.classList.add('u-display-none');
                // shareText.classList.remove('u-display-none');
                password.classList.add('u-display-none');
                proceed.classList.add('u-display-none');

            }
        
        };

        usernameInput.onChange = function() {
            // console.log('onChange');
            // console.log(e.target.value);
        }
    }
    if (passwordInput) {
        passwordInput.oninput = function(e) {
            self.user.password = e.target.value;
        };
    }

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



}
Acme.Donations.prototype.handler = function(e) {
    console.log(e);
    console.log('handling from donations');
    var self = this;
    e.preventDefault();
    console.log(self);
    if (typeof e.target.dataset.elem ==- "undefined") {
        return;
    }

    var elem = e.target.dataset.elem;
    var layout = e.target.dataset.layout;
    var behaviour = e.target.dataset.behaviour;

    if (behaviour === "back") {
        self.renderBack();
        return;
    }

    if (layout) {
        self.renderLayout(layout);
        return;
    }

    if (elem === "signin") {
        self.signin(e.target);
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
        console.log('calling checkout from handler');
        this.checkout();
    }



};

Acme.Donations.prototype.checkout = function() {
    var self = this;
    console.log('going to purchase');
    console.log(self);
    if (typeof self.selected.product_id === "undefined") {
        return;
    }

    if (self.guest === "1" && !self.user.username) {
        console.log(self);
        console.log('redirecing to email page');
        self.renderLayout("signin");
        return;
    }

    console.log('purchasing for realze');

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

    console.log(data);
    // return;
    Acme.server.create('/api/paywall/checkout-session', data).done( function(r) {
        console.log(r);
        self.Stripe.redirectToCheckout({
            sessionId: r.sessionId
        }).then(function(r) {
                console.log(r);
        });
    });
    return;
}

Acme.Donations.prototype.signin = function(elem) {
    var self = this;
    elem.innerText = "";


    var password = document.getElementById('loginPass');
    password.classList.add("u-display-none");

    var shareText = document.querySelector('.j-email-text');
    shareText.innerText = "";

    elem.classList.add("spinner");


    var loginData = {};
    var action = 'register';

    if (self.user.username && self.user.password) {
        action = 'signin';
    }
    console.log(action);

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
                elem.classList.remove("spinner");
                // self.errorMsg();
            }
        }).fail(function(r) { 
            // $elem.text("Sign in")
            //     .removeClass('spinner');
            // self.errorMsg();
            console.log(r);
        });
    }

    if (action === 'register') {
        self.checkout();
        // self.register();
    }

}
// data['username'] = Math.floor(100000000 + Math.random() * 9000000000000000);

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

    $('#donations').on('click', function(e) {
        self.pages.push("spinner");
        self.modal.render("spinner");
        console.log('loaded spinner');
        self.load();
    });
   
}







