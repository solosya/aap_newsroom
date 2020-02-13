/**
 * Handlebar Article templates for listing
 */
Acme.templates = {};

Acme.templates.mailchimpList = 
    '<div> \
        <input type="checkbox" class="email-subscription__checkbox" name="summary-email" id="mailchimp" value="{{listId}}:{{groupId}}" {{checked}}> \
        <label class="email-subscription__label">{{{name}}}</label> \
    </div>';

Acme.templates.pulldown = 
'<div id="{{ name }}" class="Acme-pulldown {{class}}"> \
    <p class="Acme-pulldown__selected-item"></p> \
    <span class="Acme-pulldown__span"></span> \
    <ul class="Acme-pulldown__list" data-key="{{ key }}"></ul> \
</div>';


Acme.templates.create_user = 
'<div class="" style="height:100%; overflow:auto; position:relative"> \
    <div class="user-editor__input-container u-float-left"> \
        <input type="text" id="newuserfirstname" class="j-firstname account-form__input" value="" placeholder="{{firstname}}"> \
    </div> \
    <div class="user-editor__input-container u-float-right"> \
        <input type="text" id="newuserlastname" class="j-lastname account-form__input" value="" placeholder="{{lastname}}"> \
    </div> \
    <div class="user-editor__input-container u-float-left"> \
        <input type="text" id="newuseruseremail" class="j-email account-form__input" value="" placeholder="{{useremail}}"> \
        <p id="userError" class="user-editor__error"></p> \
    </div> \
    <div id="user-editor-buttons" class="user-editor__input-container user-editor__buttons u-float-right"> \
        <a id="cancelUserCreate" class="userdetails__button userdetails__button--delete u-float-right"></a> \
        <a id="saveUser"       class="userdetails__button userdetails__button--save u-float-right">Save</a> \
    </div> \
    <div id="user-editor__spinner" class="user-editor__spinner"></div> \
</div>';


Acme.templates.edit_user = 
'<div class="" style="height:100%; overflow:auto"> \
    <div class="user-editor__input-container u-float-left"> \
        <input type="text" id="newuserfirstname" class="j-firstname user-editor__input" value="{{firstname}}" placeholder="First name"> \
        <input type="text" id="newuserusername" class="j-username user-editor__input" value="{{username}}" placeholder="Email address"> \
        </div> \
    <div class="user-editor__input-container u-float-right"> \
        <input type="text" id="newuserlastname" class="j-lastname user-editor__input" value="{{lastname}}" placeholder="Last name"> \
    </div> \
    <div id="user-editor-buttons" class="user-editor__input-container u-float-right"> \
        <a id="cancelUserCreate" class="userdetails__button userdetails__button--delete u-float-right"></a> \
        <a id="saveUser"       class="userdetails__button userdetails__button--save u-float-right">Save</a> \
    </div> \
</div>';

Acme.templates.managed_user = 
'<div class="u-float-left"> \
    <p class="userdetails__name"> \
        <span class="j-firstname">{{firstname}}</span> \
        <span class="j-lastname">{{lastname}}</span> \
    </p> \
    <p class="j-username userdetails__username">{{username}}</p> \
</div>\
<a class="j-delete userdetails__button userdetails__button--delete u-float-right"></a> \
<a class="j-edit userdetails__button userdetails__button--edit u-float-right"></a>';


Acme.managed_user = 
'<li id="{{id}}" class="userdetails {{cardClass}}"> \
    <div class="u-float-left"> \
        <p class="userdetails__name"> \
            <span class="j-firstname">{{firstname}}</span> \
            <span class="j-lastname">{{lastname}}</span> \
        </p> \
    </div>\
    <a class="j-delete userdetails__button userdetails__button--delete u-float-right"></a> \
    <a class="j-edit userdetails__button userdetails__button--edit u-float-right"></a> \
    <p class="j-email  userdetails__email u-float-right">{{email}}</p> \
</li>';


Acme.templates.signinFormTmpl = 
    // <script> tag possible ios safari login fix
    '<form name="loginForm" id="loginForm" class="login-form active" action="javascript:void(0);" method="post" accept-charset="UTF-8" autocomplete="off"> \
        \
        <input id="loginName" class="" type="text" name="username" placeholder="Email address" value="" /> \
        <input id="loginPass" class="" type="password" name="password" placeholder="Password" value="" /> \
        \
        <div class="remember"> \
            <p class="layout" data-layout="forgot" class="">Forgot password</p> \
        </div> \
        \
        <div class="message active hide"> \
            <div class="login-form__error_text">Invalid Email or Password</div> \
        </div> \
        \
        <button id="signinBtn" type="submit" class="_btn _btn--red signin">SIGN IN</button> \
        \
        <p class="u-no-margin u-margin-top-15 login-form-faq">Trouble signing in? <a class="login-form-faq__link" href="'+_appJsConfig.appHostName +'/faq" target="_blank">Read our FAQ</a></p> \
        <div class="reset"> \
            <p class="layout" data-layout="forgot" class="">Set my password</p> \
        </div> \
        \
        <script>$("#loginName").on("input", function() {window.scrollBy(0,1);window.scrollBy(0,-1);})</script>\
    </form>';

