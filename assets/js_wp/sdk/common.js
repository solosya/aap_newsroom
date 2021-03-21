import Noty from 'noty';

//Noty Message
export const General_ShowNotification = function (options) {
    var defaults = {
        message: 'uh',
        type: 'success',
        timeout: 2000
    };

    var opts = $.extend({}, defaults, options);

    var n = new Noty({
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
    console.log('showing');
    n.show();
    console.log('shown');

};

//Show Error Message
export const General_ShowErrorMessage = function (options) {
    var defaults = {
        message: '',
        type: 'error',
        timeout: 10000
    };

    var opts = $.extend({}, defaults, options);

    var n = new Noty({
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
    n.show();

};

