$('.j-mcsubscribe').on('click',function(event){
    var email = $('#'+$(event.currentTarget).data('input')).val();
    document.getElementById("mce-group[3]-"+$(event.currentTarget).data('type')).checked = true;
    $('#j-box-'+$(event.currentTarget).data('type')).addClass('d-none');
    $('#j-mcpopup-thankyou').text('You are signing up to the '+$(event.currentTarget).data('title')+'.');
    $('#mce-EMAIL').val(email);
    $('#j-mcpopup').removeClass('d-none');
});

$('.j-mcmultisubscribe').on('click',function(event){
    // var doSubscribe = false;
    // var subscribeData = {
    //     "EMAIL":  $('#j-mcpopup').data('email'), 
    //     "u": "e0ae259e8f9472b9c54037c25",
    //     "id": "71de5c4b35"
    // };

    // if ($('#j-mccheckbox-daily').is(":checked")){
    //     doSubscribe = true;
    //     subscribeData["group[3][1]"] = 1;
    // };
    // if ($('#j-mccheckbox-weekly').is(":checked")){
    //     doSubscribe = true;
    //     subscribeData["group[3][2]"] = 2;
    // };
    // if ($('#j-mccheckbox-lockerroom').is(":checked")){
    //     doSubscribe = true;
    //     subscribeData["group[3][4]"] = 4;
    // };
    // if ($('#j-mccheckbox-readingroom').is(":checked")){
    //     doSubscribe = true;
    //     subscribeData["group[3][8]"] = 8;
    // };

    //console.log(subscribeData);

    // Acme.server.create("https://newsroom.us14.list-manage.com/subscribe/post", subscribeData)
    // .then(function(r) {
    //     console.log(r);
    // });


    // requestData = {
    //     email   : $('#j-mcpopup').data('email'),
    //     list    : "71de5c4b35",
    //     group   : "group[3][4]",
    //     action  : 'post'
    // };

    // Acme.server.create(_appJsConfig.baseHttpPath + '/api/integration/mailchimp-subscription', requestData )
    //     .done(function(r) {
    //         if (r.success == 1) {
               
    //             console.log(r);
    //             // var msg = 'Succesfully ' + action + 'd ' + actionVerb + ' ' + self.emailLists[requestData['list']];
    //             // $("#account-form__email").prepend('<p>' + msg + '</p>');
    //         }
    //     }).fail(function(e) {
    //         console.log(e);
    //         $('#createUserErrorMessage').text(e.errorText);
    //     });
    
    $( "#j-box-3-0" ).addClass("d-none");
    $( "#j-box-3-1" ).addClass("d-none");
    $( "#j-box-3-2" ).addClass("d-none");
    $( "#j-box-3-3" ).addClass("d-none");
    $('#j-mcpopup-thankyou').text('Thank you for signing up');
    $('#j-mcpopup-blurb').text("To unsubscribe, click the link in the email.");
    $('#j-mcpopup-cancel').text('CLOSE');
    $('#j-mcpopup-signup').addClass('d-none');
});

$('.j-mccancel').on('click',function(){
    $('#j-mcpopup').data('email','');
    $('#j-mcpopup').addClass('d-none');
    $( "#j-mccheckbox-3-0" ).prop( "checked", false );
    $( "#j-box-3-0" ).removeClass("d-none");
    $( "#j-mccheckbox-3-1" ).prop( "checked", false );
    $( "#j-box-3-1" ).removeClass("d-none");
    $( "#j-mccheckbox-3-2" ).prop( "checked", false );
    $( "#j-box-3-2" ).removeClass("d-none");
    $( "#j-mccheckbox-3-3" ).prop( "checked", false );
    $( "#j-box-3-3" ).removeClass("d-none");
    $('#j-mcpopup-signup').removeClass('d-none');
    $('#j-mcpopup-cancel').html('CANCEL');
    $('#j-mcpopup-blurb').html("While you’re here would you like to sign up to any of our other email newsletters?");
    
});   

$('.j-mcprosubscribe').on('click',function(event){
    $('#j-mcpopup').removeClass('d-none');
});
            


var footerCta = document.getElementById('cta-footer-button');
footerCta.addEventListener('click', function(e) {
    var form = document.querySelector('.j-cta-footer-form');
    this.classList.add('d-none');
    form.classList.remove('d-none');
});

var bodyCta = document.getElementById('cta-body-signtoggle');
bodyCta.addEventListener('click', function(e) {
    this.classList.add('d-none');
    var buttons = document.querySelectorAll('.j-cta-body-buttons');
    console.log(buttons);
    for (var i=0; i<buttons.length; i++) {
        console.log(buttons[i]);
        buttons[i].classList.add('d-none');
        buttons[i].classList.remove('d-md-block');
    }
    var form = document.querySelector('.j-cta-body-form');
    form.classList.remove('d-none');
});


var sideCta = document.querySelector('.j-cta-side-signtoggle');
sideCta.addEventListener('click', function(e) {
    var form = document.querySelector('.j-cta-side-form');
    this.classList.add('d-none');
    form.classList.remove('d-none');
});

