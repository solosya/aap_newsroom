$('document').ready(function() {
    var isMenuBroken, isMobile;
    var sbCustomMenuBreakPoint = 1120;
    var mobileView = 620;
    var desktopView = 1119;
    var scrollMetric = [$(window).scrollTop()];
    var foldawayPanel = $("#foldaway-panel");
    var menuContainer = $("#menuContainer");
    var menu_top_foldaway = $("#menu-top-foldaway");
    var menu_bottom_foldaway = $("#menu-bottom-foldaway");

    var isMenuBroken = function(){
        if (window.innerWidth > sbCustomMenuBreakPoint) {
            return false;
        }
        return true;
    };

    var isMobile = function(){
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

    var stickHeader = function(){
        if ( isScolledPast(210) ){
            $("#topAddBlock").removeClass("fixadd");
            // $("#masthead").removeClass("site-header-extra-padding");
            $("#topAddBlock").css({
                "position": "absolute",
                "top":"212px"
            });
            $(".menu-mobile").data('foldaway', true);
            

            // $('.site-branding-bottom').addClass('branding-bottom-fixed');
        } else {
            $("#topAddBlock").addClass("fixadd");
            // $("#masthead").addClass("site-header-extra-padding");
            $("#topAddBlock").css({
                "position": "",
                "top":""
            });
            // $('.site-branding-bottom').removeClass('branding-bottom-fixed');

        }
        return false;
    };   


    var scrollUpMenu = function() {
        if ( scrollMetric[1] === 'up' && isScolledPast(400) && isDesktop() ){
            foldawayPanel.addClass('showMenuPanel');
            menuContainer.show();
        } else {
            menu_top_foldaway.addClass('hide');
            menu_bottom_foldaway.addClass('hide');
            foldawayPanel.removeClass('showMenuPanel');
            menuContainer.show();
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



    // $(".sb-custom-menu > ul").before("<a href=\"#\" class=\"menu-mobile\">MENU</a>");

    $("#menu-foldaway").on("click", function (e) {
        menu_top_foldaway.toggleClass('hide');
        menu_bottom_foldaway.toggleClass('hide');
    });

    $(".menu-mobile").on("click", function (e) {
        var thisMenuElem = $(this).parent('.sb-custom-menu');
        $(this).toggleClass("active");
        $(thisMenuElem).find('.menuContainer').toggleClass("show-on-tablet");
        // $(thisMenuElem).find('div.menu').toggleClass("show-on-tablet");
        $(thisMenuElem).toggleClass('open');
        $("#masthead").toggleClass('site-header-active');

        e.preventDefault();
    });

    $(".menuContainer > ul > li.menu-item-search").hover(function (e) {
        if (window.innerWidth > sbCustomMenuBreakPoint) {
            $(this).children("ul").stop(true, false).slideToggle(225);
            $(this).toggleClass('now-active');
            e.preventDefault();
        }
    });

    $("li.menu-item-search").bind("mouseenter focus mouseleave",function () {
        if (window.innerWidth > sbCustomMenuBreakPoint) {
            $("input#header-search").focus();
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



    var cardHolder = '';
    clearTimeout(cardHolder);
    cardHolder = setTimeout((function() {
        $('.card .content > p, .card h2').dotdotdot({
            watch: true
        });
    }), 750);



    //Main slider
    // var swiper = new Swiper('.swiper-container', {
    //     nextButton: '.swiper-button-next',
    //     prevButton: '.swiper-button-prev',
    //     spaceBetween: 30
    // });



});
