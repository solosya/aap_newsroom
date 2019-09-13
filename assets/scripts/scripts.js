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
        this.parent = $("#menuContainer");
        this.menu = $("#foldaway-panel");
        this.subscriptions = Acme.PubSub.subscribe({
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

    Acme.HeaderMenu.prototype = new Acme._View();
    Acme.HeaderMenu.constructor = Acme.HeaderMenu;
    Acme.HeaderMenu.prototype.showFixed = function() {
        this.parent.show();
        this.menu.addClass('showMenuPanel');
    }
    Acme.HeaderMenu.prototype.hideFixed = function() {
        this.parent.hide();
        this.menu.removeClass('showMenuPanel');
    }

    Acme.headerMenu = new Acme.HeaderMenu();


    var scrollUpMenu = function() {
        // var isMob = isMobile();
        if ( scrollMetric[1] === 'up' && isScolledPast(400) && isDesktop() ) {
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



    $('#batch-add').on('click', function(e) {
        console.log('adding batch users');
        var input = $('#batch-user-input').val();
        var send = JSON.parse( input );
        var url = _appJsConfig.baseHttpPath + '/api/user/batch-add';
        return $.ajax({
            type: 'post',
            url: url,
            dataType: 'json',
            data: send
        }).done(function(r) {
            console.log(r);
            alert("Users added");

        }).fail(function(r) {
            console.log(r);
            alert(r.responseText);
        });        

    });

    $('#batch-add-csv').on('click', function(e) {
        var payload = {
            "owner" : {
                "email": null
            },
            "users": []
        };

        var input = $('#batch-user-input').val();
        
        const lines = input.split(/\n/);    
        var owner = lines[0].split(',');
        payload.owner.email = owner[owner.length - 1];

        for (var i=1; i< lines.length; i++) {
            $user = lines[i].split(',');
            
            $userobj = {
                "firstname" : $user[0],
                "lastname" : $user[1],
                "username" : $user[2],
                "email" : $user[3],
            };

            payload.users.push($userobj);
        }


        var url = _appJsConfig.baseHttpPath + '/api/user/batch-add';
        return $.ajax({
            type: 'post',
            url: url,
            dataType: 'json',
            data: payload
        }).done(function(r) {
            console.log(r);
            alert("Users added");

        }).fail(function(r) {
            console.log(r);
            alert(r.responseText);
        });        

    });


    // $(".sb-custom-menu > ul").before("<a href=\"#\" class=\"menu-mobile\">MENU</a>");

    $("#menu-foldaway").on("click", function (e) {
            menu_top_foldaway.toggleClass('hide');
            menu_bottom_foldaway.toggleClass('hide');
            if (foldaway_search) {
                foldaway_search = false;
                $("li.menu-item-search-foldaway>ul.search-foldaway").removeAttr('style');
                $(".menuContainer > ul > li.menu-item-search-foldaway").removeClass('now-active');
            }
    });

    $(".menu-mobile").on("click", function (e) {
        var thisMenuElem = $(this).parent('.sb-custom-menu');
        $(this).toggleClass("active");
        $(thisMenuElem).find('.menuContainer').toggleClass("show-on-tablet");
        if (window.innerWidth < 768) { 
            $(thisMenuElem).find('.menuContainer').css("z-index","-1");
         } else {
            $(thisMenuElem).find('.menuContainer').css("z-index","100");
         }
        // $(thisMenuElem).find('div.menu').toggleClass("show-on-tablet");
        $(thisMenuElem).toggleClass('open');
        $("#masthead").toggleClass('site-header-active');
        $(".header-signin__row").toggleClass('header-signin__hide');
        $('body').toggleClass('acme-modal-active');

        e.preventDefault();
    });

    $(".menuContainer > ul > li.menu-item-search").on("click", function (e) {
        if (window.innerWidth > sbCustomMenuBreakPoint) {
            $(this).children("ul").stop(true, false).slideToggle(225);
            $(this).toggleClass('now-active');
            if (window.innerWidth > sbCustomMenuBreakPoint) {
                $("input#header-search").focus();
            }
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
            $('.j-recent-toggle').toggleClass('hidden');
        }
    });


    $('.video-player').videoPlayer();

    $("div.lazyload").lazyload({
        effect : "fadeIn"
    });


    var cardHolder = '';
    clearTimeout(cardHolder);
    cardHolder = setTimeout((function() {
        $('.card .content > p, .card h2, .card .content > .author > p').dotdotdot({
            watch: true
        });
    }), 750);

    $("#owl-gallery-image").owlCarousel({
        items: 1,
        thumbs: true,
        thumbsPrerendered: true,
        URLhashListener:true,
        startPosition: 'URLHash',
        pagination: true,
        dots: false,
        nav: true,
        navText: [
            "",
            ""
        ]
    });   



});
