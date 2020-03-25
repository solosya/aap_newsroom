$('.j-mcsubscribe').click(function(event){
    //mcSubscribe(event.currentTarget);
    var email = $('#'+$(event.currentTarget).data('input')).val();
    consile.log(email);
    $('#mcpopup').data('email',email);
});

// $('.j-mcmultisubscribe').click(function(){
//     var ticks = $

// });


mcSubscribe = function(object){
    self = $(object);
    console.log(self.data('input'));
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
    console.log(subscribeData);
    
    Acme.server.create("https://newsroom.us14.list-manage.com/subscribe/post", subscribeData)
        .then(function(r) {
            console.log(r);
        });   
};                     
            
