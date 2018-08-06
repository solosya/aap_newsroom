// Create a Stripe client
if ($('#stripekey').length > 0) {


    var stripekey = $('#stripekey').html();


    var modal = new Acme.Signin('spinner', 'spinner-modal', {"spinner": 'spinnerTmpl'});

    var stripe = Stripe(stripekey);

    // Create an instance of Elements
    var elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
        base: {
            color: '#32325d',
            lineHeight: '24px',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    };

    // Create an instance of the card Element
    var card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card-element` <div>
    var cardElement = document.getElementById('card-element');
    if (cardElement != null) {
        card.mount('#card-element');
    }

    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function(event) {
        var displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    }); 

    // Handle form submission

    var SubscribeForm = function() {
        this.data = {

        };

        this.errorFields = [];

        this.validateRules = {
            "verifypassword"    : ["notEmpty"],
            "firstname"         : ["notEmpty"], 
            "lastname"          : ["notEmpty"], 
            "username"          : [], 
            "password"          : ["notEmpty"],
            "email"             : ["notEmpty"],
            "trial"             : [],
            "terms"             : ["isTrue"],
        };

        this.validateFields = Object.keys(this.validateRules);

        this.events();

        // this.data['trial'] = $('#trial').is(":checked");
        var trial = $('#trial').val();
        if (trial == 1) {
            this.data['trial'] = 'true';
        }

    };

    SubscribeForm.prototype = new Acme.Form(Acme.Validators);
    SubscribeForm.constructor = SubscribeForm;
    SubscribeForm.prototype.render = function(checkTerms) 
    {
        this.clearInlineErrors();
        this.addInlineErrors();
        if (checkTerms) {
            if (!this.data.terms) {

                this.confirmView = new Acme.Confirm('modal', 'signin-modal', {'terms': 'subscribeTerms'});
                this.confirmView.render("terms", "Terms of use");
            }
        }
    };


    SubscribeForm.prototype.submit = function(event) 
    {

        var self = this;
        event.preventDefault();
        var validated = self.validate();
        self.render(true);
        if (!validated) return;

        $('#card-errors').text('');
        if ( $('#password').val() !== $('#verifypassword').val() ) {
            $('#card-errors').text('Password fields do not match.');
            return;
        }


        modal.render("spinner", "Your request is being processed.");

        stripe.createToken(card).then(function(result) {
            if (result.error) {
                modal.closeWindow();
                // Inform the user if there was an error
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            } else {
                // Send the token to your server
                subscribe.data['stripetoken'] = result.token.id;
                subscribe.data['planid'] = $('#planid').val();
                console.log('formhandling');
                formhandler(subscribe.data, '/auth/paywall-signup');
            }
        });    
    };
    SubscribeForm.prototype.events = function()
    {
        var self = this;
        $('input, textarea').on("change", function(e) {

            e.stopPropagation();
            e.preventDefault();
            var data = {};
            var elem = $(e.target);
            var elemid = elem.attr('name');
            var inputType = elem.attr('type');

            if (inputType == 'text' || inputType == 'email' || inputType == 'password') {
                data[elemid] = elem.val();
                // username is created from the email plus a random number
                if (inputType == 'email') {
                    data['username'] = data[elemid].split('@')[0] + Math.floor(100000000 + Math.random() * 900000000);
                }

            } else if (inputType =='checkbox') {
                data[elemid] = elem.is(":checked");
            }

            self.updateData(data);
            var validated = self.validate([elemid]);
            self.render();
        });

        var form = document.getElementById('payment-form');

        if (form != null) {
            form.addEventListener('submit', function(event) {
                self.submit(event);

            });
        }


    };

    var subscribe = new SubscribeForm();

    Acme.countrySelect = function() {
        this.container = $('#countrySelect');
        this.subscriptions = Acme.PubSub.subscribe({
            'Acme.countryChoice.listener' : ["update_state"]
        });
        this.render();
    };
        Acme.countrySelect.prototype = new Acme._View();
    
        Acme.countrySelect.prototype.listeners =  {
            "regionSelect" : function(data) {
                var data = {
                    "region": data.regionSelect
                }
                Acme.PubSub.publish('update_state', data);
            },
            "clear" : function(data) {
                this.menu.reset();
            }
        };
        Acme.countrySelect.prototype.render = function() {
            this.menu = new Acme.listMenu({
                'parent'        : this.container,
                'list'          : ['Australia', 'New Zealand', 'America', 'Canada', 'England'],
                'defaultSelect' : {"label": 'Select Country'},
                'name'          : 'regionSelect',
                'key'           : 'regionSelect',
                'allowClear'    : true
            }).init().render();
        };
        Acme.countrySelect.prototype.reset = function() {
            this.menu.reset();
        };
    


    Acme.countryChoice = new Acme.countrySelect();



    var formhandler = function(formdata, path) {
        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        $.ajax({
            url: _appJsConfig.appHostName + path,
            type: 'post',
            data: formdata,
            dataType: 'json',
            success: function(data) {

                if(data.success) {
                    console.log('singed up well!!');
                    $('#card-errors').text('Completed successfully.');
                } else {
                    modal.closeWindow();

                    var text = ''
                    for (var key in data.error) {
                        text = text + data.error[key] + " ";
                    } 
                    $('#card-errors').text(text);
                }   
            },
            error: function(data) {
                modal.closeWindow();
            }
        });

    }



    var udform = document.getElementById('update-card-form');

    if (udform != null) {

        udform.addEventListener('submit', function(event) {
            event.preventDefault();
             $('#card-errors').text('');
            stripe.createToken(card).then(function(result) {
                if (result.error) {
                    // Inform the user if there was an error
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                } else {
                    // Send the token to your server

                    formdata = {"stripetoken":result.token.id}
                    formhandler(formdata, '/user/update-payment-details');
                }
            });
        });
    }
} 