Acme.templates.registerTmpl = 
    '<form name="registerForm" id="registerForm" class="active" action="javascript:void(0);" method="post" accept-charset="UTF-8" autocomplete="off"> \
        \
        <input id="name" class="" type="text" name="name" placeholder="Name"> \
        <input id="email" class="" type="email" name="email" placeholder="Email"> \
        \
        <div class="message active hide"> \
            <div class="account-modal__error_text">Done!</div> \
        </div> \
        \
        <button id="signinBtn" type="submit" class="_btn _btn--red register">Register</button> \
    </form>';


Acme.templates.forgotFormTmpl = 
    '<form name="forgotForm" id="forgotForm" class="password-reset-form active" action="javascript:void(0);" method="post" accept-charset="UTF-8" autocomplete="off"> \
        <input type="hidden" name="_csrf" value="" /> \
        <p class="password-reset-form__p">Enter your email below and we will send you a link to set your password.</p> \
        <input id="email" class="password-reset-form__input" type="text" name="email" placehold="Email" value=""> \
        \
        <div class="message active hide"> \
            <div class="password-reset-form__error_text">No user with that email found.</div> \
        </div> \
        \
        <button id="forgotBtn" type="submit" class="_btn _btn--red forgot">SEND EMAIL</button> \
    </form>';

    
Acme.templates.spinner = 
    '<div id="{{name}}" class="flex_col {{name}}"> \
        <div id="dialog" class="{{name}}__window"> \
            <div class="{{name}}__header"> \
                <h2 class="{{name}}__title">{{title}}</h2> \
            </div> \
            <div class="{{name}}__content-window" id="dialogContent"></div> \
        </div> \
    </div>';
    

Acme.templates.spinnerTmpl = '<div class="spinner"></div>';

Acme.templates.subscribeTerms =  '<p class="password-reset-form__p u-margin-bottom-20">Please agree to the terms of use.</p><div><form><button class="_btn _btn--red">Okay</button></form></div>';
Acme.templates.ipnotice =  
    '<p class="ipdialog__p u-margin-bottom-20">You can access Pro under this subscription – simply email <a href="mailto:pro@newsroom.co.nz"><strong>pro@newsroom.co.nz</strong></a> for a login.</p> \
    <div> \
        <form> \
            <a href="mailto:pro@newsroom.co.nz" class="ipdialog__btn _btn _btn--red _btn--outline-red">CONTACT US</a> \
            <button class="ipdialog__btn _btn _btn--outline" data-role="close">I\'LL DO IT LATER</button> \
        </form> \
    </div>';

Acme.templates.userPlanMessage = 
'<form name="loginForm" id="loginForm" class="active" action="javascript:void(0);" method="post" accept-charset="UTF-8" autocomplete="off"> \
     <button id="cancelbutton" class="_btn _btn--red close">OK</button> \
</form>';

Acme.templates.userPlanOkCancel = 
'<form name="loginForm" id="loginForm" class="active" action="javascript:void(0);" method="post" accept-charset="UTF-8" autocomplete="off"> \
     <button id="okaybutton" class="_btn _btn--red okay" data-role="okay">OK</button> \
     <button id="cancelbutton" class="_btn _btn--gray close" data-role="cancel">Cancel</button> \
</form>';


Acme.templates.modal = 
// style="scrolling == unusable position:fixed element might be fixing login for ios safari
// also margin-top:10px
'<div id="{{name}}" class="flex_col {{name}}"> \
    <div id="dialog" class="{{name}}__window"> \
        <div class="{{name}}__container centerContent" style="scrolling == unusable position:fixed element"> \
            <div class="{{name}}__header"> \
                <h2 class="{{name}}__title">{{title}}</h2> \
                <img class="popupVideo__headerlogo" src="{{path}}/static/images/nr-logo.svg" alt="logo"> \
                <a class="{{name}}__close" href="#" data-behaviour="close"></a> \
            </div> \
            <div class="{{name}}__content-window" id="dialogContent" style="scrolling == unusable position:fixed element"></div> \
        </div> \
    </div> \
</div>';

    // <video class="popupVideo__video" controls poster="{{image.path}}"> \
    //     <source src="{{video}}" type="video/mp4"/> \
    // </video> \

    // <iframe class="popupVideo__video" width="100%" height="100%" src="https://www.youtube.com/embed/L4O352anH_g" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> \
