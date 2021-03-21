import Handlebars from 'handlebars'
import { pinUnpinArticle, deleteArticle } from './sdk/article'
// import { Image } from './sdk/image'
import { Templates } from './article-templates';
import { Cloudinary } from '@cloudinary/base'
import { fill, thumbnail } from "@cloudinary/base/actions/resize";
import { faces } from "@cloudinary/base/qualifiers/focusOn";
import { focusOn } from "@cloudinary/base/qualifiers/gravity";


export const Card = function() {
    this.events();
};

Card.prototype.renderCard = function(card, cardClass, template, type)
{

    var self = this;
    var template = (template) ? Templates[template] : Templates.systemCardTemplate;

    card['cardClass'] = cardClass;
    if (card.status == "draft") {
        card['articleStatus'] = "draft";
        card['cardClass'] += " draft"; 
    }

    card['cardType'] = card.type || "";
    card['lightbox'] = card.lightbox || "";


    card['pinTitle'] = (card.isPinned == 1) ? 'Un-Pin Article' : 'Pin Article';
    card['pinText']  = (card.isPinned == 1) ? 'Un-Pin' : 'Pin';
    card['promotedClass'] = (card.isPromoted == 1)? 'ad_icon' : '';
    card['hasMediaClass'] = (card.hasMedia == 1)? 'withImage__content' : 'without__image';
    
    // mainly for screen to turn off lazyload and loading background img
    card['imgClass'] = (card.lazyloadImage == false) ? '' : 'lazyload';
    card['imgBackgroundStyle'] = (card.lazyloadImage == false) ? '' : 'style="background-image:url(https://placeholdit.imgix.net/~text?txtsize=33&txt=Loading&w=450&h=250)"';
    
    card['readingTime']= self.renderReadingTime(card.readingTime);
    card['blogClass']= '';
    if(card.blog['id'] !== null) {
       card['blogClass']= 'card--blog_'+card.blog['id'];
    } 
    
    var width = 500;
    var height = 350;

    if (card.imageOptions) {
        width = card.imageOptions.width || width;
        height = card.imageOptions.height || height;
    }
    // console.log(card);
    card['draggable'] = "false";


    const profileImage = card['createdBy']['media'];
    const articleImage = card['featuredMedia'];

    const cld = new Cloudinary({
        cloud: {
          cloudName: articleImage.cloudName
        }
    });
    // Docs:
    // https://cloudinary.com/documentation/javascript2_image_transformations
    const articleImg = cld.image(articleImage.id);
    const profileImg = cld.image(profileImage.id);
    articleImg.resize( fill().width(width).height(height).gravity( focusOn( faces() ) ) );
    profileImg.resize( thumbnail().width(34).height(34).gravity( focusOn( faces() ) ) );

    // card['profileImg'] = Image({media:card['createdBy']['media'], mediaOptions:{width: 34 ,height:34, crop: 'thumb', gravity: 'face'} });
    // card['imageUrl'] = Image({media:card['featuredMedia'], mediaOptions:{width: width ,height:height, crop: 'limit'} });
    card['profileImg'] = profileImg.toURL();
    card['imageUrl'] = articleImg.toURL();

    card['titleString'] = "";
    if (_appJsConfig.isUserLoggedIn === 1 && _appJsConfig.userHasBlogAccess === 1) {
        var totalstring = "";
        var totals = (card.total ) ? card.total : false;
        if ( totals ) {
            totalstring = "Viewed " + totals.view + " times";
            totalstring = totalstring + " Published " + card.publishedDateTime;
        }
        card['titleString'] = totalstring;
        card['draggable'] = "true";
    }

    var articleId = parseInt(card.articleId);
    var articleTemplate;

    if (isNaN(articleId) || articleId <= 0) {
        // card['videoClass'] = '';
        // if(card.social.media.type && card.social.media.type == 'video') {
        //     card['videoClass'] = 'video_card';
        // }
        articleTemplate = Handlebars.compile(template);
    } else {
        articleTemplate = Handlebars.compile(template);
    }
    return articleTemplate(card);
}

