Acme.Comments = function(params) {
    console.log(params);
    this.articleId = params.articleId;
    this.articleGuid = params.articleGuid;
    this.container = params.container || null;
    this.input = params.input || null;
    this.form = params.form || null;
    this.submitButton = params.button || null;
    this.userName = params.username || null;
    this.approved = 1;
    this.events();

};

Acme.Comments.prototype.render = function() {
    var html= "<p>This is a comment</p>";
    this.container.append(html);
};

Acme.Comments.prototype.postComment = function(comment) {

    var csrfToken = $('meta[name="csrf-token"]').attr("content");

    var data = {
        guid: this.articleGuid, 
        name: this.userName, 
        comments: comment, 
        approved: this.approved, 
        _csrf: csrfToken
    };

    return Acme.server.create(_appJsConfig.baseHttpPath + '/article/comments', data).done(function(r) {
        console.log(r);
    });

}


Acme.Comments.prototype.events = function() {
    var self = this;

    this.form.on('submit', function(e) {
        e.preventDefault();
        $elem = $(this);
        self.submitButton.text('')
            .addClass('spinner');
        
        self.postComment(self.input.val()).done(function(r) {
            $().General_ShowNotification({message: 'You comment has been sent. Thanks!', layout:'bottomRight'});
            self.input.val("");
            self.submitButton.text("Send")
                .removeClass('spinner');

        });
    });
}