Acme.templates.modalVideo = 
'<div id="popupVideo" class="popup-video"> \
    <div class="popupVideo__logo-container"> \
        <img class="popupVideo__logo" src="{{path}}/static/images/nr-logo.svg" alt="logo"> \
    </div> \
    <video class="popupVideo__video" controls autoplay poster="{{path}}/static/videos/newsroom_awards_full.jpg"> \
         <source src="https://s3-ap-southeast-2.amazonaws.com/cog-aap/themes/g02Ei4J8TjnbLiR/static/videos/Newsroom_Awards_Full.mp4" type="video/mp4"/> \
    </video> \
</div>';

Acme.templates.registerPopup = 
'<div id="register-popup" class="register-popup"> \
    <div class="container"> \
        <div class="row"> \
            <div class="col-xs-6 "> \
                <img class="register-popup__logo" src="{{path}}/static/images/newsroom-reversed.png" alt="logo"> \
            </div> \
            <div class="col-xs-6 "> \
                <div class="register-popup__close-container"> \
                    <a href="#" id="register-popup-close" class="register-popup__close register-popup__close@sm">CLOSE <span class="register-popup__close-icon"></span></a> \
                    <a href="#" id="register-popup-subscriber" class="register-popup__subscriber register-popup__subscriber@sm">I\'ve already subscribed</a> \
                </div>\
            </div> \
        </div> \
        <div class="row">\
            <div class="col-sm-5"> \
                <p class="register-popup__text"> \
                    Start your day with our editors\' picks of the very best stories. \
                    Sign up here for your free daily briefing email. <br /> \
                </p> \
            </div> \
            \
            <div class="col-sm-offset-1 col-sm-6"> \
                <div id="mc_embed_signup" class="popup-embed-signup"> \
                    <form action="//newsroom.us14.list-manage.com/subscribe/post?u=e0ae259e8f9472b9c54037c25&amp;id=71de5c4b35" method="post" id="mc-embedded-subscribe-form-popup" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate> \
                        <div id="mc_embed_signup_scroll" style="display:flex"> \
                            <div class="mc-field-group popup-embed-signup__field"> \
                                <input type="email" value="" name="EMAIL" class="required email popup-embed-signup__input" id="mce-EMAIL" placeholder="Email address" style="color:black; border:none"> \
                            </div> \
                            <button type="submit" class="popup-embed-signup__button" name="subscribe" id="mc-embedded-subscribe"> \
                                Sign Up \
                            </button> \
                            \
                            <div id="mce-responses" class="clear"> \
                                <div class="response" id="mce-error-response" style="display:none"></div> \
                                <div class="response" id="mce-success-response" style="display:none"></div> \
                            </div> \
                            <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_e0ae259e8f9472b9c54037c25_71de5c4b35" tabindex="-1" value=""></div> \
                        </div> \
                    </form> \
                </div> \
            </div> \
        </div> \
    </div> \
</div>';


var systemCardTemplate = 
'<div class="{{containerClass}} "> \
    <a  itemprop="url" \
        href="{{url}}" \
        class="card swap {{hasMediaClass}}" \
        data-id="{{articleId}}" \
        data-position="{{position}}" \
        data-social="0" \
        data-article-image="{{{imageUrl}}}" \
        data-article-text="{{title}}"> \
        \
        <article class="">\
            {{#if hasMedia}}\
                <figure>\
                    <img class="img-responsive lazyload" data-original="{{imageUrl}}" src="{{imageUrl}}" style="background-image:url("{{placeholder}}"")> \
                </figure>\
            {{/if}} \
        \
            <div class="content">\
                    <div class="category">{{label}}</div>\
                    <h2>{{{ title }}}</h2>\
                    <p>{{{ excerpt }}}</p>\
                    <div class="author">\
                        <img src="{{profileImg}}" class="img-circle">\
                        <p>{{ createdBy.displayName }}</p>\
                    </div>\
            </div>\
        </article>'+
        
        '{{#if userHasBlogAccess}}'+
            '<div class="btn_overlay articleMenu">'+
                '<button title="Hide" data-guid="{{guid}}" class="btnhide social-tooltip HideBlogArticle" type="button" data-social="0">'+
                    '<i class="fa fa-eye-slash"></i><span class="hide">Hide</span>'+
                '</button>'+
                '<button onclick="window.location=\'{{{editUrl}}}\'; return false;" title="Edit" class="btnhide social-tooltip" type="button">'+
                    '<i class="fa fa-edit"></i><span class="hide">Edit</span>'+
                '</button>'+
                '<button data-position="{{position}}" data-social="0" data-id="{{articleId}}" title="{{pinTitle}}" class="btnhide social-tooltip PinArticleBtn" type="button" data-status="{{isPinned}}">'+
                    '<i class="fa fa-thumb-tack"></i><span class="hide">{{pinText}}</span>'+
                '</button>'+
            '</div>'+
        "{{/if}}"+
    '</a>'+
