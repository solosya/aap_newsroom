import { ArticleFeed, UserFeed, UserCard } from './articleFeed'
import { UserProfileController } from './user-profile'
import { Donations } from './donations'
import { Card } from './card'
import { View, PubSub } from './framework'
import L from 'lazyload'

window.Acme = {};
window.Acme.View = {};


window.Acme.ArticleFeed = ArticleFeed;
window.Acme.View.UserFeed = UserFeed;
window.Acme.Usercard = UserCard;
window.Acme.UserProfileController = UserProfileController;
window.Acme.Donations = Donations;
window.Acme.Card = Card;




$('document').ready(function() {

    var isMenuBroken, isMobile;
    var sbCustomMenuBreakPoint = 1120;
    var mobileView = 620;
    var desktopView = 1119;
    var scrollMetric = [$(window).scrollTop()];
    var menu_top_foldaway = $("#menu-top-foldaway");
    var menu_bottom_foldaway = $("#menu-bottom-foldaway");
    var foldaway_search = false;

    isMenuBroken = function() {
        if (window.innerWidth > sbCustomMenuBreakPoint) {
            return false;
        }
        return true;
    };

    isMobile = function(){
        if (window.innerWidth < mobileView) {
            return true;
        }
        return false;
    };

    var isDesktop = function(){
        if (window.innerWidth > desktopView) {
            return true;
        }
        return false;
    };


    var isScolledPast = function(position){
        if (scrollMetric[0] >= position) {
            return true;
        }
        return false;
    };



    $('html').on('click', function(e) {
        $('.Acme-pulldown ul').hide();
    });
    




    var stickHeader = function(){
        if ( isScolledPast(210) ){
            $("#topAddBlock").removeClass("fixadd");
            $("#topAddBlock").css({
                "position": "absolute",
                "top":"212px"
            });
            $(".menu-mobile").data('foldaway', true);
            

        } else {
            $("#topAddBlock").addClass("fixadd");
            $("#topAddBlock").css({
                "position": "",
                "top":""
            });

        }
        return false;
    };   



    Acme.HeaderMenu = function() {
        this.topMenu = $('#menu-top-foldaway');
        this.bottomMenu = $('#menu-bottom-foldaway');
        
        this.menu = $("#foldaway-panel");
        this.subscriptions = PubSub.subscribe({
            'Acme.headerMenu.listener' : ["update_state"]
        });

        this.listeners = {
            "fixedMenu": function(data) {
                if (data.fixedMenu === 'hide') {
                    this.hideFixed();
                } else {
                    this.showFixed();
                }
            }
        }
    }

    Acme.HeaderMenu.prototype = new View();
    Acme.HeaderMenu.constructor = Acme.HeaderMenu;
    Acme.HeaderMenu.prototype.showFixed = function() {
        console.log('showing fixed');
        this.menu.addClass('showMenuPanel');
    }
    Acme.HeaderMenu.prototype.hideFixed = function() {
        menu_top_foldaway.addClass('u-hide');
        menu_bottom_foldaway.addClass('u-hide');
        this.menu.removeClass('showMenuPanel');
        $("#menu-foldaway").removeClass('o-close').addClass('o-hamburger');
    }

    Acme.headerMenu = new Acme.HeaderMenu();


    var scrollUpMenu = function() {
        // var isMob = isMobile();
        if ( isScolledPast(300) && isDesktop() ) {
            Acme.headerMenu.showFixed();
        } else if (!foldaway_search) {
            Acme.headerMenu.hideFixed();
        }
    }




    //Onload and resize events
    $(window).on("resize", function () {
        stickHeader();
        scrollUpMenu();
    }).resize();

    //On Scroll
    $(window).scroll(function() {
        var direction = 'down';
        var scroll = $(window).scrollTop();
        if (scroll < scrollMetric[0]) {
            direction = 'up';
        }
        scrollMetric = [scroll, direction];
        stickHeader();
        scrollUpMenu();
    });



    // $('#batch-add').on('click', function(e) {
    //     var input = $('#batch-user-input').val();
    //     var send = JSON.parse( input );
    //     var url = _appJsConfig.baseHttpPath + '/api/user/batch-add';
    //     return $.ajax({
    //         type: 'post',
    //         url: url,
    //         dataType: 'json',
    //         data: send
    //     }).done(function(r) {
    //         console.log(r);
    //         alert("Users added");

    //     }).fail(function(r) {
    //         console.log(r);
    //         alert(r.responseText);
    //     });        

    // });

    // $('#batch-add-csv').on('click', function(e) {
    //     var payload = {
    //         "owner" : {
    //             "email": null
    //         },
    //         "users": []
    //     };

    //     var input = $('#batch-user-input').val();
        
    //     var lines = input.split(/\n/);    
    //     var owner = lines[0].split(',');
    //     payload.owner.email = owner[owner.length - 1];

    //     for (var i=1; i< lines.length; i++) {
    //         $user = lines[i].split(',');
            
    //         $userobj = {
    //             "firstname" : $user[0],
    //             "lastname" : $user[1],
    //             "username" : $user[2],
    //             "email" : $user[3],
    //         };

    //         payload.users.push($userobj);
    //     }


    //     var url = _appJsConfig.baseHttpPath + '/api/user/batch-add';
    //     return $.ajax({
    //         type: 'post',
    //         url: url,
    //         dataType: 'json',
    //         data: payload
    //     }).done(function(r) {
    //         console.log(r);
    //         alert("Users added");

    //     }).fail(function(r) {
    //         console.log(r);
    //         alert(r.responseText);
    //     });        

    // });


    // $(".sb-custom-menu > ul").before("<a href=\"#\" class=\"menu-mobile\">MENU</a>");

    $("#menu-foldaway").on("click", function (e) {
            $(e.target).toggleClass('o-hamburger').toggleClass('o-close');
            menu_top_foldaway.toggleClass('u-hide');
            menu_bottom_foldaway.toggleClass('u-hide');
            if (foldaway_search) {
                foldaway_search = false;
                $("li.menu-item-search-foldaway>ul.search-foldaway").removeAttr('style');
                $(".menuContainer > ul > li.menu-item-search-foldaway").removeClass('now-active');
            }
    });

    $(".menu-mobile, #mobile-search-close").on("click", function (e) {
        var thisMenuElem = $(this).parent('.sb-custom-menu');
        var overlay = $(".mobile-menu__overlay");
        // $(this).toggleClass("active");
        $('#mobile-menu').toggleClass("mobile-menu--active");
        
        $("body").toggleClass('acme-modal-active');

        overlay.animate({
            "opacity": "toggle"
        }, {
            duration: 500
        }, function () {
            overlay.fadeIn();
        });
        e.preventDefault();
    });




    // this search handler is for normal desktop header, locked header search handler below
    $("#desktop-search").on("click", function (e) {

        if (window.innerWidth > sbCustomMenuBreakPoint) {

            var icon = $('#desktop-search > span:first-child');
            if (icon.hasClass('icon-search')) {
                icon.removeClass('icon-search').addClass('o-close');
            } else {
                icon.removeClass('o-close').addClass('icon-search');
            }
            $("#desktop-searchform").toggleClass('site-header-search--active');
            $("#menu-primary-menu").toggleClass('submenu--hidden');
            $("#desktop-header-search").focus();
        }
    });


    // locked header search handler
    $("#locked-header-search-button").on("click", function (e) {
        if (window.innerWidth > sbCustomMenuBreakPoint) {

            var icon = $('#locked-header-search-button > span:first-child');
            if (icon.hasClass('icon-search')) {
                icon.removeClass('icon-search').addClass('o-close');
            } else {
                icon.removeClass('o-close').addClass('icon-search');
            }
            $("#locked-searchform").toggleClass('site-header-search--active');
            $("#menu-locked").toggleClass('submenu--hidden');

            $("#locked-header-search").focus();
        }
    });





    $(".menuContainer > ul > li.menu-item-search-foldaway").on("click", function (e) {
        if (!foldaway_search) {foldaway_search = true} else {foldaway_search = false};
        if (window.innerWidth > sbCustomMenuBreakPoint) {
            $(this).children("ul").stop(true, false).slideToggle(225);
            $(this).toggleClass('now-active');
            if (window.innerWidth > sbCustomMenuBreakPoint) {
                $("input#header-search-foldaway").focus();
            }
        }
    });

    $("li.menu-item-search").bind("mouseenter focus mouseleave",function () {
        if (window.innerWidth > sbCustomMenuBreakPoint) {
            $("input#header-search").focus();
            return false;
        }
    });

    $("li.menu-item-search-foldaway").bind("mouseenter focus mouseleave",function () {
        if (window.innerWidth > sbCustomMenuBreakPoint) {
            $("input#header-search-foldaway").focus();
            return false;
        }
    });

    //For accessibility
    $(".sb-custom-menu > ul > li > a").focus(function(e) {
        if (window.innerWidth > sbCustomMenuBreakPoint) {
            $('ul.menu > li').children('ul.sub-menu').stop(true,true).slideUp('fast');
            $(this).parent().children('ul').stop(true,true).slideDown('fast');
            e.preventDefault();
        }
    });


    $('#profile').on('click', function(e) {
        $('#header__menu').toggleClass('Profile_Open');
        $('body').toggleClass('no_profile');
        e.preventDefault();
    });

    $('.bio-show-more').on('click', function(e) {
        e.preventDefault();
        var button = $(this);
        var arrow = button.find('span');
        arrow.toggleClass('down').toggleClass('up');
        var bio = button.siblings('p.bio');
        bio.toggle();
    });

    $('.j-recent-header').click(function(e){
        if ($(this).hasClass('faded')) {
            $('.j-recent-header').toggleClass('faded');
            $('.j-recent-toggle').toggleClass('u-hide');
        }
    });

});


