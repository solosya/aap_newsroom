(function ($) {

    //Noty Message
    $.fn.General_ShowNotification = function (options) {
        var defaults = {
            message: '',
            type: 'success',
            timeout: 2000
        };

        var opts = $.extend({}, defaults, options);

        $.noty.closeAll();  //close all before displaying

        if ($('#noty_topRight_layout_container').length > 0) {
            $('#noty_topRight_layout_container').remove();
        }

        var n = noty({
            type: opts.type,
            text: opts.message,
            layout: opts.layout || 'bottomRight',
            closeWith: opts.closeWith,
            timeout: opts.timeout,
            dismissQueue: true,
            animation: {
                open: 'animated bounceInRight', // jQuery animate function property object
                close: 'animated bounceOutRight', // jQuery animate function property object
                easing: 'swing', // easing
                speed: 500 // opening & closing animation speed
            }
        });
    };

    //Show Error Message
    $.fn.General_ShowErrorMessage = function (options) {
        var defaults = {
            message: '',
            type: 'error',
            timeout: 10000
        };

        var opts = $.extend({}, defaults, options);
        $.noty.closeAll();  //close all before displaying

        if ($('#noty_topRight_layout_container').length > 0) {
            $('#noty_topRight_layout_container').remove();
        }

        var n = noty({
            type: 'error',
            text: opts.message,
            layout: opts.layout || 'bottomRight',
            progressBar: true,
            closeWith: ['click'],
            timeout: opts.timeout,
            dismissQueue: true,
            animation: {
                open: 'animated bounceInRight', // jQuery animate function property object
                close: 'animated bounceOutRight', // jQuery animate function property object
                easing: 'swing', // easing
                speed: 500 // opening & closing animation speed
            }
        });
    };

}(jQuery));