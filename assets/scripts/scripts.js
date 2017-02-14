$('document').ready(function() {
    var isMenuBroken, isMobile;
    var sbCustomMenuBreakPoint = 1370;
    var mobileView = 620;

    isMenuBroken = function(){
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


    isScrolledPass = function(){
        var scroll = $(window).scrollTop();
        console.log(scroll);
        if (scroll >= 210) {
            console.log('returning true');
            return true;
        }
        console.log('returning false');
        return false;
    };

    stickHeader = function(){
        if ( isScrolledPass() ){
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

    //Onload and resize events
    $(window).on("resize", function () {
        stickHeader();
    }).resize();

    //On Scroll
    $(window).scroll(function() {
        stickHeader();
    });



    // $(".sb-custom-menu > ul").before("<a href=\"#\" class=\"menu-mobile\">MENU</a>");

    $(".menu-mobile").on("click", function (e) {
        var thisMenuElem = $(this).parent('.sb-custom-menu');
        $(this).toggleClass("active");
        $(thisMenuElem).find('ul.menu').toggleClass("show-on-tablet");
        $(thisMenuElem).toggleClass('open');
        e.preventDefault();
    });

    $(".sb-custom-menu > ul > li.menu-item-search").hover(function (e) {
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
        console.log('clicked');
        $('#header__menu').toggleClass('Profile_Open');
        $('body').toggleClass('no_profile');
        e.preventDefault();
      });




    cardHolder = '';
    clearTimeout(cardHolder);
    cardHolder = setTimeout((function() {
        $('.card .content > p, .card h2').dotdotdot({
            watch: true
        });
    }), 750);



    //Main slider
    var swiper = new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30
    });

});