Card.prototype.renderReadingTime = function (time) 
{
    if (time <= '59') {
        return ((time <= 0) ? 1 : time) + ' min read';
    } else {
        var hr = Math.round(parseInt(time) / 100);
        return hr + ' hour read';
    }
};



// events
Card.prototype.bindPinUnpinArticle = function()
{
    pinUnpinArticle( $('button.PinArticleBtn'), {
        onSuccess: function(data, obj){
            var status = $(obj).data('status');
            var obj = $(obj);
            (status == 1) 
                ? obj.attr('title', 'Un-Pin Article') 
                : obj.attr('title', 'Pin Article');
            (status == 1) 
                ? obj.find('span').first().html('Un-Pin')
                : obj.find('span').first().html('Pin');        
        }
    });
};

Card.prototype.bindDeleteHideArticle = function()
{
    deleteArticle( $('button.HideBlogArticle'), {
        onSuccess: function(data, obj){
            $(obj).closest('.card').parent('div').remove();
            var postsCount = $('body').find('.card').length;
            if(postsCount <= 0) {
                $('.NoArticlesMsg').removeClass('hide');
            }
        }
    });
};



// Card.prototype.lightbox = function(elem, isRequestSent)
// {
//     var csrfToken = $('meta[name="csrf-token"]').attr("content");
//     var isSocial = elem.data('social');
    
//     if (isSocial) {
//         var url = '/api/social/get-social-post';
//         var blogGuid = elem.data('blog-guid');
//         var postGuid = elem.data('guid');
//         var payload = {blog_guid: blogGuid, guid: postGuid, _csrf: csrfToken}
//     } else {
//         var url = '/api/article/get-article';
//         var articleId = elem.data('id');
//         var payload = {articleId: articleId, _csrf: csrfToken}
//     }

//     if (!isRequestSent) {

//         $.ajax({
//             type: 'GET',
//             url: _appJsConfig.appHostName + url,
//             dataType: 'json',
//             data: payload,
//             success: function (data, textStatus, jqXHR) {
//                 data.hasMediaVideo = false;
//                 if (data.media['type'] === 'video') {
//                     data.hasMediaVideo = true;
//                 }1
                
//                 if (data.source == 'youtube') {
//                     var watch = data.media.videoUrl.split("=");
//                     data.media.videoUrl = "https://www.youtube.com/embed/" + watch[1];
//                 }
                
//                 data.templatePath = _appJsConfig.templatePath;

//                 var articleTemplate = Handlebars.compile(socialPostPopupTemplate);
//                 var article = articleTemplate(data);
//                 $('.modal').html(article);

//                 setTimeout(function () {
//                     $('.modal').modal('show');
//                 }, 500);
//             },
//             error: function (jqXHR, textStatus, errorThrown) {
//                 isRequestSent = false;
//             },
//             beforeSend: function (jqXHR, settings) {
//                 isRequestSent = true;
//             },
//             complete: function (jqXHR, textStatus) {
//                 isRequestSent = false;
//             }
//         });
//     }
// }

// Card.prototype.BindLightboxArticleBtn = function() 
// {
//     var self = this;

//     $('.LightboxArticleBtn').on('click', function (e) {
//         e.stopPropagation();
//         e.preventDefault();
//         var parentElement = $(this).parent().parent();
//         self.lightbox(parentElement);
//         return;
//     });

// };




Card.prototype.initDraggable = function()
{

    if ( $.ui ) {
        $('.swap').draggable({
            helper: 'clone',
            revert: true,
            zIndex: 100,
            scroll: true,
            scrollSensitivity: 100,
            cursorAt: { left: 150, top: 50 },
            appendTo:'body',
            start: function( event, ui ) {
                ui.helper.attr('class', '');
                var postImage = $(ui.helper).data('article-image');
                var postText = $(ui.helper).data('article-text');
                if(postImage !== "") {
                    $('div.SwappingHelper img.article-image').attr('src', postImage);
                }
                else {
                    $('div.SwappingHelper img.article-image').attr('src', 'http://www.placehold.it/100x100/EFEFEF/AAAAAA&amp;text=no+image');
                }
                $('div.SwappingHelper p.article-text').html(postText);
                $(ui.helper).html($('div.SwappingHelper').html());    
            }
        });
    }
};