'</div>';




var cardTemplateTop = 
'<div class="{{cardClass}} "> \
    <a  itemprop="url" \
        href="{{url}}" \
        class="card swap {{articleStatus}}  {{hasMediaClass}}" \
        data-id="{{articleId}}" \
        data-position="{{position}}" \
        data-status="{{articleStatus}}" \
        data-social="0" \
        data-article-image="{{{imageUrl}}}" \
        data-article-text="{{title}}" \
        title="{{titleString}}"> \
    \
        <article class="">';

var cardTemplateBottom = 
        '</article>'+
        
        '{{#if userHasBlogAccess}}'+
            '<div class="btn_overlay articleMenu">'+
                '<button title="Hide" data-guid="{{guid}}" class="btnhide social-tooltip HideBlogArticle" type="button" data-social="0">'+
                    '<i class="fa fa-eye-slash"></i><span class="hide">Hide</span>'+
                '</button>'+
                '<button onclick="window.location=\'{{{editUrl}}}\'; return false;" title="Edit" class="btnhide social-tooltip" type="button">'+
                    '<i class="fa fa-edit"></i><span class="hide">Edit</span>'+
                '</button>'+
                '<button data-position="{{position}}" data-social="0" data-id="{{articleId}}" title="{{pinTitle}}" class="btnhide social-tooltip PinArticleBtn" type="button" data-status="{{isPinned}}">'+
                    '<i class="fa fa-thumb-tack"></i><span class="hide">{{pinText}}</span>'+
                '</button>'+
            '</div>'+
        "{{/if}}"+
    '</a>'+
'</div>';



Acme.systemCardTemplate = 
    cardTemplateTop + 
        '{{#if hasMedia}}\
            <figure>\
                <img class="img-responsive {{imgClass}}" data-original="{{imageUrl}}" src="{{imageUrl}}" {{imgBackgroundStyle}}">\
            </figure>\
        {{/if}} \
        \
        <div class="content">\
            <div class="category">{{label}}</div>\
            <h2>{{{ title }}}</h2>\
            <p>{{{ excerpt }}}</p>\
            <div class="author">\
                <img src="{{profileImg}}" class="img-circle">\
                <p>{{ createdBy.displayName }}</p>\
            </div>\
        </div>' + 
    cardTemplateBottom;







var socialCardTemplate =  '<div class="{{containerClass}}">' +
                                '<a href="{{social.url}}" target="_blank" class="card swap card__{{social.source}} {{#if social.hasMedia}} withImage__content {{else }} without__image {{/if}} {{videoClass}}" data-id="{{socialId}}" data-position="{{position}}" data-social="1" data-article-image="{{{social.media.path}}}" data-article-text="{{social.content}}">'+
                                    '{{#if social.hasMedia}}'+
                                    '<div class="card-image lazyload" data-original="{{social.media.path}}" style="background-image:url(https://placeholdit.imgix.net/~text?txtsize=33&txt=Loading&w=450&h=250)">'+
                                        '<div class="play_icon video-player" data-source="{{social.source}}" data-url="{{social.media.videoUrl}}" data-poster="{{social.media.path}}"></div>'+
                                    '</div>' +
                                    '{{/if}}'+
                                    '<div class="content-section">' +
                                        '<div class="title-section">' +
                                            '<span>{{social.source}}</span>' +
                                            '<div class="card-icon"></div>' +
                                        '</div>' +
                                        '<p class="description" id="updateSocial{{socialId}}" data-update="0">{{{social.content}}}</p>' +
                                        '<div class="caption_bottom">' +
                                            '<div class="author_name">{{social.user.name}}</div>' +
                                            '<div class="post_date">{{social.publishDate}}</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '{{#if userHasBlogAccess}}'+
                                        '<div class="btn_overlay articleMenu">'+
                                            '<button title="Hide" data-guid="{{social.guid}}" class="btnhide social-tooltip HideBlogArticle" type="button" data-social="1">'+
                                                '<i class="fa fa-eye-slash"></i><span class="hide">Hide</span>'+
                                            '</button>'+
                                            '<button title="Edit" class="btnhide social-tooltip editSocialPost" type="button" data-url="/admin/social-funnel/update-social?guid={{blog.guid}}&socialguid={{social.guid}}">'+
                                            '<i class="fa fa-edit"></i><span class="hide">Edit</span>'+
                                            '</button>'+
                                            '<button data-position="{{position}}" data-social="1" data-id="{{socialId}}" title="{{pinTitle}}" class="btnhide social-tooltip PinArticleBtn" type="button" data-status="{{isPinned}}">'+
                                                '<i class="fa fa-thumb-tack"></i><span class="hide">{{pinText}}</span>'+
                                            '</button>'+
                                        '</div>'+
                                    '{{/if}}'+   
                                '</a>' +
                            '</div>';