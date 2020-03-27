$('.j-mcsubscribe').click(function(event){
    mcSubscribe(event.currentTarget);
    var email = $('#'+$(event.currentTarget).data('input')).val();
    //console.log(email);
    $('#j-box-'+$(event.currentTarget).data('type')).addClass('d-none');
    $('#j-mcpopup').data('email',email);
    $('#j-mcpopup').removeClass('d-none');
});

$('.j-mcmultisubscribe').click(function(event){
    var doSubscribe = false;
    var subscribeData = {
        "EMAIL":  $('#j-mcpopup').data('email'), 
        "u": "e0ae259e8f9472b9c54037c25",
        "id": "71de5c4b35"
    };

    if ($('#j-mccheckbox-daily').is(":checked")){
        doSubscribe = true;
        subscribeData["group[3][1]"] = 1;
    };
    if ($('#j-mccheckbox-weekly').is(":checked")){
        doSubscribe = true;
        subscribeData["group[3][2]"] = 2;
    };
    if ($('#j-mccheckbox-lockerroom').is(":checked")){
        doSubscribe = true;
        subscribeData["group[3][4]"] = 4;
    };
    if ($('#j-mccheckbox-readingroom').is(":checked")){
        doSubscribe = true;
        subscribeData["group[3][8]"] = 8;
    };

    //console.log(subscribeData);

    Acme.server.create("https://newsroom.us14.list-manage.com/subscribe/post", subscribeData)
    .then(function(r) {
        console.log(r);
    });
    
    $( "#j-box-daily" ).addClass("d-none");
    $( "#j-box-weekly" ).addClass("d-none");
    $( "#j-box-lockerroom" ).addClass("d-none");
    $( "#j-box-readingroom" ).addClass("d-none");
    $('#j-mcpopup-blurb').text("You're all set! To change your subscriptions later click the link inside our emails.");
    $('#j-mcpopup-cancel').text('CLOSE');
    $('#j-mcpopup-signup').addClass('d-none');
});

$('.j-mccancel').click(function(){
    $('#j-mcpopup').data('email','');
    $('#j-mcpopup').addClass('d-none');
    $( "#j-mccheckbox-daily" ).prop( "checked", false );
    $( "#j-box-daily" ).removeClass("d-none");
    $( "#j-mccheckbox-weekly" ).prop( "checked", false );
    $( "#j-box-weekly" ).removeClass("d-none");
    $( "#j-mccheckbox-lockerroom" ).prop( "checked", false );
    $( "#j-box-lockerroom" ).removeClass("d-none");
    $( "#j-mccheckbox-readingroom" ).prop( "checked", false );
    $( "#j-box-readingroom" ).removeClass("d-none");
    $('#j-mcpopup-signup').removeClass('d-none');
    $('#j-mcpopup-cancel').html('NO THANKS');
    $('#j-mcpopup-blurb').html("While you’re here would you like to sign up to any of our other email newsletters?");
    
});


mcSubscribe = function(object){
    self = $(object);
    //console.log(self.data('input'));
    var subscribeData = {
        "EMAIL": $('#'+self.data('input')).val(), 
        "u": "e0ae259e8f9472b9c54037c25",
        "id": "71de5c4b35"
    };
    if (self.data("group[3][1]")) {
        subscribeData["group[3][1]"] = 1;
    }
    if (self.data("group[3][2]")) {
        subscribeData["group[3][2]"] = 2;
    }
    if (self.data("group[3][4]")) {
        subscribeData["group[3][4]"] = 4;
    }
    if (self.data("group[3][8]")) {
        subscribeData["group[3][8]"] = 8;
    }
    //console.log(subscribeData);
    
    Acme.server.create("https://newsroom.us14.list-manage.com/subscribe/post", subscribeData)
        .then(function(r) {
            console.log(r);
        });   
};                     
            