Card.prototype.initDroppable = function()
{
    var self = this;


    if ( $.ui ) {

        $('.swap').droppable({
            hoverClass: "ui-state-hover",
            drop: function(event, ui) {
                
                function getElementAtPosition(elem, pos) {
                    return elem.find('a.card').eq(pos);
                }

                var sourceObj       = $(ui.draggable); //card being dragged
                var destObject      = $(this); //card it lands on
                var sourceProxy     = null;
                var destProxy       = null;

                

                if (typeof sourceObj.data('proxyfor') !== 'undefined') {
                    sourceProxy = sourceObj;
                    sourceObj   = getElementAtPosition($( '.' + sourceProxy.data('proxyfor')), sourceProxy.data('position') -1);
                    sourceObj.attr('data-position', destObject.data('position'));

                }
                if (typeof destObject.data('proxyfor') !== 'undefined') {
                    destProxy = destObject;
                    destObject = getElementAtPosition($( '.' + destObject.data('proxyfor')), destObject.data('position') -1);
                    destObject.attr('data-position', sourceObj.data('position'));
                }



                //get positions
                var sourcePosition       = sourceObj.data('position');
                var sourcePostId         = sourceObj.data('id');
                var sourceIsSocial       = parseInt(sourceObj.data('social'));
                var sourcePinStatus      = parseInt(sourceObj.find('.PinArticleBtn').attr('data-status'));

                var destinationPosition  = destObject.data('position');
                var destinationPostId    = destObject.data('id');
                var destinationIsSocial  = parseInt(destObject.data('social'));
                var destinationPinStatus = parseInt(destObject.find('.PinArticleBtn').attr('data-status'));


                var swappedDestinationElement = sourceObj.clone().removeAttr('style').insertAfter( destObject );
                var swappedSourceElement = destObject.clone().insertAfter( sourceObj );
                

                if (sourceProxy) {
                    sourceProxy.find('h2').text(destObject.find('h2').text());
                    swappedDestinationElement.addClass('swap');
                    swappedSourceElement.removeClass('swap');
                    sourceProxy.attr('data-article-text', destObject.data('article-text'));
                    sourceProxy.attr('data-article-image', destObject.data('article-image'));
                }

                if (destProxy) {
                    if (sourceIsSocial) {
                        destProxy.find('h2').text( sourceObj.find('p').text() );
                    } else {
                        destProxy.find('h2').text( sourceObj.find('h2').text() );
                    }
                    swappedSourceElement.addClass('swap');
                    swappedDestinationElement.removeClass('swap');
                    destProxy.attr('data-article-text', sourceObj.data('article-text'));
                    destProxy.attr('data-article-image', sourceObj.data('article-image'));
                }
                
                swappedSourceElement.attr('data-position', sourcePosition);
                swappedDestinationElement.attr('data-position', destinationPosition);

                swappedSourceElement.find('.PinArticleBtn').attr('data-position', sourcePosition);
                swappedDestinationElement.find('.PinArticleBtn').attr('data-position', destinationPosition);

                swappedSourceElement.find('.PinArticleBtn').attr('data-status', destinationPinStatus);
                swappedDestinationElement.find('.PinArticleBtn').attr('data-status', sourcePinStatus);


                $(ui.helper).remove(); //destroy clone
                sourceObj.remove();
                destObject.remove();
                
                var csrfToken = $('meta[name="csrf-token"]').attr("content");
                var postData = {
                    sourcePosition: sourcePosition,
                    sourceArticleId: sourcePostId,
                    sourceIsSocial: sourceIsSocial,
                    
                    destinationPosition: destinationPosition,
                    destinationArticleId: destinationPostId,
                    destinationIsSocial: destinationIsSocial,
                    
                    _csrf: csrfToken
                };

                $.ajax({
                    url: _appJsConfig.baseHttpPath + '/home/swap-article',
                    type: 'post',
                    data: postData,
                    dataType: 'json',
                    success: function(data){

                        if(data.success) {
                            $.fn.General_ShowNotification({message: "Articles swapped successfully"});
                        }
                        
                        // $(".card p, .card h2").dotdotdot();
                        $(".j-truncate").dotdotdot();
                        self.events();
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        $.fn.General_ShowErrorMessage({message: jqXHR.responseText});
                    },

                });

            }
        }); 
    }
};



