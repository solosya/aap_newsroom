(function ($) {

    $.fn.Ajax_LoadBlogArticles_new = function(options){
        var requestType = 'post';
        var url = _appJsConfig.baseHttpPath + '/home/load-articles';

        var requestData = { 
            offset      : options.offset, 
            limit       : options.limit, 
            _csrf       : $('meta[name="csrf-token"]').attr("content"), 
            dateFormat  : 'SHORT',
            existingNonPinnedCount: options.nonPinnedOffset
        };

        if (options.blogid) {
            requestData['blogguid'] = options.blogid;
        }

        if (options.loadtype == 'user') {
            url = _appJsConfig.appHostName + '/api/'+options.loadtype+'/load-more-managed';
            var requestType = 'get';
        }
        
        if (options.loadtype == 'user_articles') {
            // url = _appJsConfig.baseHttpPath + '/user/load-articles';
            var url = window.location.href;
            var urlArr = url.split('/');
            var username = decodeURIComponent(urlArr[urlArr.length - 2]);
            url = _appJsConfig.baseHttpPath + '/profile/'+ username + '/posts';
        }

        if (options.search) {
            requestData['s'] = options.search;
            var url = _appJsConfig.appHostName + '/'+options.loadtype;
            var requestType = 'get';
        }
        // console.log('fetching from blog new');
        // console.log(requestData);
        // console.log(url);
        // console.log(requestType);
        
        return $.ajax({
            type: requestType,
            url: url,
            dataType: 'json',
            data: requestData
        }).done(function(r) {
            // console.log(r);
        });        
    };

}(jQuery));