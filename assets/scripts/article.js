Acme.CommentForm = function(params) {
    this.csrfToken = $('meta[name="csrf-token"]').attr("content");

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

Acme.CommentForm.prototype.render = function() {
    var html= "<p>This is a comment</p>";
    this.container.append(html);
};

Acme.CommentForm.prototype.postComment = function(comment) {

    var data = {
        guid: this.articleGuid, 
        name: this.userName, 
        comment: comment, 
        approved: this.approved, 
        _csrf: this.csrfToken
    };

    return Acme.server.create(_appJsConfig.baseHttpPath + '/api/article/post-comment', data).done(function(r) {
        console.log(r);
    });

}


Acme.CommentForm.prototype.events = function() {
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


Acme.Comments = function(params) {
    this.csrfToken = $('meta[name="csrf-token"]').attr("content");
    this.comments = [];
    this.events();p
};

Acme.Comments.prototype.like = function(guid) {
    var data = {
        guid: guid,
        _csrf: this.csrfToken
    };

    return Acme.server.create(_appJsConfig.baseHttpPath + '/api/article/like-comment', data).done(function(r) {
        console.log(r);
    });

}


Acme.Comments.prototype.events = function() {
    var self = this;

    $('.js-comment-like').on('click', function(e) {
        e.preventDefault();
        var btn = $(e.target);
        var comment = btn.closest('.c-comment');
        var commentGuid = comment.data('guid');
        self.like(commentGuid);
        console.log(commentGuid);
    });

};