Card.prototype.dragndrop = function() {
    
    var dragOver = function(event) {
        event.preventDefault();
    };
    
    var dragStart = function(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
    }

    var drop = function(event) {
        var id = event.dataTransfer.getData('text');
        var found = false;
        var element = event.target;

        while (element.parentNode) {
            if (element.tagName.toLowerCase() !== 'a') {
                element = element.parentNode;
            } else if ( element.classList.contains('swap') ) {
                found = true;
                break;
            }
        }
        if (!found) {
            return false;
        }
        
        var sourceObj       = document.getElementById(id);
        var destObject      = element; //card it lands on

        var sourcePosition       = sourceObj.dataset.position;
        var sourcePostId         = sourceObj.dataset.id;
        var sourceIsSocial       = parseInt(sourceObj.dataset.social);
        var sourcePinStatus      = parseInt(sourceObj.querySelector('.PinArticleBtn').getAttribute('data-status'));


        var destinationPosition  = destObject.dataset.position;
        var destinationPostId    = destObject.dataset.id;
        var destinationIsSocial  = parseInt(destObject.dataset.social);
        var destinationPinStatus = parseInt(destObject.querySelector('.PinArticleBtn').getAttribute('data-status'));


        var csrfToken = $('meta[name="csrf-token"]').attr("content");
        var postData = {
            sourcePosition: sourcePosition,
            sourceArticleId: sourcePostId,
            sourceIsSocial: sourceIsSocial,
            
            destinationPosition: destinationPosition,
            destinationArticleId: destinationPostId,
            destinationIsSocial: destinationIsSocial,
            
            _csrf: csrfToken
        };

        sourceParent = sourceObj.parentNode;
        destParent = destObject.parentNode;
        sourceParent.removeChild(sourceObj);
        sourceParent.appendChild(destObject);
        destParent.appendChild(sourceObj);


        $.ajax({
            url: _appJsConfig.baseHttpPath + '/home/swap-article',
            type: 'post',
            data: postData,
            dataType: 'json',
            success: function(data){

                if(data.success) {
                    $.fn.General_ShowNotification({message: "Articles swapped successfully"});
                }
                
                // $(".card p, .card h2").dotdotdot();
                $(".j-truncate").dotdotdot();
                self.events();
            },
            error: function(jqXHR, textStatus, errorThrown){
                $.fn.General_ShowErrorMessage({message: jqXHR.responseText});
            },

        });


    };
    // var enter = function(event) {
    //     event.preventDefault();
    // };

    var cards = document.getElementsByClassName('swap');
    for(var i = 0; i < cards.length; i++) {
        cards[i].addEventListener('dragstart', dragStart);
        cards[i].addEventListener('dragover', dragOver);
        cards[i].addEventListener('drop', drop);
    }
}




Card.prototype.events = function() 
{
    var self = this;

    if (_appJsConfig.isUserLoggedIn === 1 && _appJsConfig.userHasBlogAccess === 1) {
        self.initDroppable();
        self.initDraggable();        
        self.bindPinUnpinArticle();
        self.bindDeleteHideArticle();
        // self.BindLightboxArticleBtn();

    }
    // self.bindSocialPostPopup();
};